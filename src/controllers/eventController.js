const Event = require("../models/eventModel");
const Group = require("../models/groupModel");
const User = require("../models/userModel");
const { sendEmail } = require("../Service/emailService");

exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createEvent = async (req, res) => {
  const event = new Event({
    name: req.body.name,
    type: req.body.type,
    date: req.body.date,
    location: req.body.location,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
  });
  const selectedGroups = req.body.selectedGroups;

  try {
    const newEvent = await event.save();
    const addGroups = await Event.findByIdAndUpdate(
      newEvent._id,
      { $push: { groups: { $each: selectedGroups } } },
      { new: true, upsert: true }
    );

    const groupEmails = await Group.find(
      { _id: { $in: selectedGroups } },
      "members"
    ).lean();

    const allEmails = groupEmails.reduce(
      (emails, group) => emails.concat(group.members),
      []
    );

    await User.updateMany(
      { _id: { $in: allEmails } },
      { $push: { events: newEvent._id } },
      { new: true, upsert: true }
    );

    const users = await User.find({ _id: { $in: allEmails } });
    const emails = users.map((user) => user.email);
    const subject = "New Event Invitation";
    const text = `You are invited to the event: ${event.name}.`;
    const html = `<p>You are invited to the event: ${event.name}.</p>`;
    await sendEmail(emails, subject, text, html);
    res.status(201).json(addGroups);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create event." });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndRemove(req.params.eventId);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json({ message: "Event deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.editEvent = async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const updatedData = req.body; // Assuming the updated data is sent in the request body

    const event = await Event.findByIdAndUpdate(eventId, updatedData, {
      new: true,
    });

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json({ message: "Event updated", event });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
