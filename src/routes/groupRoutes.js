const express = require("express");
const router = express.Router();
const groupController = require("../controllers/groupController");

router.get("/getGroups", groupController.getAllGroups);
//router.post("/createGroup", groupController.createGroup);

module.exports = router;
