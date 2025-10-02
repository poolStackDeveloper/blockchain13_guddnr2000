const fs = require("fs");

// example.txt
// fs.readFile([경로], [인코딩타입], [콜백함수])
fs.readFile(__dirname+ "/uploads/example.txt","utf-8", (err, data)=>{
    if(err){
        console.log("에러");     
    }else{
        console.log(`파일내용: ${data}`);
    }
});


// fs.createWriteStream([경로])
const writeStream = fs.createWriteStream(__dirname + "/uploads/example.txt");
writeStream.write("두 번째는 파일을 직접 건드리지 않고");
writeStream.write("코드 작성 후 파일을 실행시키는 것만으로 내용 추가");
writeStream.end();

writeStream.on("finish", ()=>{
    console.log("파일 쓰기 완료");
    
})
