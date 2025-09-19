// 요청이 들어오면, 그에 맞는 동작을 수행하고
// 결과를 만들어서 응답하는 공간

const boards = require("../data/board.data.js")
const path = require("path");

// 게시판 목록을 보여주는 함수
// const getList = (req, res) => {
//     res.sendFile(path.join(__dirname,"../views/boards/list.html"))
// }

// 글쓰기 함수
const getWrite = (req, res) => {
    //만들어서 보내준다고 판단하므로 로직이다 (routes : X)
    res.sendFile(path.join(__dirname,"../views/boards/write.html"));
}

// 글을 쓸 수 있는 함수
const postWrite = (req, res) => {
    const {user_id, title, content } = req.body;
    boards.push({
        user_id,
        title,
        content,
        id: boards.kength + 1,
        writeer: "주병현",
        hit: 0,
        created_at: "2025-09-19",
        updated_at: "2025-09-19"
    })
    res.redirect("/");
}

// params: URL 경로 안에 포함된 값을 받기 위한 방법 => 고유한 자원
// query: 얘도 마찬가지이긴 하나....
const getView = (req, res) => {
    const { user_id } = req.params;
    const board = boards.find((board) => board.user_id === user_id);
    console.log(board);
    
    res.render("boards/view.html", {
        board
    });
    console.log(user_id);
}

module.exports = {
    getView,
    getWrite,
    postWrite
}