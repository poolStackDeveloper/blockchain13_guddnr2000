// 1. Node.js 'crypto' 모듈을 사용하기 위해 require()를 추가합니다.
const crypto = require('crypto');

class JWT {
    constructor({ crypto}, salt){
        this.crypto = crypto;
        this.salt = salt;
    }
    

    sign(data) {
        // 헤더.페이로드.시그니처
        const header64Url = this.encode({ alg: "HS256", typ: "JWT"});
        const payload64Url = this.encode({...data});
        
        // 3. 'this.signature' 대신 지역 변수를 사용하고,
        // createSignature의 결과를 이 변수에 저장합니다.
        const signature64Url = this.createSignature([header64Url, payload64Url]);
        
        // 4. 리턴 시 잘못된 변수명 'signature64Url'을 수정하여 사용합니다.
        return [header64Url, payload64Url, signature64Url].join(".");
    }

    verify(access_token) {
        const [header, payload, signature] = access_token.split(".");
        const newSignature64Url = this.createSignature([header,payload]);
        if(newSignature64Url !== signature){
            throw new Error("토큰이 이상해요. 누가 변조함!");
        }

        return this.decode(payload);
    }

    encode(obj) {
        const stringify = JSON.stringify(obj);
        return Buffer.from(stringify).toString("base64url");
    }

    decode(base64Url) {
        // 1. eyJ1c2VySWQiOiJ3bnF1ZGd1czEyMzQiLCJ1c2VyTmFtZSI6Ikp1Iiwicm9sZSI6ImFkbWluIn0
        // 2. 다시 역순으로 문자열 JSON으로 변환
        // 3. 문자열 없애고 JSON을 Javascript 객체로 변환 그리고 return
        return JSON.parse(Buffer.from(base64Url, "base64url").toString("utf-8"));
    }

    // base64Urls => 배열
    // [ey!@#!@#!@#!@#.ey!@#!@#@#@#@!@#]
    createSignature(base64Urls) {
        const data = base64Urls.join(".");
        return this.crypto.createHmac("sha256", this.salt).update(data).digest("base64url");
    }

}

const user = {
    userId: "wnqudgus1234",
    userName: "Ju",
    role: "admin"
}

const jwt = new JWT({crypto}, "wnqudgus1234");

const access_token = jwt.sign(user);
console.log(access_token);

// 사용자 브라우저에 저장되어있는 쿠키를 메서드에 보냄
jwt.verify(access_token);
const payload = jwt.verify(access_token);
console.log(payload);
