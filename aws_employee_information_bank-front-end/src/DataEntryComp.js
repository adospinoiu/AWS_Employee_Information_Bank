import React, { useState } from 'react';
// import axios from './axios';
import './DataEntryComp.css';

function DataEntry({ }) {
    // Set State for the Input Fields
    const [ empFirstName, setEmpFirstName ] = useState([])
    const [ empLastName, setEmpLastName ] = useState([])
    const [ empDateOfBirth, setEmpDateOfBirth ] = useState([])
    const [ empStreetAddress, setEmpStreetAddress ] = useState([])
    const [ empCity, setEmpCity ] = useState([])
    const [ empState, setEmpState ] = useState([])
    const [ empZipCode, setEmpZipCode ] = useState([])

    return (
        <div className='dataEntry_main'>
            <div className='dataEntry_header'>
                <p>Enter New Employee Information</p>
            </div>

            <div className='dataEntry_inputs'>
                <input
                    value={title}
                    placeholder="Title"
                    type="text"
                    onChange={e => setTitle(e.target.value)}
                />

                <input
                    value={author}
                    placeholder="Author"
                    type="text"
                    onChange={e => setAuthor(e.target.value)}
                />

                <input
                    value={recommended}
                    placeholder="Recommended by"
                    type="text"
                    onChange={e => setRecommended(e.target.value)}
                />

                <button onClick={sendNewBook} type="submit">Add to List</button>
            </div>
        </div>
    )
}

export default DataEntry