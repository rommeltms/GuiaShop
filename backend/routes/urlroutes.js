// routes/urlRoutes.js

const express = require('express');
const router = express.Router();
const { getUrls, createUrl } = require('../controllers/urlController');

router.get('/', getUrls);
router.post('/', createUrl);

module.exports = router;
