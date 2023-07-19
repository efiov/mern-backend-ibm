const Event = require("../models/eventModel");

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
  } catch (err) {
    res.status(400).json({ message: err.message });
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
