const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  first_name: String,
  last_name: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  is_staff: {
    type: Boolean,
    default: false,
  },
  image: {
    type: String,
    default: "default/default-image.png",
  },
  resetToken: String,
  resetTokenExpiration: String,
});

// Define virtual property for full name
userSchema.virtual("full_name").get(function() {
  return this.first_name + " " + this.last_name;
});

module.exports = mongoose.model("User", userSchema);
