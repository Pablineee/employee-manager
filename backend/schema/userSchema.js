const { gql } = require('apollo-server-express');

// GraphQL User Schema
const userSchema = gql `
    type User {
        id: ID!
        username: String!
        email: String!
        created_at: String!
        updated_at: String
    }

    type AuthPayload {
        token: String!
        username: String!
    }

    type AuthPayloadSignup {
        token: String!
        username: String!
        email: String!
    }

    type Query {
        login(username: String!, password: String!): AuthPayload
    }

    type Mutation {
        signup(
            username: String!
            email: String!
            password: String!
        ): AuthPayloadSignup
    }
`

module.exports = userSchema;