const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  first_name: String,
  last_name: String,
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  is_staff: {
    type: Boolean,
    default: false,
  },
  resetToken: String,
  resetTokenExpiration: String,
});

module.exports = mongoose.model("User", userSchema);
