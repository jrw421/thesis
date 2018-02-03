const express = require('express');
const schema = require('./SchemaGQL/schema');
const expressGraphQL = require('express-graphql');
const bodyParser = require('body-parser');
const path = require('path');
const graphql = require('graphql');
const knex = require('./dbConfig.js').knex
// const ajax = require('ajax');
const axios = require('axios');
// const $ = require('jquery')

// auth dependencies
const passportSetup = require('./passportConfig/passport-setup')
const authRoutes = require('./routes/auth-routes.js')
const authCheck = require('./routes/private-routes.js')
const cookieSession = require('cookie-session')
const session = require('express-session');
const passport = require('passport');

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
app.use(passport.initialize())
app.use(passport.session())

// set up routes
app.use('/auth', authRoutes)

// create home route
app.get('/', (req, res) => {
  res.render('login')
})

// create private route
app.use('/', express.static(path.join(__dirname, '../PublicProtected')))
app.use('/dashboard/:id', authCheck, express.static(path.join(__dirname, '../main_dist')))
app.use('/text', express.static(path.join(__dirname, '../guest_dist')))

//contacts///

app.get('/contacts:id', function(req, res) {

  knex.select('accessToken').from('user').where('id', 24)
    .then((res) => {
      console.log('res ', res)
    })

  axios.get('https://www.google.com/m8/feeds/contacts/default/full?alt=json&access_token=' + accessToken)
  .then((response) => console.log('resonse ', response.data.feed.entry))
  .catch((err) => console.log('err in get ', err))
});
//
//   function fetch(accessToken) {
//     ajax({
//       url: 'https://www.google.com/m8/feeds/contacts/default/full?alt=json',
//       dataType: 'jsonp',
//       data: accessToken
//     }).done(function(data) {
//       console.log("data ", JSON.stringify(data));
//       res.send(data);
//     });
//   }
//
//   // fetch(config.accessToken);
// })

app.get('/user', function(req, res) {
  if (req.user === undefined) {
      // The user is not logged in
      res.json({});
  } else {
      res.json({
          user: req.user
      });
  }
});




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

app.post('/', (req, res, next) => {
  graphql(schema, req.body).then((result) => {
    console.log('inside post', req.body)
    res.send(result);
  });
});

//express-graphql will accept requests with 3 parameters: (query, variables, operationName)

app.listen(4000, () => {
  console.log('Listening on port 4000')
});
