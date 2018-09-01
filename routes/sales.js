const express = require('express');
const router = express.Router();

const SalesController = require('../controllers/sales');

router.get('/', SalesController.index);
router.get('/new', SalesController.new);
router.post('/', SalesController.save);
router.get('/:id', SalesController.edit);
router.delete('/:id', SalesController.delete);

module.exports = router;
