// Import mongoose User model
const User = require('../models/User');

// Import dotenv for .env usage
const dotenv = require('dotenv');
dotenv.config();

// Import necessary utils
const hashPassword = require('../utils/hashPassword');
const verifyPassword = require('../utils/verifyPassword');
const signToken = require('../utils/signToken');
const validateEmail = require('../utils/validateEmail');
const validatePassword = require('../utils/validatePassword');

const userResolver = {

    Query: {
        login: async (_, { username, password }) => {
            try {
                // Retrieve User from MongoDB
                const user = await User.findOne({ username });
                if (!user) throw new Error("Incorrect username or password");

                // Verify user's input password with the stored hashed password
                const isMatch = await verifyPassword(password, user.password);
                if (!isMatch) throw new Error("Incorrect username or password");
                
                // Create JWT token
                const token = signToken(username, process.env.JWT_SECRET);

                // Return AuthPayload containing JWT token and username of logged in user
                return { token, username };

            } catch(err) {
                console.error(`An error occurred: ${err.message}`);

                // Check if login issue was due to input credentials
                if (err.message === "Incorrect username or password"){
                    throw err;
                }

                // Throw generic error, if due to non-credential related issue
                throw new Error("Login failed due to an internal error");
            }
        }
    },

    Mutation: {
        signup: async (_, { username, email, password }) => {
            try {

                // Confirm that username is available
                const userExists = await User.findOne({ username });
                if (userExists){
                    throw new Error(`Username ${username} is unavailable`);
                }

                // Confirm that E-mail does not exist in MongoDB
                const emailExists = await User.findOne({ email });
                if (emailExists){
                    throw new Error('A user with that E-mail address already exists');
                }

                // Confirm that E-mail address is valid, using utility
                const emailValid = validateEmail(email);

                if (!emailValid){
                    throw new Error('Invalid E-mail address');
                }

                // Confirm that password is valid
                if (!password || typeof password !== 'string') {
                    throw new Error('Password is invalid or missing');
                }

                const passwordValid = validatePassword(password);
                if (!passwordValid){
                    throw new Error('Password must contain at least one uppercase letter, one special character, and be between 8 and 64 characters long');
                }

                // Username, E-mail, and password are valid
                // Hash password before storage
                const hashedPassword = await hashPassword(password);

                // Create new user using input credentials
                const user = new User({
                    username,
                    email,
                    password: hashedPassword
                });

                // Save newly created user to database
                const newUser = await user.save();

                // Generate JWT token
                const signupToken = signToken(username, process.env.JWT_SECRET);

                return { token: signupToken, username, email };

            } catch(err) {

                console.error(`An error occurred: ${err.message}`);
                throw new Error('Signup failed due to an internal error');

            }
        }
    }
}

module.exports = userResolver;