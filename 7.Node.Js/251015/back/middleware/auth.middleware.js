const jwt = require("jsonwebtoken");
const authMe = (req, res, next) => {
    
    try {
        // 클라이언트가 헤더의 Auth로 보낸 값을 확인
        const authHeader = req.headers["authorization"];
        if(!authHeader) return res.status(401).json({ message: "권한 없음"});
        //일단, next때리기 전에 값이 들어오는지 확인해보자.
        // res.json({ authHeader});

        const [schme, access_token] = authHeader.split(" ");
        if (!access_token) return res.status(401).json({ message: "Unauthorized" });
        const payload = jwt.verify(access_token, process.env.SECRET);
        //veryfy 하고 서명을 다시 만들어서 검증되었으면? req.user로 값을 꽂는다.
        req.user = payload;
        next();
    } catch (error) {
        res.status(401).json({message: "Invalid or expired token"})
    }
}

module.exports = {
    authMe
}