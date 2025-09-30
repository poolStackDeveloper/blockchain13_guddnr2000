const pool = require("../db.config.js");
// 쿼리문 작성해서 DB랑 통신할 곳

const findAll = async() => {
    const [result] = await pool.query("SELECT * FROM boards;");
    return result
}
// SELECT * FROM boards WHERE user_id="wnqudgus1234";
const findOne = async(id) => {
    const [result] = await pool.query(`SELECT * FROM boards WHERE id="${id}";`);
    return result
}
const create = async({ user_id, writer, title, content }) => {
    // const create = async(body) => {
    // const { user_id, writer, title, content  } = body
    // {}, []
    const [result] = await pool.query(
            `
                INSERT INTO boards(user_id, writer, title, content) 
                values("${user_id}", "${writer}", "${title}", "${content}");
            `
        )
    return result
}
module.exports = {
    findAll,
    findOne,
    create
}