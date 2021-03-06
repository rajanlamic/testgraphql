import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { schema } from './schema';

const app = express();

app.get('/', (req, res) => {
  res.send('GraphQL & Modern modern relay is cool');
});

class Friend {
  constructor(id, { firstName, lastName, gender, language, email }) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.gender = gender;
    this.language = language;
    this.email = email;
  }
}

const friendDatabase = {};

const global = {
  getFriend: ({ id }) => {
    return new Friend(id, friendDatabase[id]);
  },
  createFriend: ({ input }) => {
    let id = require('crypto').randomBytes(10).toString('hex');
    friendDatabase[id] = input;
    return new Friend(id, input);
  },
  updateFriend: ({ id, input }) => {
    friendDatabase[id] = input;
    return new Friend(id, input);
  }
};

app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: global,
  graphiql: true,
}));

app.listen(8080, () => console.log('Running server on http://localhost:8080/graphql'));