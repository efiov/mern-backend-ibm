const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");

router.get("/ge", eventController.getEvents);
router.post("/ce", eventController.createEvent);
router.delete("/ge/:eventId", eventController.deleteEvent);
router.put("/ge/:eventId", eventController.editEvent);

module.exports = router;
