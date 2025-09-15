const net = require("net");

// net.connect([{대기하고있는서버포트번호}], [콜백함수])
const client = net.connect({port:8080}, () => {
    console.log("서버에 연결되었습니다.");    
    client.write("client: 서버 잘 열렸어유");
})

