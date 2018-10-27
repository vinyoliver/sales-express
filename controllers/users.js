const UserModel = require('../models/user');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');


const UserController = {

    index: (req, res) => {
        res.send('respond with a resource');
    },

    signUp: (req, res) => {
        res.render('users/sign-up');
    },

    signIn: (req, res) => {
        res.render('users/sign-in');
    },

    register: (req, res) => {

        req.checkBody('name', 'Name is required').notEmpty();
        req.checkBody('email', 'Email is required').notEmpty();
        req.checkBody('password', 'Password is required').notEmpty();
        req.checkBody('password', 'Passwords do not match').equals(req.body.confirmPassword);

        var errors = req.validationErrors();
        if (errors) {
            errors.forEach(err => req.flash('danger', err.msg));
            req.session.errors = errors;
            let backUrl = req.header('Referer') || '/';
            res.redirect(backUrl);
            //res.render('sales/form', {data: req.body}); TODO...

        } else {
            const model = new UserModel(req.body);

            bcrypt.hash(model.password, 10, (err, hashValue) => {
                if (err) {
                    //...
                } else {
                    model.password = hashValue;

                    model.save().then(() => {
                        req.flash('success', 'Saved successfuly');
                        res.redirect('/');
                    });
                }
            })
        }
    },

    login: (req, res, next) => {
        passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/users/sign-in',
            failureFlash: true
        })(req, res, next);
    },

    logout: (req, res) => {
        req.logout();
        req.flash('success', 'Signed out successfuly');
        res.redirect('/');
    },

}

module.exports = UserController;