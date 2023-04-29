const express = require('express');

const {
    sendShortPollingNotification,
    getShortPollingNotification,
} = require('../controllers/shortPollingController');

const router = express.Router();

router.route('/notification').post(sendShortPollingNotification).get(getShortPollingNotification);

module.exports = router;