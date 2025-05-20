// routes/user.routes.js
const express = require('express');
const router = express.Router();
const { getUserProfile, updateUserProfile } = require('../controllers/user.controller');
const { protect } = require('../middleware/authMiddleware');

// GET /api/user/profile
router.get('/profile', protect, getUserProfile);

// PUT /api/user/profile
router.put('/profile', protect, updateUserProfile);

module.exports = router;