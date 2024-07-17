// src/components/PromptInput.js
import React, { useState } from "react";
import axios from "axios";
import "../../styles.css"; // Import the CSS file
import { Card, CardContent, Typography } from "@mui/material";
import Code from "../Code";
import BasicCard from "../Card/BasicCard";
import MarkdownComponent from "../Markdown";
import cover from '../../cover.png'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { useNavigate } from "react-router-dom";



const PromptInput = ({ dbURI }) => {
  const [prompt, setPrompt] = useState("");
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!dbURI) {
        navigate('/');
        alert("Please enter the database connection URI first");
      }
      setIsLoading(true);
      const response = await axios.post("http://13.235.113.97/nlp-to-sql", {
        database_url: dbURI,
        inputs: prompt,
        parameters: { temperature: 0.1, max_tokens: 200 },
      });
      setOutput(response.data.generated_text);
    } catch (error) {
      console.error("Error executing prompt:", error);
    }
    setIsLoading(false);
  };


  return (
    <div className="chat-container">
      <img width="100%" src={cover} />
      <br></br><br></br>
      <form onSubmit={handleSubmit}>
      <label><h3>Instructions</h3></label>
        <ul>
          <li>          Ask a question to the database in your own words.
          </li>
          <li>
          <b>Example Question</b> - Identify the orders without any pending status.
          </li>
        </ul>


        <br></br><br></br>
        <label>Please enter your question</label>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Type your question..."
          className="input-field"
          required
        />
        <button type="submit" className="btn-send" disabled={isLoading}>
          Send
        </button>
        <MarkdownComponent markdownText={output} />
      </form>
    </div>
  );
};

export default PromptInput;
