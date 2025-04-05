const bcrypt = require('bcryptjs');

const hashPassword = async (password) => {
    try{
        // Ensure password is a valid string
        if (!password || typeof password !== 'string') {
            throw new Error('Error: Invalid password');
        }

        return await bcrypt.hash(password, 10);
    } catch (err) {
        console.error(`An error occurred: ${err.message}`);
        throw new Error("Password hashing failed due to an internal error");
    }
};

module.exports = hashPassword;