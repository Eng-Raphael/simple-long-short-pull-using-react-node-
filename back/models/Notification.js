const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    content:{
        type: String,
        minLength:3,
        maxLength:100,
        trim: true,
    }
},{timestamps:true});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;