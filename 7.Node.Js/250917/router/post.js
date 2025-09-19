const POST = (url, bodyPart, users) => {
    const params = new URLSearchParams(bodyPart);
    const userName = params.get("userName");
    const password = params.get("password");

    switch (url) {
        // POST /users
        case "/users":
            users.push({userId: userName, password});
            return {
                // 나 데이터 생성했으니까, 브라우저야. `/`로 이동해
                status: "302 Found",
                headers: "",//{ Location: "/"},
                body: ""               
            }
            
        default:
            return {
                // 나 데이터 생성했으니까, 브라우저야. `/`로 이동해
                status: "404 Not Found",
                headers: {},
                body: "<h1>404 Not found</h1>"               
            }
    }
}

module.exports = POST