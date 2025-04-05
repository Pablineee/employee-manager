// Import necessary dependency
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const verifyAuth = (context) => {
    // Ensure context is present
    if (!context || !context.req) {
        throw new Error("Request context not found");
    }

    // Store authentication header in variable
    let authHeader = context.req.headers.authorization;

    // Ensure token starts with "Bearer " and remove it
    if (authHeader && authHeader.startsWith("Bearer ")) {
        authHeader = authHeader.replace("Bearer ", "").trim();
    } else {
        throw new Error("Unauthorized: Invalid token format");
    }

    // If there is no authentication token, return error
    if (!authHeader) {
        throw new Error("Unauthorized: Token not provided");
    }

    // Verify token using secret key
    try {
        const user = jwt.verify(authHeader, process.env.JWT_SECRET);
        return user;
    } catch (err) {
        console.error("JWT Verification Failed:", err.message);
        throw new Error("Invalid or expired token");
    }
};

module.exports = verifyAuth;