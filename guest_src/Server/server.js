const express = require('express');
const schema = require('./SchemaGQL/schema');
const expressGraphQL = require('express-graphql');
const bodyParser = require('body-parser');
const path = require('path');
const graphql = require('graphql');
const knex = require('./dbConfig.js').knex
const axios = require('axios');

// auth dependencies
// const passportSetup = require('./passportConfig/passport-setup')
// const authRoutes = require('./routes/auth-routes.js')
// const authCheck = require('./routes/private-routes.js')
// const cookieSession = require('cookie-session')
// const session = require('express-session');
// const passport = require('passport');

const app = express();

app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')

app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: ['asdfjkls']
}))

app.use(bodyParser.json({extended: true}))

/////////
// initialize passport
// app.use(passport.initialize())
// app.use(passport.session())

// set up routes

// create home route
app.get('/eventPage', (req, res) => {
  // res.render('login')
  console.log('HEY THERE FRAND')
})

// var check = function(req, res, next){
//   console.log('getting to route')
//   next()
// }

// create private route
app.use('/', express.static(path.join(__dirname, '../PublicProtected')))
// app.use('/dashboard/:id', authCheck, express.static(path.join(__dirname, '../main_dist')))
app.use('/eventPage/:id', express.static(path.join(__dirname, '../guest_dist')))

// app.get('/user', function(req, res) {
//   if (req.user === undefined) {
//       // The user is not logged in
//       res.json({});
//   } else {
//       res.json({
//           user: req.user
//       });
//   }
// });




// graphql //
////////////
app.use(/\/((?!graphql).)*/, bodyParser.urlencoded({ extended: true }));
app.use(/\/((?!graphql).)*/, bodyParser.json());
app.use('/graphql', expressGraphQL({
  schema: schema,
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

// app.post('/', (req, res, next) => {
//   graphql(schema, req.body).then((result) => {
//     console.log('inside post', req.body)
//     res.send(result);
//   });
// });

//express-graphql will accept requests with 3 parameters: (query, variables, operationName)

app.listen(4000, () => {
  console.log('Listening on port 4000')
});
