const net = require("net");
const GET = require("./router/get.js");
const POST = require("./router/post.js");

// DB도 하나 가정해서 둡시다
const users = [
    {userId: "주병현"},
    {userId: "김성영"},
    {userId: "최형욱"},
    {userId: "송명준"},
    {userId: "유준상"}
];

const server = net.createServer((client) => {
    
    client.on("data", (socket) => {
        console.log("TCP 연결 시작(3-way-handshake)");
        const raw = socket.toString();
        
        const [headerPart, bodyPart] = raw.split("\r\n\r\n");
        const [requestLine] = headerPart.split("\r\n");
        const [method, url] = requestLine.split(" ");
        // console.log(raw);
        
        let { status, headers, body } = 
            method === "GET" ? GET(url, users) : POST(url, bodyPart, users) ;

        headers = {
            "Content-Type": "text/html; charset=UTF-8",
            "Content-Length": Buffer.byteLength(body),
            ...headers,
            };
        
        // 서버에서 응답해주는 첫 번째 줄 => response startline
        // HTTP/1.1 200 OK
        // [HTTP상태 버전] [상태 코드] [상태 메세지]
        let response = `HTTP/1.1 ${status}\r\n`;

        for (const key in headers) {
            // Location: "/"
            response += `${key}: ${headers[key]}\r\n`;
        }
    
        response += `\r\n`;
        response += body;

        // for (const key in headers){
        //     // Location: "/"
        //     response += `${key}: ${headers[key]}\r\n`;
        // }

        //header + body
        client.write(response);
        client.end();
    })

    client.on("end", () => {
        console.log("TCP 연결 종료(4-way-handshake)");
    })
})

server.listen(8080, () => {
    console.log("서버가 열렸어유");
})