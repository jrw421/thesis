const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20');
const db = require('../ControllersDB/mainController.js')
const axios = require('axios')

passport.serializeUser((user, done) => {
  // takes user id and makes it a cookie

  // axios.get('https://www.google.com/m8/feeds/contacts/default/full?alt=json&access_token=' + user.accessToken)
  // .then((response) => {
  //   // db.user.findOrCreateUser(body)
  //   //      .then(user => {
  //          user.contacts = response.data.feed.entry;
  //          console.log('USER IN PASSPORT ', user)
  //          done(null, user.id)
  //        // })
  //      })
  // .catch((err) => console.log('err in get ', err))


  done( null, user.id)
})

passport.deserializeUser(( id, done) => {
  // retrieve id from cookie
  // and use it to access user in database
  console.log('are we here????')
    db.user.getUser(id).then((user) => {

      done(null, user)
    }).catch(x => console.log(x))
})

passport.use(
  new GoogleStrategy({
    // oprtions for the google strat
    callbackURL: '/auth/google/redirect',
    clientID: '958835359621-ar0pkshcuaba693ki10vaq1cc1j6qtk8.apps.googleusercontent.com',
    clientSecret: '4qDzcSsqkWieHEABXAf1XMpH'
  }, (accessToken, refreshToken, profile, done) => {
    console.log('access token!!!!!!!!', accessToken)
    const body = {
      google_id: profile.id,
      name: profile.displayName,
      img: profile.photos[0].value,
      etag:profile._json.etag,
      accessToken: accessToken,
      refreshToken: refreshToken,
      email: profile.emails[0].value
    }

    // console.log('token is ', body.accessToken)
    //
    // axios.get('https://www.google.com/m8/feeds/contacts/default/full?alt=json&access_token=' + accessToken)
    // .then((response) => {
    //   db.user.findOrCreateUser(body)
    //        .then(user => {
    //          user.contacts = response.data.feed.entry;
    //          console.log('USER IN PASSPORT ', user)
    //          done(null, user)
    //        })
    //      })
    // .catch((err) => console.log('err in get ', err))

    db.user.findOrCreateUser(body)
           .then(user => {
             done(null, user)
           })
           .catch(error => error)
  })
)
