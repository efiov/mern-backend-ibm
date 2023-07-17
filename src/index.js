const express = require("express");
const { events } = require("./models/eventModel");
const bodyParser = require("body-parser");
const eventRoutes = require('./routes/eventRoutes');
const database = require('./config/database');
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
app.use("/", eventRoutes);

app.get('/', (req, res) => {
  res.send('hello world')
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
