export const typeDefs = `
input CreateUserInput {
  name: String!
  email: String!
  password: String!
}

scalar DateTime

type Mutation {
  signUp(newUser: CreateUserInput!): Session!
  logIn(password: String!, email: String!): Session!
  postPoem(content: String!, title: String!, token: String!): Poem!
}

type Poem {
  id: ID!
  title: String!
  content: String!
  createdAt: DateTime!
  author: User!
}

type Query {
  user(id: String!): User!
  poem(id: String!): Poem!
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
}
`
