import { buildSchema } from 'graphql';

export const schema = buildSchema(`
  input FriendInput {
    id: ID,
    firstName: String
    lastName: String
    gender: String
    language: String
    email: String
    IDTyped: String
  }

  type Friend {
    id: ID,
    firstName: String
    lastName: String
    gender: String
    language: String
    email: String
    IDTyped: String
  }

  type Query {
    getFriend(id: ID!): Friend
  }

  type Mutation {
    createFriend(input: FriendInput): Friend
    updateFriend(id: ID!, input: FriendInput): Friend
  }
`);

export default schema;