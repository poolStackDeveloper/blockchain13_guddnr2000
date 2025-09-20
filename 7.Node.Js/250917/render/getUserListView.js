const getUserListView = (users)  => {
    // const users = [
    //     {userId: "주병현"}
    // ]
    const userList = users.map((user) => `<li>${user.userId}</li>`);
    return `
    <!DOCTYPE html>
    <html lang="ko">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <h1>유저 목록</h1>
        <ul>
            ${userList}
        </ul>
        <a href="/users">글 작성</a>
    </body>
    </html>
    `
}

module.exports = {
    getUserListView
}