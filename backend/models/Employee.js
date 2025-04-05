const mongoose = require('mongoose');

const EmployeeSchema = mongoose.Schema({
    first_name: { type: String, required: [true, "First name is required"] },
    last_name: { type: String, required: [true, "Last name is required"] },
    email: { type: String, required: [true, "E-mail address is required"], unique: [true, "A user with that E-mail address already exists"] },
    gender: { type: String, required: true },
    designation: { type: String, required: true },
    salary: { type: Number, required: [true, "Salary is required"], min: [1000, "Salary amount must be greater or equal to 1,000"] },
    date_of_joining: { type: Date, required: [true, "Date of joining required"] },
    department: { type: String, required: [true, "Department is required"] },
    employee_photo: { type: String }, // Stored as name/path -> {first_name}_{last_name}/{path_to_photo}
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date }
});

const Employee = mongoose.model('Employee', EmployeeSchema);
module.exports = Employee;