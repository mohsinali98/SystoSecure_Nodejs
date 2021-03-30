const mongoose = require("mongoose");

const examSchema = mongoose.Schema({
    date: {
        type: String,
        required: true
    },
    exam: {
        type: String,
        required: true
    }
})

const Exam = mongoose.model("Exam", examSchema);

exports.Exam = Exam;