// routes/tracking.routes.js
const express = require('express');
const router = express.Router();
const { publicTrack, authTrack } = require('../controllers/tracking.controller');
const { protect } = require('../middleware/authMiddleware');

// Consulta pública (sem login)
router.get('/public', publicTrack);

// Consulta com login e suporte completo
router.get('/secure', protect, authTrack);

module.exports = router;