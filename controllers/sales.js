const SaleModel = require('../models/sale');
const mongoose = require('mongoose');


const SalesController = {
    index: (req, res) => {
        SaleModel.find()
            .then(function (data) {
                res.render('sales/grid', { data: data });
            });
    },

    new: (req, res) => {
        res.render('sales/form');
    },

    save: (req, res) => {
        const id = req.body._id;
        const sale = instanceSale(req.body);

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
    },

    edit: (req, res, next) => {
        SaleModel.findOne({ _id: req.params.id })
            .then(function (data) {
                res.render('sales/form', { data: data });
            });
    },

    delete: (req, res, next) => {
        SaleModel.findOneAndRemove({ _id: req.params.id })
            .then(function () {
                res.status(200).send();
            }).catch(err => {
                res.status(500).send();
            })
    }

}

instanceSale = (body) => {
    return {
        title: body.title,
        description: body.description,
        price: body.price,
        url: body.url,
        category: body.category
    }
}

module.exports = SalesController;