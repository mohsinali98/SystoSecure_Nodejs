const mongoose = require("mongoose");

const announcementSchema = mongoose.Schema({
    date: {
        type: String,
        required: true
    },
    announceText: {
        type: String,
        required: true
    }
})

const Announcement = mongoose.model("Announcement", announcementSchema);

exports.Announcement = Announcement;