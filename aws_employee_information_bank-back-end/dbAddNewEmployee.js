import mongoose from 'mongoose';

const addNewEmployeeSchema = mongoose.Schema({
    employeeFirstName: String,
    employeeLastName: String,
    employeeDateOfHire: String,
    employeeStreetAddress: String,
    employeeCity: String,
    employeeState: String,
    employeeZipCode: String,
})

export default mongoose.model('addNewEmployee', addNewEmployeeSchema)