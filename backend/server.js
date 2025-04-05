// Import necessary dependencies
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require('./config/db');
const PORT = process.env.PORT || 4000;

// Import Apollo Server
const { ApolloServer } = require('apollo-server-express');

// Access data stored in .env
const dotenv = require('dotenv');
dotenv.config();

// Import necessary schemas
const userSchema = require('./schema/userSchema');
const employeeSchema = require('./schema/employeeSchema');

// Import necessary resolvers
const userResolver = require('./resolver/userResolver');
const employeeResolver = require('./resolver/employeeResolver');

// Merge resolvers
const resolvers = {
    Query: {
        ...userResolver.Query,
        ...employeeResolver.Query,
    },
    Mutation: {
        ...userResolver.Mutation,
        ...employeeResolver.Mutation,
    },
};

// Merge schemas
const typeDefs = [
    userSchema,
    employeeSchema,
];

// Define Apollo Server
const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
    context: async ({ req }) => {
        return { req }; // Pass req object to resolver for authentication
    },
});

// Define Express Server
const app = express();
app.use(express.json());
app.use('*', cors());

// Start server
app.listen({ port: PORT }, async () => {
    // Start Apollo Server
    await server.start();

    // Add Express app as middleware to Apollo Server
    server.applyMiddleware({ app });

    console.log(`Server listening at http://localhost:${PORT}${server.graphqlPath}`);
    // Connect to MongoDB
    connectDB();
});