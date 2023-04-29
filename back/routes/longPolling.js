const express = require('express');


const {
    sendlongPollingNotification,
    getlongPollingNotification,
} = require('../controllers/longPollingController');

const router = express.Router();

router.route('/notification').post(sendlongPollingNotification).get(getlongPollingNotification);

module.exports = router;
