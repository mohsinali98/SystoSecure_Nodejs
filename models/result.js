const mongoose = require("mongoose");

const resultSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    english: {
        type: Number
    },
    urdu: {
        type: Number
    },
    maths: {
        type: Number
    },
    chemistry: {
        type: Number
    },
    physics: {
        type: Number
    },
    total: {
        type: Number
    },
    obtained: {
        type: Number
    }
})

const Result = mongoose.model("Result", resultSchema);

exports.Result = Result;