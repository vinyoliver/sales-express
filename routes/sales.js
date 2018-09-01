const express = require('express');
const router = express.Router();

const SaleModel = require('../models/sale');

router.get('/', function (req, res, next) {
  SaleModel.find()
    .then(function (data) {
      res.render('sales/grid', { data: data });
    });
});

router.get('/new', function (req, res, next) {
  res.render('sales/form');
});

router.post('/add', function (req, res, next) {
  const model = new SaleModel(req.body);
  model.save().then(() => {
    req.flash('success', 'Saved successfuly');
    res.redirect('/');
  });
});

module.exports = router;
