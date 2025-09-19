const express = require("express");
const nunjucks = require("nunjucks");
const app = express();
const path =`${__dirname}/views/boards`;

// body-parser 기능 활성화
// HTML form 데이터 처리용
// 요청을 보내는 주체 => 지금은 브라우저
// 브라우저가 form태그로 작성하여 보낸 입력값들을 표현하는
// Content-Type은 x-www-unlencoded라는 타입임
// 이걸 보고나서 서버는 "아 얘는 폼 제출로 입력값들을 보낸 애들이구나"
// 그래서, 아래의 코드는 그걸 본문(body)에 담아서 보내는걸 활성화 하겠다.
app.use(express.urlencoded({ extended: false}));

// 템플릿 엔진이 뭐냐?

// HTML 코드 속에 변수, 조건문, 반복문 등을 삽입할 수 있게 해주는 도구.
// 이미 nunjucks 설치함! 근데 설정이 필요함.

// 1.view engine을 HTML로 설정
app.set("view engine", "html");

// 2. nunjucks 설정 => 어떤 앱에 연결할건지?
//nunjucks.configure([기준이되는폴더],[{[활용할모듈]:[객체]}])
nunjucks.configure("views",{
    express: app
})

//DB라 가정!
const boards = [
    {
        id: 1,
        user_id: "guddnr2000",
        writer: "최형욱",
        title: "250918 Express 첫걸음",
        content: "오늘은 과제가 있습니다",
        hit: 0
    }
]

// 요청을 보내는 주체가 `/`로 GET 요청했을 때
app.get("/", (req, res)=> {
    // 그랬을 때, 이 코드를 실행한다.
    // ...250918/views/boards/index.html 파일 파싱하고 만들어서 보내줄거임!
    
    // req.method, req.url, req.query, req.params, req.body......
    console.log(req.url);

    res.sendFile(`${path}/index.html`)
    //그리고 응답을 보낸다.
})

app.get("/boards", (req, res)=> {
    //res.sendFile(`${path}/list.html`)
    res.render("boards/list.html",{
        boards
    }) //템플릿 엔진을 사용해서 동적으로 보내준다.
})

app.get("/boards/write", (req, res)=> {
    res.sendFile(`${path}/write.html`)
})

app.post("/boards/write", (req,res) => {
    // 빈 값으로 나올거임
    //{ user_id: 'a', title: 'b', content: 'c' }
    console.log(req.body);
    boards.push({
        ...req.body,
        id: boards.length+1,
        writer:"최형욱",
        hit: 0
    })
    res.redirect("/boards");
})

app.listen(3000, () => {
    console.log("서버가 실행되었습니다.");
})