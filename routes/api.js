const express = require("express");
const router = express.Router();
const userController = require("@/app/controllers/api/userController");

router.get("/users", userController.createUserAction);

module.exports = router;
