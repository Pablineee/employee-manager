const mongoose = require('mongoose');

// Access environment variables
const dotenv = require('dotenv');
dotenv.config();

const connectDB = async() => {
    try {
        mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(success => {
            console.log('MongoDB Connected...');
        }).catch(error => {
            console.error(`MongoDB Connection Failed: ${error.message}`);
        });
    } catch(err) {
        console.error(`An error occurred: ${err.message}`);
    }
}

module.exports = connectDB;