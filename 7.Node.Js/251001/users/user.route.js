const express = require("express");
const router = express.Router();
const userController = require("./user.controller.js");

router.get("/login", userController.getAuth);
router.post("/login", userController.postAuth);

module.exports = router;
