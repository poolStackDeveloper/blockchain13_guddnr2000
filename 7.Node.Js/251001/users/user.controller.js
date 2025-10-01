const path = require("path");
const userRepository = require("./user.repository.js");
const User = require("../models/user.model.js");

const getAuth = (req, res) => {
    res.sendFile(path.join(__dirname,"../views/auth.html"));
}

const postAuth = async(req, res) => {
    console.log(req.body);
    
    try {
        const {user_id} = req.body;
        // const [userInfo] = await userRepository.findOne(user_id);
        const [userInfo] = await User.findOne(user_id);
        if(!userInfo) throw new Error("E"); //res.status(401).redirect("/login");
        res.setHeader(
            "Set-Cookie",
            `user_id=${userInfo.user_id}; Domain=localhost; path=/;`
        );
        // res.redirect("/boards");
        res.status(200).json({
            success: true,
            message: "로그인 성공"
            // user: {id: userInfo.user_id, name: userInfo.user}
        });
    } catch (error) {
        // console.log(error);
        //401 Unauthorized => 너 인증이 필요한 곳이 있는데, 인증이 안되었다.
        console.log(error.toString());
        // return res.status(401).redirect("/login");
        return res.status(401).json({
            success: false,
            message: "로그인 실패... 아이디 또는 비번이 올바르지 않음"
        })
    }
}

module.exports = {
    getAuth
    , postAuth
}