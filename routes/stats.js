const express = require('express');
const router = express.Router();
const { getStats, getStatsForAll } = require('../controllers/statsController');

router.route("/all").get(getStatsForAll);
router.route("/:code").get(getStats);

module.exports = router;