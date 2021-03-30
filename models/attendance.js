const mongoose = require("mongoose");

const attendanceSchema = mongoose.Schema({
    username: {
        type: String
    },
    date: {
        type: String,
    },
    time:{
        type:String
    }

})

const Attendance = mongoose.model("Attendance", attendanceSchema);

exports.Attendance = Attendance;