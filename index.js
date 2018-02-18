const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const bodyParser = require('body-parser');

const root = require('./lib/root');
const stringSchema = require('./lib/schema');
const schema = buildSchema(stringSchema);


const app = express();
app.use(bodyParser());
app.use('/graphql', graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');

module.exports = app;
