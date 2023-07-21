const Group = require("../models/groupModel");
const User = require("../models/userModel");

exports.getGroups = async (req, res) => {
  try {
    const groups = await Group.find();
    res.json(groups);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch groups" });
  }
};

exports.createGroup = async (req, res) => {
  const groupName = req.body.name;
  const membersIds = req.body.members;

  try {
    const group = await Group.create({
      name: groupName,
    });

    const addMembers = await Group.findByIdAndUpdate(
      group._id,
      { $push: { members: { $each: membersIds } } },
      { new: true, upsert: true }
    );

    res.status(201).json(addMembers);
  } catch (err) {
    console.error("Error while creating a group:", err);
    res.status(500).json({ error: "Failed to create group" });
  }
};
