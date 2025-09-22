const express = require("express");
const nunjucks = require("nunjucks");
const app = express();
const path =`${__dirname}/views`;

//아래 두개 추가
const boards = require("./data/board.data.js");
const boardRouter = require("./routes/board.route.js")

// 브라우저가 보내는 x-www-form-unlencoded 형식의 데이터를
// Javascript 객체로 파싱해서 req.body에 담아줘! => 그걸 허용하겠다.
app.use(express.urlencoded({ extended: false}));
app.use(express.json()); //글쓰기에서 form.submit 대신 json을 넘기기 위해 사용.

app.set("view engine", "html");

nunjucks.configure("views",{
    express: app
})

app.get("/", (req, res)=> {
    res.sendFile(`${path}/boards/index.html`)
})

// app.get("/boards", ({res})=> {
app.get("/boards", (req, res)=> {
    res.render("boards/list.html",
        // "boards/list.html"   : O
        // "/boards/list.html"  : X (경로 앞에 `/` 붙이면 오류발생!!!)
        // 이유가 무엇인가???
        {boards})
})

// app.use([공통엔드포인트],[라우트객체])
app.use("/boards", boardRouter);

app.listen(3000, () => {
    console.log("서버가 실행되었습니다.");
})

// CSS파일 사용을 위해 - 정적 파일 루트로 설정
app.use(express.static(path));
