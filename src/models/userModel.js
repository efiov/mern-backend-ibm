const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: false,
    },
    image: {
      type: Date,
      required: false,
    },
    admin: {
      type: Boolean,
      required: false,
    },
  },
  { collection: "User" }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
