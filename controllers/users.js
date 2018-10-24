const UserModel = require('../models/user');
const mongoose = require('mongoose');


const UserController = {
    
    index: (req, res) => {
        res.send('respond with a resource');
    },
      
    signUp: (req, res) => {
        res.render('users/sign-up');
    },
      
    register: (req, res) => {
        const model = new UserModel(req.body);
        model.save().then(() => {
          req.flash('success', 'Saved successfuly');
          res.redirect('/');
        });
    },

}

module.exports = UserController;