export const typeDefs = `
type Mutation {
  signUp(password: String!, email: String!, name: String!): User!
  logIn(password: String!, email: String!): User!
}

type Query {
  user(id: String!): User!
}

type Session {
  token: String!
  user: User!
}

type User {
  id: ID!
  name: String!
  email: String!
}

`
