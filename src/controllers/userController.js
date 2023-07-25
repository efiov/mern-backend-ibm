const User = require("../models/userModel");

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.myEvents = async (req, res) => {
  try {
    User.findOne({ email: req.body.email })
      .populate("events")
      .populate("groups")
      .then((user) => {
        res.json(user);
      });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
