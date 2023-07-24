const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    groups: [{ 
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group"
   }]
  },
  { collection: "Event" }
);

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
