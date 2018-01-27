const express = require('express');
const schema = require('./SchemaGQL/schema');
const expressGraphQL = require('express-graphql');
const bodyParser = require('body-parser');
const path = require('path');
// const graphql = require('graphql')

const app = express();

app.use(/\/((?!graphql).)*/, bodyParser.urlencoded({ extended: true }));
app.use(/\/((?!graphql).)*/, bodyParser.json());
app.use('/static', express.static(path.join(__dirname, 'Public')))
app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true,
  //this allows the graphiql interface (GQL's postman) to load in browser
  //to access: 'localhost:4000/graphiql'
  formatError: error => ({
    message: error.message,
    locations: error.locations,
    stack: error.stack,
    path: error.path
  })
}))

app.post('/', (req, res, next) => {
  graphql(schema, req.body).then((result) => {
    res.send(result);
  });
});

server.get('/', (req, res, next) => {
  let instruction = 'POST GraphQL queries to' + server.url + '. Sample query: {contributor (id: "1")}';
  res.send(instruction);
});

//express-graphql will accept requests with 3 parameters: (query, variables, operationName)



app.listen(4000, () => {
  console.log('Listening on port 4000')
});