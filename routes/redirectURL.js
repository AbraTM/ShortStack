const express = require('express');
const router = express.Router();
const { redirectTo } = require('../controllers/redirectURLController');

router.route("/:code").get(redirectTo);

module.exports = router;