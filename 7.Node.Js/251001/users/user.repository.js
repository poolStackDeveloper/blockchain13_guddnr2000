const pool = require("../db.config.js");

const findOne = async(user_id) => {
    const [result] = await pool.query(`SELECT * FROM users WHERE user_id="${user_id}"`);

    return result;
}

module.exports = {
    findOne
}