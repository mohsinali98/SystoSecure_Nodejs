const auth = require("../middleware/auth");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { Exam } = require('../models/exam');
const express = require("express");

const router = express.Router();

router.get("/", async (req, res) => {
    const exam = await Exam.find().sort({'date':'desc'});
    res.send(exam);
});

router.post("/", async (req, res) => {
    const exam = new Exam(_.pick(req.body, ["date", "exam"]));
    await exam.save();
    res.send(_.pick(exam, ["date", "exam"]));
});

module.exports = router;
