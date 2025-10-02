// 1.파일 어디에 저장할거임?
// 2.파일 이름 어떻게 지을거임?

// 그 외의 stream 처리, 파싱, 에러 처리, 저장 완료등은
// Multer가 모두 자동으로 처리해줌

const multer = require("multer");

// 경로 설정 함수
const destination = (req, file, callback) => {
    // if(file.mimetype.startWith("image")){
    if(file.mimetype.startsWith("image")){
        //이미지 타입이여? 그러면 너가 설정한 경로에 꽂아넣어줄게.
        // 이때 callback => 이 함수 내부에서 fs.createWriteStream이 내장되어있음
        callback(null, "uploads/");
    } else {
        callback(new Error("이것은 이미지 파일이 아니여!"));
    }
}

// 파일 이름 설정 함수
const filename = (req, file, callback) => {
    callback(null, file.originalname);
}

//multer.diskStorage({[경로설정콜백함수],[파일이름콜백함수]})
const storage = multer.diskStorage({ destination, filename })
const upload = multer({ storage });

module.exports = upload;