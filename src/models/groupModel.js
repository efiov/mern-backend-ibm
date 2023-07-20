const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    members: [
      {
        type: [String],
        require: false,
      },
    ],
  },
  { collection: "Group" }
);

const Group = mongoose.model("Group", groupSchema);

module.exports = Group;
