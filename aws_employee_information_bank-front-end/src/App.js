import axios from './axios';
import React, { useState, useEffect } from 'react';
import './App.css';

// Import Main Components
import DataEntryComp from './DataEntryComp';
import DataViewEditComp from './DataViewEditComp';

function App() {
  // const [ newFile, setNewFile ] = useState([]);
  const [ newEmployee, setNewEmployee ] = useState([]);

  // These are used to GET the file from AWS S3 Bucket & data from MongoDB
  useEffect(() => {
    axios.get('/addNewEmployee/added')
      .then(response => {
        setNewEmployee(response.data)
      })
  }, [])

  console.log(newEmployee)

  return (
    <div className="App">
      <header className="App-header">
        <DataEntryComp />

        <DataViewEditComp />
      </header>
    </div>
  );
}

export default App;
