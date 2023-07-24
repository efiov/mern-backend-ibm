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

exports.deleteGroup = async (req, res) => {
  try {
    const user = await Group.findOneAndDelete({ _id: req.body.id });
    if (!user) {
      return res.status(400).send("Group not found");
    }
    return res
      .status(200)
      .send("Grup with id " + req.body.id + " has been deleted");
  } catch (err) {
    return res.status(400).json(err);
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
