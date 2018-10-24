const UserController = require('../controllers/users');

const express = require('express');
const router = express.Router();

router.get('/', UserController.index);
router.get('/sign-up', UserController.signUp);
router.post('/register', UserController.register);

module.exports = router;
