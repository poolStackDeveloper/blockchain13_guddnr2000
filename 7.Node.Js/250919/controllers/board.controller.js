// 요청이 들어오면, 그에 맞는 동작을 수행하고
// 결과를 만들어서 응답하는 공간

const { log } = require("console");
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
    // console.log("왜 req.body가 안넘어오냐???");
        // server.js 에서 app.use(express.json()); 추가하여 해결함
    
    const {user_id, title, content } = req.body;
    boards.push({
        user_id,
        title,
        content,
        id: boards.length + 1,
        writer: "최형욱",
        hit: 0,
        created_at: "2025-09-19",
        updated_at: "2025-09-19"
    })
    res.redirect("/boards");
}

// params: URL 경로 안에 포함된 값을 받기 위한 방법 => 고유한 자원
// query: 얘도 마찬가지이긴 하나....
const getView = (req, res) => {
    const { id } = req.params;
    
    const board = boards.find((board) => board.id == id); // ===로는 안되네....
    // console.log(board);
    
    res.render("boards/view.html", {
        board
    });
    // console.log(user_id);
}

const getUpdate = (req, res) => {

    const { id } = req.params;
    console.log(id);
    
    const board = boards.find((board) => board.id == id);

    res.render("boards/update.html", {
        board
    });
}

// 글을 수정할 수 있는 함수
const postUpdate = (req, res) => {
    console.log("여기 타나???");
    const { id, title, content } = req.body;
    console.log(req.body);

    console.log(`${id}, ${title}, ${content}`);
    const postIndex = boards.findIndex(board => board.id == id);
    
    if (postIndex !== -1) {
        // console.log("여기타나?");
        boards[postIndex].title = title;
        boards[postIndex].content = content;

        const now = new Date();
        const kstString = now.toLocaleString('ko-KR', { 
            timeZone: 'Asia/Seoul', 
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        }).replace(/\s/g, '').replace(/\./g, '-').slice(0, -1); // YYYY-MM-DD
        boards[postIndex].updated_at = kstString;
    } else {
        // alert("test111");
        return res.status(404).send('게시글을 찾을 수 없습니다.');
    }

    res.redirect("/boards");
}

const getDelete = (req, res) => {
    console.log(req.params);
    const { id } = req.params;
    
    const postIndex = boards.findIndex(board => board.id == id);

    if (postIndex !== -1) {
        //console.log("여기서 삭제 해야 함");
        console.log(`boards.length=${boards.length}`);
        boards.splice(postIndex,1); //슬라이스가 아니라 스플라이스 였네....
        console.log(`boards.length=${boards.length}`);
    } else {
        
        return res.status(404).send('게시글을 찾을 수 없습니다.');
    }

    res.redirect("/boards");
}

const delDelete = (req, res) => {
    console.log(req.params);
    const { id } = req.params;
    
    const postIndex = boards.findIndex(board => board.id == id);

    if (postIndex !== -1) {
        //console.log("여기서 삭제 해야 함");
        console.log(`boards.length=${boards.length}`);
        boards.splice(postIndex,1); //슬라이스가 아니라 스플라이스 였네....
        console.log(`boards.length=${boards.length}`);
        return res.json({ success: true, message: "삭제 성공"}); //리턴 메세지를 써야 삭제 성공을 화면에 뿌릴 수 있다!!!!
    } else {
        
        return res.status(404).send('게시글을 찾을 수 없습니다.');
    }

    res.redirect("/boards");
}

module.exports = {
    getView,
    getWrite,
    postWrite,
    getUpdate,
    postUpdate,
    getDelete, //삭제 예정
    delDelete
}