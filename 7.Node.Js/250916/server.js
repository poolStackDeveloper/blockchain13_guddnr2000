const net = require("net");
const { buffer } = require("stream/consumers");

const serverSideRendering = (url) => {
    switch (url) {
        case "/":
            return `<h1>Main page</h1>`;    
        default:
            return `<h1>404 Not found</h1>`;
    }
}
const server = net.createServer((client)=> {
    //여기서 3핸드쉐이크
    //4핸드 쉐이크는 언제?

    // client on([이벤트], [콜백함수])
    client.on("data", (request)=> {
        const [method, url] = request.toString().split(" ");
        
        const body = serverSideRendering(url);
        console.log(body);
        
        // 어떤 통신인지 => HTTP/1.1
        // 지금 만드는 상태 코드는? => 정상일때니까 200 그리고 OK
        // 보내줄 컨텐츠의 타입은? => text/html; 인코딩 => 캐릭터 셋
        // 해당 컨텐츠의 길이는? => Content-Length
        const header =
        `HTTP/1.1 200 OK \n`+
        `Content-Type: text/html; charset=UTF-8 \n`+
        `Content-Length: ${Buffer.byteLength(body)} \n\n`;

        const response = header + body;
        client.write(response);
        client.end();
    })
})

//콜백함수 : 함수안에 매개변수를 던져서..
// const server = net.createServer(() => {

// });

server.listen(8080, () => {
    console.log("서버가 열렸음!");    
})

// 요청을 보내는 주체를 선택한다 => 브라우저
// 브라우저에서 `/`로 요청을 보냈다.
// 브라우저는 HTML을 기대하고 있다.
// 서버는 응답할 책임이 있다. 어떻게 작성하지?

