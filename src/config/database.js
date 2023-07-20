require("dotenv").config();
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: "lab",
});

const database = mongoose.connection;

database.on("error", (error) => {
  console.error("Connection error:", error);
  process.exit(1);
});
database.once("open", function () {
  console.log("Connected to MongoDB");
});

module.exports = database;
