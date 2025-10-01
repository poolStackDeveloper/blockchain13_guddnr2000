/*
    쿠키를 통해서 진짜 유저가 우리 DB 테이블에 있는지 확인하는 작업
*/

const pool = require("../db.config");

const authMiddleware = async(req, res, next) => {
    const {user_id} = req.cookies;
    //쿠키가 아예 없는 경우
    if(!user_id) return res.status(401).redirect("/login");

    // 유저가 있다면
    // sudo service mysql restart
    // [{}]
    const [result] = await pool.query(`SELECT * FROM users WHERE user_id="${user_id}"`)
    const [userInfo] = result;

    // 유저 정보가 없다면 (쿠키는 있어도, 실제 DB에서는 존재하지 않는 사용자가 있을 수 있으니까!)
    
    if(!userInfo) return res.status(401).redirect("/login");

    
    //전부 다 통과했어?
    next();
}

module.exports = authMiddleware;