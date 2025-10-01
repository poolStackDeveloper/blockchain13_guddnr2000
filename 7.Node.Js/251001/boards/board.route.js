const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware.js");
const boardController = require("./board.controller.js");

router.get('/boards', authMiddleware, boardController.getBoardList);

module.exports = router;