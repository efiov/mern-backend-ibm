const Group = require("../models/groupModel");

exports.getAllGroups = async (req, res) => {
  try {
    const groups = await Group.find();
    res.json(groups);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
