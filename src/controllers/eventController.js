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
    lat: req.body.lat,
    long: req.body.long
  });

  try {
    const newEvent = await event.save();
    res.status(201).json(newEvent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
