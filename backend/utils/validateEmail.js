// Utility function used to validate E-mail address
const validateEmail = (email) => {
    /*
    Regex used to ensure E-mail address contains
    at least one '@', one '.', and is at least 5
    characters long
    */
    const emailRegex = /^(?=.*@)(?=.*\.).{5,}$/;

    // Confirm that E-mail address is valid, using Regex
    const emailValid = emailRegex.test(email);
    return emailValid;
};

module.exports = validateEmail;