const router = require('express').Router();
const passport = require('passport');

// auth logout
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

// auth with google
router.get(
  '/google',
  passport.authenticate('google', {
    scope: [
      'profile',
      'email',
      'https://mail.google.com/',
      'https://www.google.com/m8/feeds/contacthttps://www.googleapis.com/auth/calendars', 
      'https://www.googleapis.com/auth/calendar'
    ], 
    access_type: 'offline',
    prompt: 'consent'
  })
);

// callback route for google to redirect to
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {

  res.redirect('/dashboard');

});

module.exports = router;
