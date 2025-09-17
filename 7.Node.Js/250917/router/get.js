// HTTP 메서드 GET: 데이터 리소스 조회
// HTTP 메서드 POST: 데이터 리소스 생성
// app.get();
// app.post();
const { getUserListView } = require("../render/getUserListView.js");
const fs = require("fs");
const path = require("path");

const GET = (url, users) => {
    switch (url) {
        case "/":
            return{
                status: "200 OK",
                headers: {},
                body: getUserListView(users)
            }
        case "/users":
            return{
                status: "200 OK",
                headers: {},
                body: fs.readFileSync(path.join(__dirname, "../index.html"),"utf8")
                //readFileSync 는 상대경로는 인식하지 못하므로 절대경로 사용을 위해 path.join을 사용한다.
            }
        default:
            return{
                status: "404 Not Found",
                headers: {},
                body: `<h1>404 Not Found</h1>`
            }
    }
}

module.exports = GET;