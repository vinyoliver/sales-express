const UserController = require('../controllers/users');

const express = require('express');
const router = express.Router();

router.get('/', UserController.index);
router.get('/sign-up', UserController.signUp);
router.post('/register', UserController.register);
router.get('/sign-in', UserController.signIn);
router.post('/login', UserController.login);
router.get('/logout', UserController.logout);

module.exports = router;
