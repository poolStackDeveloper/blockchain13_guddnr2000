//1. 필수설정 초기화
const express = require("express");
const nunjucks = require("nunjucks");
const app = express();
const pathApp = `${__dirname}/views`;
const pathPublic = `${__dirname}/public`;

//2. DB / Router 설정
const board = require("./data/board.data.js"); //배열 객체를 DB라고 가정
const router = require("./routes/board.routes.js"); // server.js -> route.js -> controller.js

//3. form Data 처리방식 사용
app.use(express.urlencoded({extended : false}));
app.use(express.json());

//4. Nunjucks
app.set("view engine", "html");
nunjucks.configure("views", {
    express : app
})

