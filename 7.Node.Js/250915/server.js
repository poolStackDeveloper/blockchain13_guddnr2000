const net = require('net');
const fs = require('fs');
// net.createServer([콜백함수])
// net.createServer(([클라이언트매개체변수]) => {})

const server = net.createServer((client)=> {
    // 여기서 client는 접속한 상대방 즉 요청을 보낸 주체를 나타내는 객체
    // client.write("Hello Client");
    // client.on([이벤트], [콜백함수])

    //여기가 DB라고 가정하고...
    const users = [
        {
         userName: "sungyoung"
        }
    ]

    client.on("data", (request) => {
        //GET / HTTP/1.1
        // ["GET","/users","HTTP/1.1"]
        // const url = request.toString().split(" ")[1];
        const [method, url] = request.toString().split(" "); //구조 분해 할당
        const serverSideRendering = (url) => {
            switch (url) {
                case "/":
                    return `<h1>메인 페이지이지라</h1>`;
                case "/users":
                    // return users[0].userName;
                    return fs.readFileSync("./users.html","utf-8");
                default:
                    // break;
                    return `<h1>404 Not Found</h1>`
            }
        }

        try {

            // client.write("뭔가 요청이 들어옴!");
            // 끝맺음이 아예 없음.
            // const body = `<h1>Hello! from raw TCP Server!</h1>`;
            const body = serverSideRendering(url);
            const header = 
            `HTTP/1.1 200 OK\r\n` +
            `Content-Type: text/html; charset=UTF-8\r\n` +
            // `Content-Length: ${Buffer.byteLength(body)}\r\n` +
            `\r\n` ;
  
            const response = header + body;

            client.write(response);
            client.end();
        } catch (error) {
            console.error();
        } 
    })
    
})

//server.listen([포트번호],[콜백함수])
server.listen(8080, () => {
    console.log("서버가 열렸어유");
})
