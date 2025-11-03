const express = require('express');
const router = express.Router();
const { shortenURL } = require('../controllers/permURLController');

router.route('/:url').post(shortenURL);

module.exports = router;