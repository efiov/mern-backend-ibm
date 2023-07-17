const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

router.get('/ge', eventController.getEvents);
router.post('/ce', eventController.createEvent);

module.exports = router;
