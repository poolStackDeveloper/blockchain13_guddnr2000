# 데이터 베이스를 왜 배우는가?

**데이터를 신뢰할 수 있고, 재사용 할 수 있도록 중앙에서 체계젃으로 관리하자**

## 일관되지 않은 과거의 데이터 관리

- A회사: 스프레드시트
- B회사: 플랫 파일

기업끼리 협업하려면? => 변환 프로그램을 만들어야 했음.

## `신뢰`할 수 있는 데이터 구조의 필요성

데이터가 여기저기 흩어져 있고, 관리하는 주체도 다 다르다면
지금 보고 있는 값이 맞는지, 또는 최신 데이터인지 확인하는 것조차 애매했다.

1. 일관성: 다 똑같은 규칙으로 저장한다.
2. 신뢰성: 한 곳에서 관리하니 출처가 명확하다.
3. 검색성: 원하는 데이터를 빠르게 찾을 수 있다.

### 1. 파일 시스템 시대 (1950 ~ 1960년대)
   
   - 데이터를 그냥 파일에 저장
   - 기업이 커지고.... 데이터가 늘면서.... 증복/불일치 문제 발생

### 2. 계층형 네트워크형 DB (1960 ~ 1970년대)

- IBM의 IMS (Information Management System) 같은 것들이 등장
- => 데이터 구조를 `트리`나 `네트워크`로 강하게 묶어서 관리

### 3. 관계형 DB (1970 ~ 1980년대)

- 1970년, IBM의 에드거 F. 코드가 관계형 모델 제안
- => 데이터를 표(테이블)로 표현하고 `SQL` 언어로 다룸
=> Oracle, IBM DB2, MS SQL Server

### 4. 인터넷 & 빅데이터 (2000년대 이후)

- 웹 서비스, SNS, 전자 상거래가 등장 => 데이터가 기하급수적으로 폭발
- 관계형 DB만으로는 복잡하고 어렵다....
- MongoDB, Redis같은 NoSQL DB 등장

데이터 베이스 => DBMS

## DBMS(DataBase Management System)

쉽게 말하면: 데이터를 정의, 조작, 제어하는 프로그램이다.

이 DBMS를 큰 틀로 두 가지로 나뉘어본다면

### 1. 관계형 DBMS (R-DBMS)
    - 데이터를 테이블(표) 형태로 저장
    - 열과 행으로 이루어져 있음
    - 데이터를 다룰 때 SQL이라는 표준 언어 사용
     
### 2. 비관계형 DBMS(NoSQL)
    - 테이블 대신에 키-값, 그래프 구조 등 다양한 방식으로 저장
    - 대규모 데이터나 비정형 데이터를 다루는 데 강점을 가짐

DBMS와 대화를 혀려면 SQL을 활용해야함

그 전에? 설치를 먼저 해야겠징

## install mysql for WSL2(Ubuntu)

```sh
sudo apt update
```

```sh
sudo apt install mysql-server
```

끝났다면

```sh
mysql --version
```

MySQL 프로세스 확인하려면?

```sh
ps -ef | grep mysql
```

현재 유저 목록 확인

```sh
SELECT USER, HOST, PlUGIN FROM mysql.user;
SELECT * FROM mysql.user;
```

root 사용자 비밀번호 변경

```sh
ALTER USER `root`@`localhost` IDENTIFIED WITH mysql_native_password BY `[여러분들비밀번호]`; => 대괄호는 빼셔야 해요!
```
ALTER USER root@localhost IDENTIFIED WITH mysql_native_password BY 'init1234';

바꾸셨다면, ctrl + D로 mysql 클라이언트 접속 해제 후 다시 sudo mysql로 접속해보세요.
비밀번호도 입력해서!

```sh
sudo mysql -u root -p
```
그러면 다음과 같은 화면이 나옵니다.

```sh
Enter password:
```

그리고 아까 설정하셨던 비번 입력해주시면 MySQL ㅈ버속이 가능합니다. => root로

이제 데이터베이스를 만들어야 함!
데이터 베이스를 어떻게 만드느냐? 문법들이 존재하는데

## SQL (Structured Query Language)

구조화된 질의 언어
=> DBMS와 대화하기 위한 언어에요.

데이터를 정의한다!
=> 데이터 베이스를 정의한다
=> 특정 테이블을 정의한다.

## DDL

데이터 정의어라고 합니다.
=> 어떤 테이블을 만들지, 어떤 구조로 만들지

- CREATE: 새로운 데이터베이스 혹은 테이블을 만든다.
- SHOW: 지금 있는 데이터베이스나 테이블 목록을 확인한다.
- DROP: 테이블이나 데이터베이스를 삭제한다.
- ALTER: 기존 구조를 수정한다.

```SH
CREATE DATABASE Boards;
```

```sh
USE [데이터베이스이름];
```

## 테이블 만들기
- board
- comments

### 하나의 게시글이라고 한다면? 속성을 어떻게 정의할까?

- id
- user_id
- title
- content
- hit (조회수)

```sql
CREATE TABLE board(
    id      VARCHAR(50),
    userid  VARCHAR(50),
    title   VARCHAR(50),
    content VARCHAR(50),
    hit     VARCHAR(50)
);
```

또 하나의 테이블을 만들어야겠지

`comments`

## 필드 타입

엑셀과 비슷하죠? 지금까지는?
엑셀에서는 칸에 숫자든 문자든 아무거나 넣을 수 있다.
데이터 베이스의 테이블에서는 그 칸에 어떤 데이터가 들어올지 미리 정의해야 합니다.
=> 필드 타입

### 숫자형

INT: 정수형 데이터를 저장합니다. (4바이트)
나이, 점수, 글 번호 등

### 문자형

- CHAR(n)
고정 길이 문자열
항상 n칸을 차지한다.

CHAR(4) => 글자가 2개만 들어와도, 뒤에 공백 2칸이 붙어서 항상 4칸을 차지
=> 4개 공간을 차지할 수 있는 걸 뜻합니다.
현실 비유 => 네 자리 좌석이 있는 버스
사람이 2명 탔어 => 빈자리는? 2자리죠? 그래서 이 자리마저 꼭 차지하는 것처럼 보임.

- VARCHAR(n)
최대 n글자까지만 저장 할 수 있다는 뜻
ab를 넣으면 ab만 저장합니다 (뒤에 공백이 없음)
abcd까지는 들어가는데 abcde까지는 오류 (n = 4 인경우)

- TEXT
(n)옵션을 쓰지 않습니다.
자체적으로 길이 제한이 정해져 있어요. => 최대 65,535자 까지


```sql
CREATE TABLE comments(
    id INT
    , board_id INT
    , content VARCHAR(50)
);

```

## 날짜형

Q. 이전에 임의로 우리가 JS에서 날짜 데이터를 넣었는데, 지금은 우리가 글을 작성하면?
DB에 글이 쌓이겠죠? 그러면 날짜가 자동으로 오늘 날짜로 계산되어서 넣어지나요?

A. 가능합니다. 근데 기본적으로 자동으로 들어가지 않아요.
엄연히 말하면! 자동으로 현재 시간을 넣는 설정을 해줘야 해요.

DATE => `YYYY-MM-DD`
TIME => HH:MM:SS
DATETIME => DATE + TIME
TIMESTAMP => 생성 수정시간 자동 기록
YEAR => 연도만 저장 (2025)

## BLOB

이미지, 동영상 같은 파일 데이터를 저장할 때 사용

## 왜 길이를 지정합니까?

1970년대!

컴퓨터 초창기

데이터 베이스가 처음 만들어질 때, 컴퓨터는 지금처럼 메모리와 저장 공간이 풍족하지 않음

1MB => 대용량임!

그래서 1바이트 1바이트가 너무 너무 금처럼 귀한 자원이었다.
그래서 문자열을 저장할 때도 정확히 몇 글자를 쓸건지 미리 정해두는게 필수였어.

일관성과 신뢰성을 보장하기 위해서 길이 규칙을 정하자.

## 자, 그럼 다시 만들어보자

```sql
DROP TABLE comments;
DROP TABLE boards;
```

`AUTO_INCREMENT`: 새로운 데이ㅏ터가 들어올 때 마다 자동으로 값이 1씩 증가
=> 주로 '`primary key`와 함께 사용
`NOT NULL` : 반드시 값이 들어가야 함(null을 허용하지 않음)
`DEFAULT NOW()`: 값을 지정하지 않으면 현재 시간이 자동으로 들어감


그리고 다시 댓글 테이블 생성

```sql
CREATE TABLE comments(
    id          INT AUTO_INCREMENT,
    title       VARCHAR(100) NOT NULL,
    content     TEXT,
    writer      CHAR(20),
    hit         INT DEFAULT 0,
    created_at DATETIME DEFAULT NOW()
)
```
지금 상황

테이블 board 만들고, comments 만들었음.

근데? show tables; 로는 테이블의 개수는 확인할 수 있는데
여전히? 그 안의 속성들 행과 열을 확인할 수 없다.

그러면 어떻게 조회하고? 데이터를 집어넣을 수 있을까?

## 데이터 조작어 (DML)
DML(Data Manupulation Language)
=> 데이터베이스에 저장된 데이터를 조회, 추가, 수정, 삭제하는 명령어들의 모음

- SELECT(조회)
- INSERT(추가)
- UPDATE(수정)
- DELETE(삭제)

### 테이블을 조회한다

```sql
SELECT * FROM [테이블이름];
=> 너 지금 테이블의 값이 아무것도 없다.
```

### 테이블의 값을 집어넣는다.
INSERT INTO comments (id, title, content, writer ) values (1,'test','content','writer');

위의 명령어로 SQL문 명령어로 데이터를 하나 집어넣었죠?
글을 하나 작성함.

그리고? 테이블을 조회할 수 있겠다.

```sql
SELECT * FROM comments;
```

근데? 나는 조회할 때 속성중에 title, content, writer만 볼 수 있으면 돼!
+------+-------+---------+--------+------+---------------------+
| id   | title | content | writer | hit  | created_at          |
+------+-------+---------+--------+------+---------------------+
|    1 | test  | content | writer |    0 | 2025-09-23 11:54:41 |
+------+-------+---------+--------+------+---------------------+

```sql
SELECT title, content, writer FROM comments;
```
mysql> SELECT title, content, writer FROM comments;
+-------+---------+--------+
| title | content | writer |
+-------+---------+--------+
| test  | content | writer |
+-------+---------+--------+
1 row in set (0.00 sec)

글 하나르 ㄹ더 작성.
근데? 저자를 다르게 작성함.

```sh
SELECT * FROM comments where writer="writer";
```

## test1234의 제목을 수정하고싶다.

```SQL
UPDATE comments SET title="수정이됩니까?" WHERE writer="test1234";
```

mysql> SELECT title, content, writer FROM comments;
+---------------------+------------------+----------+
| title               | content          | writer   |
+---------------------+------------------+----------+
| test                | content          | writer   |
| 수정이됩니까?       | 두번째 내용      | test1234 |
+---------------------+------------------+----------+
2 rows in set (0.00 sec)

## test1234가 작성한 글을 삭제하고싶다
```sql
DELETE FROM comments WHERE writer="test1234";
```
mysql> DELETE FROM comments WHERE writer="test1234";
Query OK, 1 row affected (0.01 sec)

mysql> SELECT title, content, writer FROM comments;
+-------+---------+--------+
| title | content | writer |
+-------+---------+--------+
| test  | content | writer |
+-------+---------+--------+
1 row in set (0.00 sec)
