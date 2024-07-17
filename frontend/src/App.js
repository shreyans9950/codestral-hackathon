// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DatabaseConnection from './components/db/DatabaseConnection';
import PromptInput from './components/prompt/PromptInput';
import './styles.css'
const App = () => {
  const [dbURI, setDbURI] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<DatabaseConnection setDbURI={setDbURI} />} />
        <Route path="/prompt" element={<PromptInput dbURI={dbURI} />} />
      </Routes>
    </Router>
  );
};

export default App;
