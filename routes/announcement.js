const auth = require("../middleware/auth");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { Announcement } = require('../models/announcement');
const express = require("express");

const router = express.Router();

router.get("/", async (req, res) => {
    const announcement = await Announcement.find().sort({'date':'desc'});
    res.send(announcement);
});


module.exports = router;
