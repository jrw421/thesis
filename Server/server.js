const express = require('express');
const schema = require('./SchemaGQL/schema');
const expressGraphQL = require('express-graphql');
const bodyParser = require('body-parser');
const path = require('path');
const graphql = require('graphql')

// auth dependencies
const cookieParser = require('cookie-parser');
const session = require('express-session');
const logger = require('express-logger')
const methodOverride = require('method-override')
const passport = require('passport');
const flash = require('connect-flash');
const util = require('util')
var GoogleStrategy = require('passport-google-oauth20').Strategy;

const app = express();

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
  process.nextTick(()=> {return done(null, profile)})
}
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

app.set('views', __dirname + '/views')
app.set('view engine', 'ejs');
// app.use(logger());
app.use(cookieParser());
app.use(bodyParser());
app.use(methodOverride());
app.use(session({ 
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/dashboard', ensureAuthenticated, express.static(path.join(__dirname, '../Public')))

app.get('/', function(req, res){
  res.render('home', { user: req.user });
});

app.get('/login',
  function(req, res){
    res.render('login', {user: req.user});
});

app.get('/login/google', passport.authenticate('google', {scope: 'https://www.googleapis.com/auth/plus.login'}));

app.get('/login/google/return', 
  passport.authenticate('google', { failureRedirect: '/', successRedirect: '/dashboard' })),
  // function(req, res) {
  //   cosole.log('redirecting to dashboard')
  //   res.redirect('/dashboard');
// });

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
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
    res.send(result);
  });
});

//express-graphql will accept requests with 3 parameters: (query, variables, operationName)

app.listen(4000, () => {
  console.log('Listening on port 4000')
});


// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}