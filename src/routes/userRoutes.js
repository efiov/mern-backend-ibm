const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/getUsers", userController.getUsers);
router.post("/my", userController.myEvents);
router.post("/updateRoleToAdmin", userController.updateRoleToAdmin);
router.post("/updateRoleToUser", userController.updateRoleToUser);

module.exports = router;
