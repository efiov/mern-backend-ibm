const express = require("express");
//const { events } = require("./models/eventModel");
const bodyParser = require("body-parser");
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
//app.use('/events', eventRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
