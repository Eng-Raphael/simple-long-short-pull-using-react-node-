const Notification = require('../models/Notification');

//subscriber is an object that contains all the subscribers
const subscribers = {};

// Keep track of the latest notification sent to each client
const latestNotificationSent = {};

const asyncHandler = require('../middleware/async');

exports.sendShortPollingNotification = asyncHandler(async (req, res) => {
        
        const notification = await Notification.create( {content:req.body.content} );
    
        // Update the latest notification sent timestamp for all subscribers of this channel
        const channel = req.body.channel;
        if (subscribers[channel]) {
          latestNotificationSent[channel] = notification.createdAt;
        }

        res.status(201).json({ success: true, data: notification });
});

exports.getShortPollingNotification = asyncHandler(async (req, res) => {

        const notifications = await Notification.find().exec();
        res.status(201).json({ success: true, data: notifications });

});