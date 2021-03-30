const auth = require("../middleware/auth");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { Result } = require('../models/result');
const express = require("express");

const router = express.Router();

router.get('/:username', async (req, res) => {
    let result = await Result.find({ username: req.params.username });
    res.send(result);
});


module.exports = router;
