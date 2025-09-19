const express = require("express");
// const nunjucks = require("nunjucks");
const app = express();
const path = __dirname;

app.get("/", (req,res)=> {
    console.log("여기 타나?");
    
})

app.listen(3000,() =>{
    console.log("서버가 실행되었습니다.");
    
})