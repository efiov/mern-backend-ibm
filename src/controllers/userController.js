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
      .populate("myEvents")
      .populate("groups")
      .then((user) => {
        res.json(user);
      });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateRoleToAdmin = async (req, res) => {
  const id = req.body.id;
  const updates = {
    $set: {
      role: "ADMIN",
    },
  };
  try {
    const user = await User.findByIdAndUpdate(id, updates, { new: true });

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Error occurred while updating user." });
  }
};

exports.updateRoleToUser = async (req, res) => {
  const id = req.body.id;
  const updates = {
    $set: {
      role: "USER",
    },
  };
  try {
    const user = await User.findByIdAndUpdate(id, updates, { new: true });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Error occurred while updating user." });
  }
};

exports.joinEvent = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { email: req.body.email },
      { $addToSet: { myEvents: req.body.eventId } },
      { new: true, upsert: true }
    );
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    res.json(user);
  } catch (error) {}
};
