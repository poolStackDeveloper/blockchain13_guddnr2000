## 이번 수업에는 뭐할까?

> **게시판의 Create, Read, Update, Delete 기능을 DB와 연결하여 실제로 동작하게 만드는 구조를 구현해봅니다.**

기존에는 `boards` 배열에 데이터를 저장했다면,
오늘은 **MySQL DB에 데이터를 저장하고 불러오는 흐름**을 처음부터 끝까지 만들어봅시다.

---

## 이번 수업의 핵심

- HTTP 요청과 DB 연결 흐름의 전체 구조 체화
- `router → controller → repository → DB → 응답` 구조 적용
- **Connection Pool**의 개념적 이해
- `INSERT`의 결과인 `ResultSetHeader` 활용 방식
- 책임과 역할 분리가 중요하다

---

## 이번 수업의 목차

0. (DB를 빼버린) HTTP 게시판 구현 수고하셨습니다.
1. MySQL과 Node.js 연결 구조 이해
2. `mysql2` 설치 및 환경 세팅
3. Ubuntu에 이미 설치된 MySQL과의 차이
4. `server.js` 기본 구조 설계
5. 디렉토리 구조
6. `db.config.js`로 DB 연결 설정
7. SQL 직접 테스트 및 pool.query
8. `pool.query()`가 하는 일
9. 글 목록 불러오기 구현 (Read)
10. 글 작성 기능 구현 (Create)
11. `ResultSetHeader`

```sh
sudo mysql -u wnqudgus1234 -p

Enter Password:
```

```sh
npm init -y
npm install express nunjucks mysql2
```

## mysql2

MySQL을 실행시킨 서버에 우리 서버에서 직접 접근할 수 있도록 도와주는
DB 커넥터 라이브러리입니다.

=> 어떻게 연결하고, 어떻게 쿼리 날라고, 어떻게 결과를 다룰 수 있는지 지원하는 도구

그 중에서! 가장 특징은

Promise 기반을 지원한다는 점
=> 비동기를 순차적으로 제어
=> 즉, 비동기를 동기처럼 처리할 수 있게 해주는 방식
**Promise 기반 비동기 처리**를 지원한다

## 오늘 디렉토리 구조는 다릅니다.

### 기존 디렉토리 구조

routes/boards.route.js
routes/users.route.js
controllers/boards.controller.js
controllers/users.controller.js

우리가 MySQL boards 데이터 베이스에 테이블이 두 개가 존재.

boards/board.route.js
boards/board.controller.js
users/user.route.js
users/user.controller.js
db.config.js

- 기능별로 디렉토리 나눔
- 협업하기 좋은 구조 => 성영님은 boards(게시판 처리), 명진님은 users(권한 인증)

```js
(async () => {
  const result = await pool.query("SELECT * FROM boards;");
  console.log(result);
})();
```

아래는 반환값

```js
[


  [
    {
      id: 1,
      user_id: 'wnqudgus1234',
      writer: '주병현',
      title: '제목입니다',
      content: '내용입니다',
      hit: 0,
      created_at: 2025-09-24T02:49:51.000Z
    },
    {
      id: 2,
      user_id: null,
      writer: '주병현',
      title: '제목입니다',
      content: '내용입니다',
      hit: 0,
      created_at: 2025-09-24T02:49:51.000Z
    }
  ],


  [
    `id` INT(10) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `user_id` VARCHAR(50),
    `writer` VARCHAR(50) NOT NULL,
    `title` VARCHAR(50) NOT NULL,
    `content` TEXT,
    `hit` INT(10),
    `created_at` DATETIME(19)
  ]


]
```

Promise<[mysql.QueryResult[], mysql.FieldPacket[]]>

QueryResult: 실제 데이터 배열 (지금 실행 결과로 봤을 때, Select 결과)
FieldPacket[]: 컬럼 정보
Promise<>: 비동기 결과를 감싸는 객체

핵심: 데이터 반환 타입과, 반환 값들을 유추할 수 있어야 한다.(인지한다);
