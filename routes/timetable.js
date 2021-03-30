const auth = require("../middleware/auth");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { TimeTable } = require('../models/timetable');
const express = require("express");

const router = express.Router();

router.get('/', async (req, res) => {
    const timetable = await TimeTable.find();
    res.send(timetable);
});


module.exports = router;
