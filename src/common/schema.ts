export default `
  type Query {
    user(id: String!): User!
  }

  type User {
    id: ID!
    name: String!
    email: String!
  }
`
