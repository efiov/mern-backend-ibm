const express = require('express');
const database = require('./config/database');
const eventRoutes = require('./routes/eventRoutes');
const { events } = require('./models/eventModel');
const bodyParser = require("body-parser");
const passport = require("passport");
const { users } = require("./models/userModel");
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');

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

app.use(passport.initialize());
require("./config/passport")(passport);
app.use("/", userRoutes);

const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
