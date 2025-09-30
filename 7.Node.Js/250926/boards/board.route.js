// 라우팅 설정

const express = require("express");
const router = express.Router();
const boardController = require("./board.controller.js");

// GET /list
router.get("/list", boardController.getBoardList);
// GET /view/:user_id
router.get("/view/:id", boardController.getBoardView);
// GET /wirte
router.get("/write", boardController.getBoardWrite);
// POST /wirte
router.post("/write", boardController.postBoardWrite);

module.exports = router;