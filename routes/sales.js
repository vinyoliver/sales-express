const express = require('express');
const router = express.Router();

const SalesController = require('../controllers/sales');
const authGuard = require('../middlewares/authGuard');

router.get('/', SalesController.index);
router.get('/new', authGuard, SalesController.new);
router.post('/', authGuard, SalesController.save);
router.get('/:id', authGuard, SalesController.edit);
router.delete('/:id', authGuard, SalesController.delete);

module.exports = router;
