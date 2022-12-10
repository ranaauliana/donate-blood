const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  passConfirm: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("User", userSchema);
