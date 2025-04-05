// Utility function used to validate password
const validatePassword = (password) => {
    /*
    Ensure that password contains at least one
    uppercase letter and one special character
    and is a minimum of 8 characters long
    */
    const passwordRegex = /^(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,64}$/;

    // Confirm that password conforms to the above Regex
    const passwordValid = passwordRegex.test(password);
    return passwordValid;
};

module.exports = validatePassword;