const express = require("express");
const cookieParser = require("cookie-parser");
const nunjucks = require("nunjucks");
const app = express();

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cookieParser());

app.set("view engine", "html");
nunjucks.configure("views", {
    express: app
})

app.get("/", (req,res) => {
    res.sendFile(__dirname + "/views/index.html");
})

app.listen("3000", () => {
    console.log("server open.");
    
})