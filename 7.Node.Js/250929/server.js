// npm init -y
// npm install express

const express = require("express");
const app = express();
const cookieParser = require("./cookie.middleware.js");

// x-www-form-urlencoded 허용
app.use(express.urlencoded({extended: false}));
app.use(cookieParser);

// 로그인 페이지
app.get("/", (req, res) => {
    console.log("/");
    res.sendFile(__dirname + "/views/auth.html");
});

// 로그인 요청 처리
app.post("/login", (req,res)=> {
    console.log("/login");
    console.log(`req.body.userId=${req.body.userId}`);
    
    // 로직이 없지만, DB 뒤져봐서 유저가 있다고 칩시다.
    if(!(req.body.userId === "guddnr2000")) {
        console.log(`True req.body.userId=${req.body.userId}`);
        res.status(404).json({state: "false", message: "해당 유저가 없습니다."});
    }else{
        console.log(`False req.body.userId=${req.body.userId}`);
    }

    //유저가 존재했을 때!
    res.setHeader("Set-Cookie",`userId=${req.body.userId}; Domain=localhost; Path=/; Max-Age=60;`);
    res.redirect("/boards");
})

// 미들웨어 가칭 => cookieParser
// 게시판 페이지(권한이 필요 하다고 가정)
// app.get("/boards", (req,res) => {
//     // console.log("/boards");
//     // req.cookies는 json임! 그러면... 얘를 객체형태로 만들어야 함!
//     // const userId = req.headers.cookie.split("=")[1];  
//     // if(!(req.cookies.userId === "guddnr2000")) res.status(404).json({state: "false", message: "해당 유저가 없습니다."});
//     // res.sendFile(__dirname + "/views/boards/list.html");
    

//     // 💡 req.cookies.userId는 이제 cookieParser 미들웨어 덕분에 정확한 값만 가집니다.
//     // 기존 코드에서 req.headers.cookie를 직접 파싱하는 코드는 제거했습니다.
    
//     console.log(`req.cookies.userId=${req.cookies.userId}`);    
//     // 쿠키의 userId 값으로 인증 확인
//     if(!(req.cookies.userId === "guddnr2000")) {
//         return res.status(404).json({state: "false", message: "해당 유저가 없습니다."});
//     }
    
//     res.sendFile(__dirname + "/views/boards/list.html");
    
// })

app.get("/boards", (req,res) => {
    // 💡 req.cookies.userId는 이제 cookieParser 미들웨어 덕분에 정확한 값만 가집니다.
    // 기존 코드에서 req.headers.cookie를 직접 파싱하는 코드는 제거했습니다.
    
    console.log(`req.cookies.userId=${req.cookies.userId}`);    
    // 쿠키의 userId 값으로 인증 확인
    if(!(req.cookies.userId === "guddnr2000")) {
        return res.status(404).json({state: "false", message: "해당 유저가 없습니다."});
    }
    
    res.sendFile(__dirname + "/views/boards/list.html"); // 가정된 경로
    
})

app.listen(3000, ()=> {
    
    try {
        console.log(`localhost:${3000} Open`);     
    } catch (error) {
        console.log(error);
        
    }
})