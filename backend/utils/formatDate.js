const formatDate = (date) => {
    const d = new Date(date);
    if (isNaN(d.getTime())) {
        throw new Error('Invalid date');
    }
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

module.exports = formatDate;