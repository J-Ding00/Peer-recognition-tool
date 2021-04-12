const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notificationSchema = new Schema(
    {
        message:        String,
        arrivalTime:    Date,
        recognitionID:  mongoose.ObjectId
    }, {
        collection: "Notifications"
    }
);

const Notification = mongoose.model("Notification", notificationSchema, "Notifications");

module.exports = Notification;