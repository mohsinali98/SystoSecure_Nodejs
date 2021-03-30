const mongoose = require("mongoose");

const timetableSchema = mongoose.Schema({
    monday: {
        type: Object
    },
    tuesday: {
        type: Object
    },
    wednesday: {
        type: Object
    },
    thursday: {
        type: Object
    },
    friday: {
        type: Object
    },
})

const TimeTable = mongoose.model("TimeTable", timetableSchema);
exports.TimeTable = TimeTable;