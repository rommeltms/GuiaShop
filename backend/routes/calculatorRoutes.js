const express = require('express');
const router = express.Router();
const calculatorController = require('../controllers/calculatorController');

router.post('/estimate', calculatorController.estimateTax);

module.exports = router;
