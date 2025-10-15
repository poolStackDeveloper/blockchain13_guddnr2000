//1. 서버에서 사용자 정보를 확인한다.
//2. jwt.sign하여 서명을 생성한다.
//3. 리턴받은 payload값으로 쿠키에 저장하라고 브라우저에게 시킨다.
//4. 토큰을 받은 클라이언트는 쿠키에 저장한다.
const jwt = require("jsonwebtoken");
const users = require("../db.js");

const login = (req, res) => {
    // 막 로직을 작성하지 않고, 테스트만 해볼거임!
    try {
        const {userId, password } = req.body;
        if (!userId, !password){
            console.log("아이디 입력 안했나!");
            return res.status(404).json({success: false, message: "입력값이 비었습니다."});
        }else{
            console.log(`아이디=${userId} / 비번 ${password}`);
        }

        const uid = users.findIndex((value) => value.userId === userId);
        if (uid === -1){
            console.log(`User Not Found!!! uid=${uid}`);
            return res.status(404).json({ success: false, message: "User Not Found"});
        } else{
            console.log(`uid=${uid}`);
        }
        const user = users[uid];
        //토큰의 시간을 다루어보자
        // iat: 발급된 시간
        // exp: 만료될 시간
        // jwt.sign(토큰할값, 시크릿키값, 옵션들)
        const access_token = jwt.sign(user, process.env.SECRET,{
            expiresIn: "30s"
        });

        res.setHeader(
            "Set-Cookie",
            `access_token=${access_token}; Domain=localhost; Path=/;`
        );
        
        console.log(`access_token=${access_token}`);
        res.status(200).json({ success: true, message: "Login route is working!"});    
    } catch (error) {
        res.status(500).json({ success: false, message: "Server is Error!"});    
    }
}

//유저 정보 수정하는 기능을 넣겠음!
// 비밀번호 수정!
const putUsersMe = (req, res) => {
    try {
        const { password } = req.body;
        // 미들웨어 파서로 req.user에 정보 넣어줄거임!
        console.log('test11');
        
        const { userId } = req.user;
        console.log(`userId=${userId}`);
        
        if(!userId ) return res.status(404).json({message: "유저 아이디가 없다!!!"});

        // DB로 가정함. 그리고 조회해서 해당 정보가 있는지 확인함
        const uid = users.findIndex((value) => value.userId === userId);
        if(uid === -1) return res.status(404).json({ message: "User Not Found"});

        // 비밀번호 수정 (DB대신 메모리 배열 ㅅㅈ)
        
        users[uid].password = password;

        res.status(200).json({success: true, password});
    } catch (error) {
        res.status(500).json({success: false, message: "Server is Error.....;"});
    }
    
}

module.exports = {
    login,
    putUsersMe
}