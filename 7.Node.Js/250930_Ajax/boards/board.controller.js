const path = require("path");

const getBoardList = (req,res) => {
    res.sendFile(path.join(__dirname, "../views/boards/list.html"));
}

module.exports = {
    getBoardList
}