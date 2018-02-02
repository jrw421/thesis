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
  scope: ['profile', 'email', 'https://mail.google.com/', 'https://www.google.com/m8/feeds/contacts']
}))

// callback route for google to redirect to
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
	console.log('helllloooo')
  // res.send('you reached the callback URI')
  res.redirect('/dashboard/0')
})

module.exports = router;
