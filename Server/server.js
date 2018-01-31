const express = require('express');
const schema = require('./SchemaGQL/schema');
const expressGraphQL = require('express-graphql');
const bodyParser = require('body-parser');
const path = require('path');
const graphql = require('graphql')
const axios = require('axios')

// auth dependencies
const passportSetup = require('./passportConfig/passport-setup')
const authRoutes = require('./routes/auth-routes.js')
const authCheck = require('./routes/private-routes.js')
const cookieSession = require('cookie-session')
const session = require('express-session');
const passport = require('passport');

const app = express();

const flash = require('connect-flash');
const util = require('util')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const $ = require('jquery');

const app = express();


//contacts///

app.get('/contacts', function(req, res) {
  function auth() {
    var config = {
      'client_id': '3van90@gmail.com',
      'scope': 'https://www.google.com/m8/feeds'
    };
    gapi.auth.authorize(config, function() {
      fetch(gapi.auth.getToken());
    });
  }

  function fetch(token) {
    $.ajax({
      url: 'https://www.google.com/m8/feeds/contacts/default/full?alt=json',
      dataType: 'jsonp',
      data: token
    }).done(function(data) {
      console.log("data ", JSON.stringify(data));
    });
  }

})
/////////


// auth //
/////////
passport.use(new GoogleStrategy({
  clientID: '958835359621-ar0pkshcuaba693ki10vaq1cc1j6qtk8.apps.googleusercontent.com',
  clientSecret: '4qDzcSsqkWieHEABXAf1XMpH',
  callbackURL: 'http://localhost:4000/login/google/return',
  passReqToCallback: true
},
function(request, accessToken, refreshToken, profile, done) {
  // User.findOrCreate({ googleId: profile.id }, function (err, user) {
  //   return cb(err, user);
  // });
  console.log('profile', profile)
  process.nextTick(()=> {return done(null, profile)})
}
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

>>>>>>> merging
app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')

app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: ['asdfjkls']
}))

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
app.use('/dashboard', authCheck, express.static(path.join(__dirname, '../Public')))

app.get('/user', function(req, res) {
  if (req.user === undefined) {
      // The user is not logged in
      res.json({});
  } else {
      res.json({
          username: req.user
      });
  }
});
// Google Contacts //
/////////////////////
//
// app.get('/emails', function(req, res){
//   console.log('inside emails route')
//   axios.get('https://www.google.com/m8/feeds/contacts/3van90@gmail.com/full')
//       .then(data => {
//         console.log('data', data)
//         res.end(data)
//       })
//       .catch(error => {
//         console.log('error', error)
//         res.end(error)
//       })
// })

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
    res.send(result);
  });
});

//express-graphql will accept requests with 3 parameters: (query, variables, operationName)

app.listen(4000, () => {
  console.log('Listening on port 4000')
});
