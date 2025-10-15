console.log((65).toString(2));
console.log((65).toString(16));

//이렇게 진수로 변환할 수 있다.
// 문자열 ABC => 하나의 문장에 대해서는 2진수 바이트로 표현하면?

// 1001 1001 1001 1001 1001 1001
// 이렇게 되겠지...
// 아스키 코드나 유니 코드 같은 경우는 A라는 문자 하나에 대한 코드 포인트가 존재하는거지
// ABC라는 문장 하나의 대응하는 코드 포인트가 존재하지 않는다...

const hello ="안녕하세요 교강사 주병현 입니다. 여러분들 독감 조심하세요.";

console.log(Buffer.from(hello));


// 데이터를 운반하기 -> base64와 base64Url
// 네트워크나 URL은 순수 2진 데이터를 실을 수 없다. => 명확히는, 0과 1로 표현해서 무슨 의미가 있나? 너무 무겁고 헤비하다.
// 그래서 0과 1의 바이트를 문자열 기호로 바꾸는 방법이 필요했다.
// => 그게 base64다.
// 64진수인가요? ㄴㄴㄴㄴㄴ
// ABC => 24비트 => 6비트씩 6덩이 => 4문자로 표현하자.
// 예시: 01000100010001000100
// => 010001 010001 010001 000100

// const hello2 = "hello";
// const encoded = Buffer.from(hello2).toString("base64");
// const decoded = Buffer.from(hello2, "base64").toString("base64").toString("utf-8");
// console.log(encoded);
// console.log(decoded);

const hello2 = "hello";

// 1. UTF-8 문자열을 Base64로 인코딩
const encoded = Buffer.from(hello2).toString("base64");
const decoded = Buffer.from(encoded, "base64").toString("utf-8");
// decoded 값: "hello"

console.log(decoded); // 출력: hello

const crypto = require("crypto");
// const { encode } = require("unicode");
console.log(crypto.createHash("sha256").update(hello2).digest("base64"));

const header ={
    alg: 'HS256',
    typ: 'JWT'
};

// [헤더].[페이로드(평문)].[서명]

const payload = {
    userid: 'admin',
    username: 'admin',
    age: 32,
    iat: 1516239022
}

const header64 = encode(header);
const payload64 = encode(payload);
const 평문 = header64 + "." + payload64;

const signature = crypto.createHmac("sha256","wnqudgus1234").update(평문).digest("base64");
console.log(signature);
