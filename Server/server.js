const express = require('express');
const schema = require('./SchemaGQL/schema');
const expressGraphQL = require('express-graphql');
const bodyParser = require('body-parser');
const path = require('path');
const graphql = require('graphql');
const knex = require('./dbConfig.js').knex;
const axios = require('axios');
const webpush = require('web-push');
const db = require('./ControllersDB/mainController.js');

//  vapid keys
const vapidKeys = require('../main_dist/swConfig');

// auth dependencies
const passportSetup = require('./passportConfig/passport-setup');
const authRoutes = require('./routes/auth-routes.js');
const authCheck = require('./routes/private-routes.js');
const cookieSession = require('cookie-session');
const session = require('express-session');
const passport = require('passport');

const app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: ['asdfjkls']
  })
);

app.use(bodyParser.json({ extended: true }));

/////////
// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// set up routes
app.use('/auth', authRoutes);

// create home route
app.get('/', (req, res) => {
  res.render('login');
});

// create private route
app.use('/', express.static(path.join(__dirname, '../PublicProtected')));
app.use('/dashboard', authCheck, express.static(path.join(__dirname, '../main_dist')));
app.use('/eventPage/:id', express.static(path.join(__dirname, '../guest_dist')));


//contacts///

app.post('/contacts', function(req, res) {
  console.log('are we in the post request')
  axios.get(`https://www.google.com/m8/feeds/contacts/default/thin?access_token=${req.body.accessToken}&alt=json&max-results=500&v=3.0`)
    .then(response => {
      console.log('response.data.feed', response.data.feed)
      res.json(response.data.feed)
    })
    .catch(error => {
      console.log(error)
      return error
    })
})

app.get('/user', function(req, res) {
  console.log('re.user', req.user)
  if (req.user === undefined) {
    // The user is not logged in
    res.json({});
  } else {
    console.log('user info from /user', req.user);
    res.json({
      user: req.user
    });
  }
});

//check if valid subscription

// const isValidSaveRequest = (req, res) => {
//   // Check the request body has at least an endpoint.
//   if (!req.body || !req.body.endpoint) {
//     // Not a valid subscription.
//     res.status(400);
//     res.setHeader('Content-Type', 'application/json');
//     res.send(JSON.stringify({
//       error: {
//         id: 'no-endpoint',
//         message: 'Subscription must have an endpoint.'
//       }
//     }));
//     return false;
//   }
//   return true;
// };

// save subscription sent from service worker
app.post('/api/save-subscription/', function (req, res) {
  console.log('CLIENT SENT FOLLOWING SUBSCR INFO', req.body);
  // if (!isValidSaveRequest(req, res)) {
  //   return;
  // }
  let userId = req.body.userId,
  subscription = JSON.stringify(req.body.subscription);

  db.user.editField(userId, "subscription", subscription)
    .then(result => {
      console.log('user updated with subscription data', result)
      res.send(JSON.stringify({ data: { success: true } }));
    })
    .catch(function(err) {
        res.status(500);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({
          error: {
            id: 'unable-to-save-subscription',
            message: 'The subscription was received but we were unable to save it to our database.'
          }
        }));
      });
});

// set up push to client

webpush.setVapidDetails(
  'mailto:mavcro@gmail.com',
  vapidKeys.public,
  vapidKeys.private
);


// graphql //
////////////
app.use(/\/((?!graphql).)*/, bodyParser.urlencoded({ extended: true }));
app.use(/\/((?!graphql).)*/, bodyParser.json());
app.use(
  '/graphql',
  expressGraphQL({
    schema: schema,
    graphiql: true,
    // Connection: 'keep-alive',

    //this allows the graphiql interface (GQL's postman) to load in browser
    //to access: 'localhost:4000/graphiql'
    formatError: error => ({
      message: error.message,
      locations: error.locations,
      stack: error.stack,
      path: error.path
    })
  })
);

app.post('/', (req, res, next) => {
  graphql(schema, req.body).then(result => {
    res.send(result);
  });
});

app.listen(4000, () => {
  console.log('Listening on port 4000');
});
