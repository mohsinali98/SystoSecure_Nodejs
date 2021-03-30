const jwt = require("jsonwebtoken");
const Joi = require("joi");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50
  },
  username: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  },
  profileImg: {
    type: Buffer
  },
  isAdmin: Boolean
});

userSchema.methods.generateAuthToken = function () {
  const jwtPrivateKey = "NewPrivateKey";
  const token = jwt.sign(
    {
      _id: this._id,
      name: this.name,
      username: this.username,
      isAdmin: this.isAdmin
    },
    jwtPrivateKey
  );
  return token;
};

const User = mongoose.model("User", userSchema);

exports.User = User;
