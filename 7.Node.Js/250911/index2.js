/**
    * Node.js에서 가장 기본 단위는 파일 하나에요.
    * 그리고 그 파일 하나를 우리는 모듈이라고 부릅니다.
    * 
    * node index.js
    * 
    * 위 처럼 index.js 하나를 실행시키면
    * 이건 곧 하나의 모듈이 독립된 프로그램처럼 작동하는 것.
    * 
    * 하나의 파일은 하나의 역할을 가져야 하며 
    * 다른 파일과 연결될 땐 명확하게 require()로 가져와야 한다
    * => 모듈화
    *
    * 프로그램: 단일 실행 파일
    * 프로세스: 실행 중인 프로그램
    * 스레드: 프로세스 내의 실행 단위
    * 
    * 기본적으로 자바스크립트는 싱글 스레드
    * Node.js는 싱글 스레드 + 이벤트 루프 + 논블로킹 I/O
    * 
    * **"Node.js는 싱글 스레드 기반의 이벤트 루프 모델을 사용하여 높은 확장성을 제공하는 논블로킹 I/O를 지원하는 자바스크립트 런타임입니다.
    * 싱글 스레드 기반이기 때문에 메모리 소비가 적고, 이벤트 루프와 논블로킹 I/O를 통해 많은 동시 연결을 효율적으로 처리할 수 있습니다.
    *  또한, 자바스크립트의 비동기 특성을 활용하여 시간이 많이 걸리는 작업을 블로킹하지 않고 처리할 수 있습니다.
    *  이러한 특성 덕분에 Node.js는 실시간 애플리케이션, 채팅 애플리케이션, 스트리밍 서비스 등 높은 동시성을 요구하는 애플리케이션에 적합합니다.
 */



// const { setTimeout } = require('timers/promises');
// const add = require('./add.js');
// const minus = require('./minus.js');
// const fs = require('fs'); //File System
// const dataSync = fs.readFileSync('./sample.txt', 'utf-8');
// const data = fs.readFile('./sample.txt', 'utf-8', (err, data) => {
//     if(err) {
//         throw err;
//     }else{
//         console.log(data+" : 비동기적 처리");
//     }
        
// });

// console.log(add(1,2));
// console.log(minus(2,1));

// console.log(dataSync+" : 동기적 처리");

setTimeout(() => {console.log(1)} , 5000);
setTimeout(() => {console.log(2)} , 1000);
// setTimeout(console.log("2"), 2000);
// Node.js의 내부 구조
// fs => file System의 약자
// => Node.js에서 파일을 읽고 쓰고 수정하고 삭제할 수 있게 해주는 모듈


