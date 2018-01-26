const express = require('express');
// const models = require('./ModelsGQL');
const schema = require('./SchemaGQL/schema');
const expressGraphQL = require('express-graphql');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
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

//express-graphql will accept requests with 3 parameters: (query, variables, operationName)



app.listen(4000, () => {
  console.log('Listening on port 4000')
});