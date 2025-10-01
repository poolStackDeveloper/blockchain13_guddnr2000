// 연결 "풀" 설정

const mysql = require("mysql2");

const pool = mysql.createPool({
    // 나 자신 내부 로컬에서
    host: "127.0.0.1",
    // 3306 포트에 자리잡아있는 => 3306은 MySQL
    port: "3306",
    user: "guddnr2000",
    password: "init1234",
    database: "block13",
    connectionLimit: 5,
}).promise();

// connectionLimit: 동시에 미리 만들 수 있는 연결 단위 수 제한
// .promise(): 비동기를 동기처럼 제어할 수 있도록 async/await 방식으로 다루기 위함
// => 비동기를 동기 제어 제공 함수

module.exports = pool