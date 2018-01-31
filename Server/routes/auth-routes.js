const router = require('express').Router();
const passport = require('passport')

// auth logout
router.get('/logout', (req, res) => {
  // handle with passport
  req.logout();
  res.redirect('/')
})

// auth with google
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'https://www.googleapis.com/auth/contacts.readonly']
}))

// callback route for google to redirect to
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  // res.send('you reached the callback URI')
  res.redirect('/dashboard')
})

module.exports = router;