const auth = require("../middleware/auth");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { Attendance } = require('../models/attendance');
const express = require("express");
const moment = require('moment');

const router = express.Router();

router.get("/today/:username", auth, async (req, res) => {
    let attendance = await Attendance.find({ username: req.params.username }).sort({'time':'desc'});
    attendance=attendance.filter(d=>(d.date===moment().format('l')));
    res.send(attendance);
});

router.get("/history/:username", auth, async (req, res) => {
    const attendance = await Attendance.find({ username: req.params.username }).sort({'date':'desc','time':'desc'});
    res.send(attendance);
});

module.exports = router;
