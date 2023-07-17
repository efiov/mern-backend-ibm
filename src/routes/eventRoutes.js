const express = require('express');
const eventController = require('../controllers/eventController');

router.get('/', eventController.getEvents);
router.post('/ce', eventController.createEvent);

module.exports = router;
