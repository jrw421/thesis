const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const db = require('../ControllersDB/mainController.js');
const axios = require('axios');

passport.serializeUser((user, done) => {
  // takes user id and makes it a cookie
  done(null, user);
});

passport.deserializeUser((user, done) => {
  // retrieve id from cookie
  // and use it to access user in database
  console.log('deserialize', user)
  
      done(null, user);
  
});

passport.use(
  new GoogleStrategy(
    {
      callbackURL: '/auth/google/redirect',
      clientID:
        '958835359621-ar0pkshcuaba693ki10vaq1cc1j6qtk8.apps.googleusercontent.com',
      clientSecret: '4qDzcSsqkWieHEABXAf1XMpH'
    },
    (accessToken, refreshToken, profile, done) => {
      const body = {
        google_id: profile.id,
        name: profile.displayName,
        img: profile.photos[0].value,
        accessToken: accessToken,
        email: profile.emails[0].value
      };

      db.user
        .findOrCreateUser(body)
        .then(user => {
          done(null, user);
        })
        .catch(error => console.log(50, error));
    }
  )
);
