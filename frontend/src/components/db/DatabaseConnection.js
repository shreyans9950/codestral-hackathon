// src/components/DatabaseConnection.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles.css'; // Import the CSS file
import cover from '../../cover.png'


const DatabaseConnection = ({ setDbURI }) => {
  const [uri, setURI] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setDbURI(uri);
      navigate('/prompt');
    } catch (error) {
      console.error('Error connecting to the database:', error);
    }
  };

  return (
    <div className="container">
      <img width="100%" src={cover} />
      <br></br><br></br>
      <form onSubmit={handleSubmit}>
        <label><h3>Instructions</h3></label>
        <ul>
          <li>          Please enter a connection URL of your database. Please make sure your database is accessible though this website
          </li>
          <li>
          <b>Example URL</b> - mysql://admin:password@mysql-database.clwyugumyn1b.ap-south-1.rds.amazonaws.com:3306/store
          </li>
        </ul>


        <br></br><br></br>
        <label>Connection URI</label>
        <input type="text" value={uri} onChange={(e) => setURI(e.target.value)} required />
        <button type="submit">Connect</button>
      </form>
    </div>
  );
};

export default DatabaseConnection;
