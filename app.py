from typing import Any
from fastapi import FastAPI
from fastapi import HTTPException
from pydantic import BaseModel
# import tensorflow as tf
from langchain.chains import create_sql_query_chain
from langchain_community.utilities import SQLDatabase
from fastapi.middleware.cors import CORSMiddleware
from langchain_mistralai import ChatMistralAI
import getpass
import os


os.environ['HUGGINGFACEHUB_API_TOKEN']="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"
os.environ["MISTRAL_API_KEY"] = "DMmWrRMnk4a9G8Nvr1dUOQPFVRN9FDrd"

llm = ChatMistralAI(model="codestral-latest")


app = FastAPI()
origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# This defines the data json format expected for the endpoint, change as needed
class TextInput(BaseModel):
    inputs: str
    database_url: str
    parameters: dict[str, Any] | None

class DBConnectionDetails(BaseModel):
    database_url: str

# @app.get("/")
# def status_gpu_check() -> dict[str, str]:
#     gpu_msg = "Available" if tf.test.is_gpu_available() else "Unavailable"
#     return {
#         "status": "I am ALIVE!",
#         "gpu": gpu_msg
#     }

@app.post("/database-connection/")
async def database_connection(data: DBConnectionDetails) -> dict[str, str]:
    try:
        return {"database_url": data.database_url}
    except Exception as e:
        print(e)
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/nlp-to-sql/")
async def nlp_to_sql(data: TextInput) -> dict[str, str]:
    try:
        params = data.parameters or {}
        db = SQLDatabase.from_uri(data.database_url)
        chain = create_sql_query_chain(llm, db)
        prompt = {"question": f"Give only SQL query for this question as formate 'SQLQuery : qurey': {data.inputs}"}
        response = chain.invoke(prompt)
        start = 0
        end = response.find(';') + len(';')
        sql_query = response[start:end]
        return {"generated_text": sql_query}
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=len(str(e)))
