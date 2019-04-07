export const typeDefs = `
input CreateUserInput {
  name: String!
  email: String!
  password: String!
}

type Mutation {
  signUp(newUser: CreateUserInput!): Session!
  logIn(password: String!, email: String!): Session!
}

type Poem {
  id: ID!
  title: String!
  content: String!
  author: User!
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
  poems: [Poem!]!
`
