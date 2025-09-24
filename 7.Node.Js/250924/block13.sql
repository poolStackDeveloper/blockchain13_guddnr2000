SHOW DATABASES;

-- 교강사는 이미 데이터 베이스가 있네?

DROP DATABASE block13;

CREATE DATABASE block13;
Query OK, 1 row affected (0.01 sec)
mysql> CREATE DATABASE block13
mysql> USE block13;
Database changed
mysql> 

-- users 테입르 기본 구조
CREATE TABLE users(
    id              INT(10) PRIMARY KEY AUTO_INCREMENT
    ,user_id        VARCHAR(20) NOT NULL UNIQUE KEY
    ,user_pw        VARCHAR(20) NOT NULL
    ,user_name      VARCHAR(20) NOT NULL
    ,gender         CHAR(4) DEFAULT "남자"
    ,created_at     DATETIME DEFAULT now()
);
Query OK, 0 rows affected, 1 warning (0.04 sec)

CREATE TABLE boards(
    id              INT(10) PRIMARY KEY AUTO_INCREMENT
    ,user_id        VARCHAR(50) NOT NULL 
    ,writer         VARCHAR(50) NOT NULL
    ,title          VARCHAR(50) NOT NULL
    ,content        TEXT
    ,hit            INT(10) DEFAULT 0
    ,created_at     DATETIME DEFAULT now() 
    -- FOREIGN KEY ([어떤 속성을 관계 맞을건데?]) REFFERENCES [테이블이름]([속성이름])
    , FOREIGN KEY (user_id) REFERENCES users(user_id)
);
Query OK, 0 rows affected, 2 warnings (0.05 sec)


-- 관계를 설정하기 위해서 두 테이블을 삭제하겠다.

DROP TABLE users;
DROP TABLE boards;

INSERT INTO users(user_id, user_pw, user_name, gender) values ("guddnr2000", "qwer1234", "최형욱", "남자");

mysql> SELECT * FROM users;
+----+------------+----------+-----------+--------+---------------------+
| id | user_id    | user_pw  | user_name | gender | created_at          |
+----+------------+----------+-----------+--------+---------------------+
|  1 | guddnr2000 | qwer1234 | 최형욱    | 남자   | 2025-09-24 11:11:39 |
+----+------------+----------+-----------+--------+---------------------+
1 row in set (0.00 sec)

-- guddnr2000에 대한 글은 정상적으로 작성. 왜냐? users에 관계를 맺었고, 살펴보니, guddnr2000가 있어요.

INSERT INTO boards(user_id, writer, title, content) values("guddnr2000", "최형욱", "제목입니다", "내용입니다");
SELECT * FROM boards;

mysql> INSERT INTO boards(user_id, writer, title, content) values("guddnr2000", "최형욱", "제목입니다", "내용입니다");
Query OK, 1 row affected (0.00 sec)

mysql> SELECT * FROM boards;
+----+------------+-----------+-----------------+-----------------+------+---------------------+
| id | user_id    | writer    | title           | content         | hit  | created_at          |
+----+------------+-----------+-----------------+-----------------+------+---------------------+
|  1 | guddnr2000 | 최형욱    | 제목입니다      | 내용입니다      |    0 | 2025-09-24 11:24:17 |
+----+------------+-----------+-----------------+-----------------+------+---------------------+
1 row in set (0.00 sec)

mysql> 


INSERT INTO boards(user_id, writer, title, content) values("guddnr2025", "최형욱", "제목입니다", "내용입니다");

mysql> INSERT INTO boards(user_id, writer, title, content) values("guddnr2025", "최형욱", "제목입니다", "내용입니다");
ERROR 1216 (23000): Cannot add or update a child row: a foreign key constraint fails

-- guddnr2025라는 user_id는 users 테이블에 존재하지 않기 때문
-- 왜? 관계를 맺었으니까! => 외래 키 (FOREIGN KEY)가 참조하는 값 자체가 USER에는 없으니!

INSERT INTO users(user_id, user_pw, user_name, gender) values ("guddnr2025", "qwer1234", "최형욱2", "남자");

-- guddnr2025 회원가입 시킨다..
mysql> INSERT INTO users(user_id, user_pw, user_name, gender) values ("guddnr2025", "qwer1234", "최형욱2", "남자");
Query OK, 1 row affected (0.00 sec)
-- 가입완료

--이제 boards에 글을 쓸 수 있다.
mysql> INSERT INTO boards(user_id, writer, title, content) values("guddnr2025", "최형욱", "제목입니다", "내용입니다");
Query OK, 1 row affected (0.00 sec)
mysql> 

-- 1. 그럼 users의 회원을 삭제하면 boards의 데이터는 어떻게 되나? 다 삭제되나?
-- 2. 유저가 탈퇴해도, 해당 유저가 작성한 글이 남아있는가?

DROP TABLE users;
DROP TABLE boards;

-- users 테입르 기본 구조
CREATE TABLE users(
    id              INT(10) PRIMARY KEY AUTO_INCREMENT
    ,user_id        VARCHAR(20) NOT NULL UNIQUE KEY
    ,user_pw        VARCHAR(20) NOT NULL
    ,user_name      VARCHAR(20) NOT NULL
    ,gender         CHAR(4) DEFAULT "남자"
    ,created_at     DATETIME DEFAULT now()
);

--참고하는 키로 만들어진, 파생된 로우가 삭제될 때,  외래 키 값들도 삭제하는 행위
--유저가 삭제됐을 때, 글도 전부 삭제되게 함
-- FOREIGN KEY ([어떤 속성을 관계 맞을건데?]) REFFERENCES [테이블이름]([속성이름])
-- ON DELETE CASCADE --유저 삭제되면 다 삭제
-- ON DELETE SET NULL -- 유저 삭제되면 NULL값 처리

CREATE TABLE boards(
    id              INT(10) PRIMARY KEY AUTO_INCREMENT
    ,user_id        VARCHAR(50) NOT NULL 
    ,writer         VARCHAR(50) NOT NULL
    ,title          VARCHAR(50) NOT NULL
    ,content        TEXT
    ,hit            INT(10) DEFAULT 0
    ,created_at     DATETIME DEFAULT now() 
    
    , FOREIGN KEY (user_id) REFERENCES users(user_id) 
    -- ON DELETE CASCADE 
    ON DELETE SET NULL
);
