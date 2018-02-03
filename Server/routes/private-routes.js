const router = require('express').Router();

const authCheck = (req, res, next) => {
  if (req.baseUrl.substring(11).length) {
    next();
  } else if (!req.user) {
    // if user is not logged in
    res.redirect('/');
  } else {
    next();
  }
};

module.exports = authCheck;
