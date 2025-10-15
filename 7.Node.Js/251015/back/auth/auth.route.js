const express = require("express");
const router = express.Router();
const authController = require("./auth.controller.js");
const authMiddleware = require("../middleware/auth.middleware.js")

// 로그인을 한다 => 행동은 POST입니다.
// REST API => RESTful API(REST API 규칙을 얼마나잘 지키려고 하느냐)

router.post("/login", authController.login);
//PUT / users/me
/*
    1. 사용자가 본인의 유저 정보를 수정하려고 한다...
    2. putUserMe를 호출하기 저느 미들웨어가 실행된다 (authMe)
    3. 미들웨어에서 토큰이 있는지, 변조가 되었는지 서명값을 다시 만들어서 확인한다.
    4. 이상이 없다면, 해당 유저 값을 req.user에 할당한다.
    5. next();
*/
router.put("/users/me",authMiddleware.authMe ,authController.putUsersMe);

module.exports = router;
