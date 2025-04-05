// Utility function used for validating Date format
const validDate = (dateString) => {
    // Create new Date object with given String
    const date = new Date(dateString);

    // Will return false, if date format is invalid
    return !isNaN(date.getTime()); 
}

module.exports = validDate;