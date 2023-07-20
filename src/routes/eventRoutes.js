const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");

router.get("/getEvents", eventController.getEvents);
router.post("/createEvent", eventController.createEvent);
router.post("/deleteEvent", eventController.deleteEvent);
router.post("/editEvent", eventController.editEvent);

module.exports = router;
