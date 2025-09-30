const cookieParser = (req, res, next) => {
    // 1. req.cookies 객체 초기화 (모든 라우트에서 안전하게 접근 가능하도록)
    req.cookies = {}; 

    // 쿠키 헤더가 없으면 다음으로 진행
    if (!req.headers.cookie) {
        return next();
    }

    // 2. 쿠키 문자열 파싱 및 req.cookies에 할당
    // 세미콜론 분리 -> 공백 제거 -> '=' 분리 -> 객체 누적
    req.cookies = req.headers.cookie.split(";")
    .map((cookie) => {
        // 쿠키 문자열 양 끝 공백 제거
        return cookie.trim();
    })
    .reduce((acc, cookie) => {
        // '=' 기준으로 분리 (값이 '='를 포함할 수 있으므로 첫 번째 '='만 사용)
        const parts = cookie.split("=");
        const key = parts[0].trim();
        // 값은 첫 번째 '=' 이후 나머지 문자열 전체
        const value = parts.slice(1).join('=').trim(); 
        
        if (key) {
            acc[key] = value;
        }
        return acc;
    }, {}); // 반드시 초기값으로 빈 객체({})를 제공

    // 3. 다음 미들웨어 또는 라우트로 이동
    next();
}

module.exports = cookieParser;