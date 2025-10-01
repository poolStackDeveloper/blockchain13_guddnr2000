const { Sequelize } = require("sequelize");
const config = require("../db.config.js");
// 개발 환경 설정 값들을 가져옴
const db = config.db["development"];

// new Sequelize("데이터베이스이름","데이터베이스 유저정보...");
const sequelize = new Sequelize(db.database, db.username, db.password, {
    host: db.host,
    dialect: db.dialect
});

// 필요한 부분들이 어디냐?
// 1. 각 모델 파일들
// 2. server.js
module.exports = sequelize;