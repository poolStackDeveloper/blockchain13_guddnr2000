const express = require("express");
const nunjucks = require("nunjucks");
const app = express();
const path =`${__dirname}/views/boards`;
//아래 두개 추가
const boards = require("./data/board.data.js");
const boardRouter = require("./routes/board.route.js")

// 브라우저가 보내는 x-www-form-unlencoded 형식의 데이터를
// Javascript 객체로 파싱해서 req.body에 담아줘! => 그걸 허용하겠다.
app.use(express.urlencoded({ extended: false}));

app.set("view engine", "html");

nunjucks.configure("views",{
    express: app
})

app.get("/", (req, res)=> {
    console.log(req.url);
    res.sendFile(`${path}/index.html`)

})

// app.get("/boards", ({res})=> {
app.get("/boards", (req, res)=> {
    res.render("boards/list.html",
        {boards})
})

// app.use([공통엔드포인트],[라우트객체])
app.use("/boards", boardRouter);

app.listen(3000, () => {
    console.log("서버가 실행되었습니다.");
})