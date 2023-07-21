const Event = require("../models/eventModel");
const Group = require("../models/groupModel");
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
    description: req.body.description,
    date: req.body.date,
    location: req.body.location,
  });

  try {
    const newEvent = await event.save();
    res.status(201).json(newEvent);
    const selectedGroups = req.body.selectedGroups;
    const groupEmails = await Group.find(
      { _id: { $in: selectedGroups } },
      "members"
    ).lean();

    const allEmails = groupEmails.reduce(
      (emails, group) => emails.concat(group.members),
      []
    );

    // Customize the subject and email content to your needs
    const subject = "New Event Invitation";
    const text = `You are invited to the event: ${event.name}.`;
    const html = `<p>You are invited to the event: ${event.name}.</p>`;

    // Send the email to all members of the selected groups
    await sendEmail(allEmails, subject, text, html);

    res.status(201).json(savedEvent);
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
