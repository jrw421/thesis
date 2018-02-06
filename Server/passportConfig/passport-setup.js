const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const db = require('../ControllersDB/mainController.js');
const axios = require('axios');

passport.serializeUser((user, done) => {
  // takes user id and makes it a cookie
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  // retrieve id from cookie
  // and use it to access user in database
  db.user
    .getUserById(id)
    .then(user => {
      console.log('deserializeuser', user)
      done(null, user);
    })
    .catch(error => console.log(40, error));
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
        .getUserByGoogleId(body.google_id)
        .then(user => {
          if (user === undefined) {
            db.user
              .createUserOnSignup(body)
              .then(user => {
                done(null, user);
              })
              .catch(error => {
                console.log(error);
              });
          } else {
            db.user
              .editField(user.id, 'accessToken', body.accessToken)
              .then(user => {
                done(null, user);
              })
              .catch(error => {
                console.log(error);
              });
            done(null, user);
          }
        })
        .catch(error => console.log(50, error));
    }
  )
);
