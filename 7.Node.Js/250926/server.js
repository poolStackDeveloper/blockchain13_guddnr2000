const express = require("express");
const app = express();
// 템플릿 엔진 및 body-parser 설정 해보자
const nunjucks = require("nunjucks");
const path = require("path");
const boardRouter = require("./boards/board.route.js");

app.use(express.urlencoded({ extended: false}));

app.set("view engine", "html");
nunjucks.configure("views", { express: app});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./views/boards/index.html"));
})

app.use("/boards", boardRouter);

app.listen(3000, () => {
    console.log("서버가 열렸습니다.");
})

/*
    // list 만들기전에 좀 봐야할 것이 있다.
    // 즉시 실행 함수
    (async() => {
        // const result = await pool.query("SELECT * FROM boards;")[0];
        // const field = await pool.query("SELECT * FROM boards;")[1];
        const [result] = await pool.query("SELECT * FROM boards;");
        console.log(result);
    })();

*/