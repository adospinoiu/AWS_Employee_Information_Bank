import React, { useState } from 'react';
import axios from './axios';
import './DataEntryComp.css';

function DataEntryComp() {
    // Set State for the Input Fields
    const [file, setFile] = useState()
    const [empFirstName, setEmpFirstName] = useState([])
    const [empLastName, setEmpLastName] = useState([])
    const [empDateOfHire, setEmpDateOfHire] = useState([])
    const [empStreetAddress, setEmpStreetAddress] = useState([])
    const [empCity, setEmpCity] = useState([])
    const [empState, setEmpState] = useState([])
    const [empZipCode, setEmpZipCode] = useState([])

    // const addNewEmployee = async (e) => {
    //     e.preventDefault();

    //     const employeeData = {
    //         file: `${file}`,
    //         employeeFirstName: `${empFirstName}`,
    //         employeeLastName: `${empLastName}`,
    //         employeeDateOfHire: `${empDateOfHire}`,
    //         employeeStreetAddress: `${empStreetAddress}`,
    //         employeeCity: `${empCity}`,
    //         employeeState: `${empState}`,
    //         employeeZipCode: `${empZipCode}`
    //     }

    //     console.log(employeeData)

    //     setFile();
    //     setEmpFirstName('');
    //     setEmpLastName('');
    //     setEmpDateOfHire('');
    //     setEmpStreetAddress('');
    //     setEmpCity('');
    //     setEmpState('');
    //     setEmpZipCode('');
    // }

    const submit = async event => {
        event.preventDefault()

        const formData = new FormData()
        formData.append("image", file)
        formData.append("employeeFirstName", empFirstName)
        formData.append("employeeLastName", empLastName)
        formData.append("employeeDateOfHire", empDateOfHire)
        formData.append("employeeStreetAddress", empStreetAddress)
        formData.append("employeeState", empState)
        formData.append("employeeZipCode", empZipCode)

        console.log(formData)

        await axios.post('/api/image', formData, { headers: {'Content-Type': 'multipart/form-data'}})

        await axios.post('/addNewEmployee/new', {
            employeeFirstName: empFirstName,
            employeeLastName: empLastName,
            employeeDateOfHire: empDateOfHire,
            employeeStreetAddress: empStreetAddress,
            employeeCity: empCity,
            employeeState: empState,
            employeeZipCode: empZipCode,
        })
    }

    return (
        <div className='dataEntry_main'>
            <div className='dataEntry_header'>
                <p>Enter New Employee Information</p>
            </div>

            <div className='dataEntry_inputs'>
                <form onSubmit={submit}>
                    <input 
                        files={file}
                        name="image"
                        type="file"
                        accept="image/*"
                        onChange={e => setFile(e.target.files[0])}
                    />

                    <input
                        value={empFirstName}
                        name="employeeFirstName"
                        placeholder="Employee First Name"
                        type="text"
                        onChange={e => setEmpFirstName(e.target.value)}
                    />

                    <input
                        value={empLastName}
                        name="employeeLastName"
                        placeholder="Employee Last Name"
                        type="text"
                        onChange={e => setEmpLastName(e.target.value)}
                    />

                    <input
                        value={empDateOfHire}
                        name="employeeDateOfHire"
                        placeholder="Employee Date of Hire"
                        type="text"
                        onChange={e => setEmpDateOfHire(e.target.value)}
                    />

                    <input
                        value={empStreetAddress}
                        name="employeeStreetAddress"
                        placeholder="Employee Street Address"
                        type="text"
                        onChange={e => setEmpStreetAddress(e.target.value)}
                    />

                    <input
                        value={empCity}
                        name="employeeCity"
                        placeholder="Employee City"
                        type="text"
                        onChange={e => setEmpCity(e.target.value)}
                    />

                    <input
                        value={empState}
                        name="employeeState"
                        placeholder="Employee State"
                        type="text"
                        onChange={e => setEmpState(e.target.value)}
                    />

                    <input
                        value={empZipCode}
                        name="employeeZipCode"
                        placeholder="Employee Zip Code"
                        type="text"
                        onChange={e => setEmpZipCode(e.target.value)}
                    />

                    <button type="submit">Add New Employee</button>

                </form>
            </div>
        </div>
    )
}

export default DataEntryComp;