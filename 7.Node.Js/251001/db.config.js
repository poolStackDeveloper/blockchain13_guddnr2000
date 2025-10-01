const config = {
    // 우리 서버 포트는
    port: 3000,
    db:{
        // 개발용 설정
        development: {
            host: "127.0.0.1",
            port: "3306",
            database: "block13",
            username: "guddnr2000",
            password: "init1234",
            dialect: "mysql"
        },
        //배포했을 때 설정
        production:{}
    }
}

module.exports = config;