const express = require("express");
const database = require("./config/database");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const groupRoutes = require("./routes/groupRoutes");
const eventRoutes = require("./routes/eventRoutes");
const cors = require("cors");
const port = 3001;
const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.use("/", userRoutes);
app.use("/", groupRoutes);
app.use("/", eventRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});