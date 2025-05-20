// routes/order.routes.js
const express = require('express');
const router = express.Router();
const { registerOrder } = require('../controllers/order.controller');
const { protect } = require('../middleware/authMiddleware');

// POST /api/orders
router.post('/', protect, registerOrder);

module.exports = router;