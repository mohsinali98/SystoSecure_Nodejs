const auth = require("../middleware/auth");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User } = require("../models/user");
const express = require("express");
const multer = require('multer');
const sharp = require('sharp');
const router = express.Router();

router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});

const upload = multer({
  fileFilter(req, file, cb) {
    if (!(file.originalname.endsWith('.jpg') || file.originalname.endsWith('.jpeg') || file.originalname.endsWith('.png'))) {
      return cb(new Error('Please upload an image...'));
    }
    cb(undefined, true);
  }
});

router.post("/", upload.single('profileImg'), async (req, res) => {
  let user = await User.findOne({ username: req.body.username });
  if (user) return res.status(400).send("This Username is already registered.");

  const buffer = await sharp(req.file.buffer).resize({ width: 200, height: 200, fit: sharp.fit.inside }).jpeg().toBuffer();
  req.body.profileImg = buffer;

  user = new User({
    "name": req.body.name,
    "username": req.body.username,
    "password": req.body.password,
    "profileImg": req.body.profileImg,
    "isAdmin": req.body.isAdmin
  });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  user1 = new User(_.pick(user, ["_id", "name", "username", "isAdmin"]));

  const token = user1.generateAuthToken();
  res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token")
    .send(user1);
});

module.exports = router;
