const boardRepository = require("./board.repository.js");
const path = require("path");

const getBoardList = async(req, res) => {
    const boards = await boardRepository.findAll();
    res.render("boards/list.html", { boards });
}

const getBoardView = async(req, res) => {
    try {
        // [[{}], [""]]
        /*
            [
                {

                }
            ]
        */
        const [board] = await boardRepository.findOne(req.params.id);
        res.render("boards/view.html", { board });
    } catch (error) {
        res.status(404).send("해당 글이 존재하지 않습니다");
    }
}

const getBoardWrite = (req, res) => {
    res.sendFile(path.join(__dirname, "../views/boards/write.html"));
}

const postBoardWrite = async(req, res) => {
    try {
        // const { user_id, writer, title, content  } = req.body
        // const result = await boardRepository.create(req.body);
        /*
        ResultSetHeader {
            fieldCount: 0, 반환된 필드 개수
            affectedRows: 1, 영향을 받은 행 수
            insertId: 5, 삽입된 행의 ID (AUTO_INCREMENT 된 값 => 더 명확히는 Primary Key)
            info: '',
            serverStatus: 2, // 기타 DB 처리 상태
            warningStatus: 0,
            changedRows: 0
        }
        */
        // INSERT, UPDATE, DELETE는 요약 메타 정보들만 반환
        // [{}, []]
        const { insertId } = await boardRepository.create(req.body);
        res.redirect(`/boards/view/${insertId}`);
    } catch (error) {
        res.status(404).send("글 작성 오류")
    }
}


module.exports = {
    getBoardList,
    getBoardView,
    getBoardWrite,
    postBoardWrite
}