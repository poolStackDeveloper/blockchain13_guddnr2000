/*
    npm init -y
    npm install express nunjucks
*/

const express = require("express");
const nunjucks = require("nunjucks");
const app = express();
const PORT = 3000;
const multerUpload = require("./file.middleware.js");

app.set("view engine", "html");
nunjucks.configure("views", {
    express: app
})

app.use(express.static("uploads"))

app.get("/",(req, res)=>{
    res.sendFile(__dirname+ "/views/index.html");
})

app.get("/view", (req, res)=> {
    const { image } = req.query;
    res.render("view.html", {
        image
    })
})

// 인수로 뭘 넣는냐? file 타입의 name을 수집!
app.post("/upload",multerUpload.single("file"), (req, res) => {
    console.log(req.file);
    try {
        const {filename} = req.file;
        res.redirect(`/view?image=${filename}`);
    } catch (error) {
        console.log(error);
        res.status(404).json({message: "이미지 업로드 실패!"});
        
    }
    res.json({
        message: req.file
    })
    
})
app.listen(PORT, () => {
    console.log(`localhost:${PORT} server OPEN`);
    
})
