const express = require('express');
const router = express.Router();

const UserModel = require('../models/user');

router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/sign-up', function (req, res, next) {
  res.render('users/sign-up');
});

router.post('/register', function (req, res, next) {
  const model = new UserModel(req.body);
  model.save().then(() => {
    req.flash('success', 'Saved successfuly');
    res.redirect('/');
  });
});

module.exports = router;
