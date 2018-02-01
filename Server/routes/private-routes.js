const router = require('express').Router();

const authCheck = (req, res, next) => {
  console.log('checking auth', req.user)
  if (!req.user) {
    // if user is not logged in
    res.redirect('/')
  } else {
    next()
  }
}

// router.get('/dashboard', authCheck, (req, res) => {
//   res.redirect('/')
// })

module.exports = authCheck
