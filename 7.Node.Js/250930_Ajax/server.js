// npm init -y
// npm install express

const express = require("express");
const cookieParser = require("cookie-parser");
// const authMiddleware = require("./middlewares/auth.middleware.js");
const userRouter = require("./users/user.route.js");
const boardRouter = require("./boards/board.route.js");
const nunjucks = require("nunjucks");
const app = express();
// const cookieParser = require("./cookie.middleware.js");

// - 전역 미들웨어
// body-parser : x-www-form-urlencoded 허용
// cookie-parser 
app.use(express.urlencoded({extended: false}));
// 클라이언트로부터 JSON본문이 왔을 때, req.body로 제대로 파싱되도록
//app.use(express.json);
app.use(express.json());
// 내부적으로 req.body = {userId, password}
app.use(cookieParser());
app.set("view engine", "html");
nunjucks.configure("views", {
    express: app
});

app.get("/", (req, res) => {
    console.log("/");
    res.sendFile(__dirname + "/views/index.html");
});

app.use(userRouter);
app.use(boardRouter);
app.listen(3000, ()=> {
    
    try {
        console.log(`localhost:${3000} Open`);     
    } catch (error) {
        console.log(error);
    }
})