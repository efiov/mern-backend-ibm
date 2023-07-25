const express = require("express");
const router = express.Router();
const groupController = require("../controllers/groupController");

router.get("/getGroups", groupController.getGroups);
router.post("/createGroup", groupController.createGroup);
router.delete("/deleteGroup", groupController.deleteGroup);

module.exports = router;
