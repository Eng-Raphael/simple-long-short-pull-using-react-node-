const express =  require('express');
const Notification = require('../models/Notification');
//subscriber is an object that contains all the subscribers
const subscribers = {};
// Keep track of the latest notification sent to each client
const latestNotificationSent = {};
const asyncHandler = require('../middleware/async');

exports.sendlongPollingNotification = asyncHandler(async (req, res) => {

    const { body } = req;
    const channel = req.query.channel;
  
    if (subscribers[channel]) {
      subscribers[channel].forEach((s) => {
        s.res.json({ success: true, data: body });
      });
      subscribers[channel] = [];
    }
  
    res.status(201).json({ success: true, data: body });

});

exports.getlongPollingNotification = asyncHandler(async (req, res) => {
    const ID = Math.ceil(Math.random() * 1000000000);
    const channel = req.query.channel;

  // Set the latest notification sent timestamp to the current time if it hasn't been set before
  if (!latestNotificationSent[channel]) {
    latestNotificationSent[channel] = new Date();
  }

  if (!subscribers[channel]) {
    subscribers[channel] = [];
  }

  // Only send notifications that were created after the latest notification sent to this client
  const latestTimestamp = latestNotificationSent[channel];
  const notifications = await Notification.find({ channel, createdAt: { $gt: latestTimestamp } }).exec();
  if (notifications.length > 0) {
    res.json({ success: true, data: notifications });
    latestNotificationSent[channel] = notifications[notifications.length - 1].createdAt;
  } else {
    subscribers[channel].push({ id: ID, res });
    res.on('close', () => {
      subscribers[channel] = subscribers[channel].filter((s) => s.id !== ID);
    });
  }
});