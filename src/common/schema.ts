export const typeDefs = `
input CreatePoemInput {
  title: String!
  content: String!
  isPublic: Boolean = false
}

input CreateUserInput {
  name: String!
  email: String!
  password: String!
}

scalar DateTime

type JsonWebToken {
  token: String!
  expiresAt: Float!
}

type Mutation {
  signUp(newUser: CreateUserInput!): Session!
  logIn(password: String!, email: String!): Session!
  postPoem(newPoem: CreatePoemInput!): Poem!
}

type Poem {
  id: ID!
  title: String!
  content: String!
  isPublic: Boolean
  createdAt: DateTime!
  updatedAt: DateTime!
  author: User!
}

type Query {
  user(id: String!): User!
  poem(id: String!): Poem!
  allPublicPoems: [Poem!]!
}

type Session {
  jwt: JsonWebToken!
  user: User!
}

type User {
  id: ID!
  name: String!
  email: String!
  poems: [Poem!]!
}
`
