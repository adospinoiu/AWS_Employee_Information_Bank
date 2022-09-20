import React, { useState } from 'react';
// import axios from './axios';
import './DataEntryComp.css';

function DataEntry({ }) {
    // Set State for the Input Fields
    const [ empFirstName, setEmpFirstName ] = useState([])
    const [ empLastName, setEmpLastName ] = useState([])
    const [ empDateOfHire, setEmpDateOfHire ] = useState([])
    const [ empStreetAddress, setEmpStreetAddress ] = useState([])
    const [ empCity, setEmpCity ] = useState([])
    const [ empState, setEmpState ] = useState([])
    const [ empZipCode, setEmpZipCode ] = useState([])

    // const addNewEmployee = (e) => {
    //     e.preventDefault();

    //     console.log(empFirstName);

    //     setEmpFirstName('');
    //     setEmpLastName('');
    //     setEmpDateOfHire('');
    //     setEmpStreetAddress('');
    //     setEmpCity('');
    //     setEmpState('');
    //     setEmpZipCode('');
    // }

    const addNewEmployee = () => {
        console.log(empFirstName)
    }

    return (
        <div className='dataEntry_main'>
            <div className='dataEntry_header'>
                <p>Enter New Employee Information</p>
            </div>

            <div className='dataEntry_inputs'>
                <input
                    value={empFirstName}
                    placeholder="Employee First Name"
                    type="text"
                    onChange={e => setEmpFirstName(e.target.value)}
                />

                <input
                    value={empLastName}
                    placeholder="Employee Last Name"
                    type="text"
                    onChange={e => setEmpLastName(e.target.value)}
                />

                <input
                    value={empDateOfHire}
                    placeholder="Employee Date of Hire"
                    type="text"
                    onChange={e => setEmpDateOfHire(e.target.value)}
                />

                <input
                    value={empStreetAddress}
                    placeholder="Employee Street Address"
                    type="text"
                    onChange={e => setEmpStreetAddress(e.target.value)}
                />

                <input
                    value={empCity}
                    placeholder="Employee City"
                    type="text"
                    onChange={e => setEmpCity(e.target.value)}
                />

                <input
                    value={empState}
                    placeholder="Employee State"
                    type="text"
                    onChange={e => setEmpState(e.target.value)}
                />

                <input
                    value={empZipCode}
                    placeholder="Employee Zip Code"
                    type="text"
                    onChange={e => setEmpZipCode(e.target.value)}
                />
            </div>

            <div className='dataEntry_submit'>
                <button onClick={addNewEmployee} type="submit">Add New Employee</button>
            </div>
        </div>
    )
}

export default DataEntry