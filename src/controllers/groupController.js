const Group = require("../models/groupModel");

exports.getAllGroups = async (req, res) => {
  try {
    const groups = await Group.find();
    res.json(groups);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createGroup = async (req, res) => {
  try {
    const groupName = req.body.name;
    const groupPeople = req.body.people;
    const group = new Group({ name: groupName, people: groupPeople });
    await group.save();
    res.status(201).json(group);
  } catch (err) {
    console.error("Error while creating a group:", err);
    res.status(500).json({ error: "Failed to create group" });
  }
};
