// Import mongoose Employee model
const Employee = require('../models/Employee');

// Import dotenv for .env usage
const dotenv = require('dotenv');
dotenv.config();

// Import necessary utils
const verifyAuth = require('../utils/verifyAuth');
const validateEmail = require('../utils/validateEmail');
const validDate = require('../utils/validDate');

const employeeResolver = {
    Query: {
        employees: async (_, __, context) => {
            // Verify Authorization
            verifyAuth(context);
            return await Employee.find();
        },
        employee: async (_, { id, designation, department }, context) => {
            verifyAuth(context);
            try {

                if (id){ // User provided ID
                    const employee = await Employee.findById(id);
                    // Wrap result in array due to GraphQL query return type; [Employee]
                    return employee ? [employee] : [];
                } else if (designation){ // User provided designation
                    return await Employee.find({ designation });
                } else if (department){ // User provided department
                    return await Employee.find({ department });
                }

                // Return empty array if no input was given
                return [];

            } catch(err){
                console.error(`An error occurred: ${err.message}`);
                throw new Error('Failed to fetch data due to an internal error');
            }            
        }
    },

    Mutation: {
        addEmployee: async (_, {
                first_name,
                last_name,
                email,
                gender,
                designation,
                salary,
                date_of_joining,
                department,
                employee_photo
            }, context) => {
            verifyAuth(context);


            try {

                // Confirm that an employee with that E-mail address does not already exist
                const existingEmployee = await Employee.findOne({ email });
                if (existingEmployee){
                    throw new Error('An employee already exists with that E-mail address');
                }

                // Validate E-mail address format, using utility
                const emailValid = validateEmail(email);
                if (!emailValid){
                    throw new Error('Invalid E-mail address');
                }

                // Validate format of given date_of_joining
                const dateValid = validDate(date_of_joining);
                if (!dateValid){
                    throw new Error('Invalid date format for date of joining');
                }

                // Create new Employee
                const employee = new Employee({
                    first_name,
                    last_name,
                    email,
                    gender,
                    designation,
                    salary,
                    date_of_joining: new Date(date_of_joining),
                    department,
                    employee_photo
                });

                // Save newly created employee to MongoDB
                const newEmployee = await employee.save();

                // Return newly saved employee
                return newEmployee;

            } catch(err){
                console.error(`An error occurred: ${err.message}`);
                throw new Error('Failed to create employee due to an internal error');
            }
        },

        updateEmployee: async (_, {
                id,
                first_name,
                last_name,
                email,
                gender,
                designation,
                salary,
                date_of_joining,
                department,
                employee_photo
            }, context) => {
            verifyAuth(context);

            try {

                // Check if employee exists in MongoDB collection
                const employee = await Employee.findById(id);

                // Throw an error if employee not found
                if (!employee){
                    throw new Error('Employee not found');
                }

                if (first_name) employee.first_name = first_name;
                if (last_name) employee.last_name = last_name;
                if (email) employee.email = email;
                if (gender) employee.gender = gender;
                if (designation) employee.designation = designation;
                if (salary) employee.salary = salary;
                if (date_of_joining){
                    // Validate date format
                    const dateValid = validDate(date_of_joining);
                    if (!dateValid){
                        throw new Error('Invalid date format for date of joining');
                    }

                    // Update value
                    employee.date_of_joining = Date(date_of_joining);
                };
                if (department) employee.department = department;
                if (employee_photo) employee.employee_photo = employee_photo;

                // Store modified employee date in MongoDB collection
                const updatedEmployee = await employee.save();

                // Return updated employee data
                return updatedEmployee;

            } catch(err){
                console.error(`An error occurred: ${err.message}`);
                throw new Error('Failed to update employee due to an internal error');
            }
        },

        deleteEmployee: async (_, { id }, context) => {
            verifyAuth(context);

            try {

                // Check if employee exists in the database
                const employee = await Employee.findById(id);
                if (!employee){
                    throw new Error('Employee not found');
                }

                // Delete employee from MongoDB collection
                const deletedEmployee = await Employee.findByIdAndDelete(id);

                // Return deleted employee
                return deletedEmployee;

            } catch(err){
                console.error(`An error occurred: ${err.message}`);
                throw new Error('Failed to delete employee due to an internal error');
            }
        }
    }
}

module.exports = employeeResolver;