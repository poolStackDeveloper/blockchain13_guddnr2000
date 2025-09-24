// GET /boards/write 이 요청이 들어오면 특정 함수를 실행시켜라
// POST /boards/write 이 요청이 들어오면 특정 함수를 실행시켜라

const express = require("express");

// 외부에서 만든 => board.controller.js의 함수들을 불러와요
const boardController = require("../controllers/board.controller.js");

// 라우터 객체
// URL별로 어떤 함수를 연결할지 정의합니다.
const router = express.Router();

// routes/board.route.js 파일에 추가
router.get("/", (req, res) => {
  res.render("boards/list.html", { boards });
});

// /boards/write
router.get("/write", boardController.getWrite);
router.post("/write", boardController.postWrite);

// /boards/view
router.get("/view/:id",boardController.getView);

// /board/update
router.get("/update/:id",boardController.getUpdate);
router.post("/update",boardController.postUpdate);

// delete
// router.get("/delete/:id",boardController.getDelete);
router.delete("/delete/:id",boardController.delDelete);

module.exports = router;

