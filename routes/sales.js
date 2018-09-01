const express = require('express');
const router = express.Router();
const SaleModel = require('../models/sale');
const mongoose = require('mongoose');

router.get('/', function (req, res, next) {
  SaleModel.find()
    .then(function (data) {
      res.render('sales/grid', { data: data });
    });
});

router.get('/new', function (req, res, next) {
  res.render('sales/form');
});

router.post('/', function (req, res, next) {
  const id = req.body._id;
  const sale = {
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    url: req.body.url,
    category: req.body.category
  }

  if (id) {
    SaleModel.findOneAndUpdate({ _id: id }, sale).then(data => {
      req.flash('success', 'Saved successfuly');
      res.redirect('/');
    })
  } else {
    const model = new SaleModel(sale);
    model.save().then(() => {
      req.flash('success', 'Saved successfuly');
      res.redirect('/');
    });
  }
});


router.get('/:id', function (req, res, next) {
  SaleModel.findOne({ _id: req.params.id })
    .then(function (data) {
      res.render('sales/form', { data: data });
    });
});

router.delete('/:id', function (req, res, next) {
  SaleModel.findOneAndRemove({ _id: req.params.id })
    .then(function () {
      res.status(200).send();
    }).catch(err => {
      res.status(500).send();
    })
});


module.exports = router;
