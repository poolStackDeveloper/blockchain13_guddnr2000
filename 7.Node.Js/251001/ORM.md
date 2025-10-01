우리가 하려는 흐름

[클라이언트] => [서버] => [DB]

HTML 화면
JS로 사용자 입력 받고
fetch를 이용해 서버로 데이터를 보냄

그래서... req.body 받아서 그 값을 확인해서 DB에 통신 이라고 하죠

```sql
INSERT INTO ㅕㄴㄷㄱㄴ(...) values(?,?,?)
```

이 코드를 우리는 직접 작성했습니다.

sql 문법 익히고, 테이블 구조 이해하고. 등등

근데? 지금 규모가 굉장히 작은 서비스

간단한 CRUD

큰 규모는 SQL 문법만으로 5줄을 차지하는 경우도 다반사입니다.

그것뿐만인가? 테이블에 값이 잘 들어갔는지 조회하는 것도 SQL...

즉, 우리 Node환경과 MySQL 프로세스 환경 사이를 왔다갔다...

그래서 생각하게 됩니다.

디렉토리부터, Node.js 환경까지....

MySQL 프로세스에 직접 접근하는 방식 말고, 그냥.... 디렉토리부터 우리가 작성한 코드로 한 번에 개발 및 관리할 수는 없을까?
=> 노동에 가깝다

그래서 생각했습니다.

## SQL과 JS는 어울리지 않는다.

## 주의할 점

1. ORM은 필수가 아니다!
2. 서비스가 작다면 쌩 SQL, 아니라면 ORM을 추천해드리는 것
3. 단지, 필요하다면 ORM을 선택할 수 있는 역량이 필요하다!
4. 그에 대해서 첫 문장은 ORM이 왜 탄생했는가? 부터 시작한다.
   => SQL은 JS와 어울리지 않는다.

유저를 생성한다. 했을 때? JS의 객체 지향적 언어로 표현한다면?

```Js
class users{
    constructor(id...){
        this.id = id
        ...
    }
}

const JuByoengHyun = new users(1, "wnqudgus1234");
```

RDBMS 세계에서는?

```sql
CREATE TABLE users(
    id INT(10) PRIMARY KEY AUTO_INCREMENT,
    user_id VARCHAR(20) NOT NULL UNIQUE KEY,
    user_pw VARCHAR(20) NOT NULL,
    user_name VARCHAR(20) NOT NULL,
    gender CHAR(4) DEFAULT "남자",
    created_at DATETIME DEFAULT now()
);

CREATE TABLE boards(
    id INT(10) PRIMARY KEY AUTO_INCREMENT,
    user_id VARCHAR(50) NOT NULL,
    writer VARCHAR(50) NOT NULL,
    title VARCHAR(50) NOT NULL,
    content TEXT,
    hit INT(10) DEFAULT 0,
    created_at DATETIME DEFAULT now(),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
    ON DELETE CASCADE
);
```

SQL을 직접 쓰지 않고, Javascript로만 DB를 다룰 수 있다면?
=> ORM 중에서 Sequelize라는 애.

1. 유지보수
2. 가독성
3. 협업

등등

다양한 측면에서 장점이 있다.

오타도 무시할 수 없다!!

**자바스크립트 개발자라면, JS 안에서 모든걸 보고 조작할 수 있어야 하지 않겠느냐!!**
또한! 디렉토리 내부의 모델 파일에서 테이블 구조라도 관리하자!

**근본은 역시 RDBMS => MySQL 맞음. 하지만 왔다갔다 하면서 개발하는 형태를 좀 줄이자**
필요에 의한다면!

## ORM이란?

Object Relational Mapping의 약자입니다.

쉽게: 객체와 관계형 데이터베이스를 맵핑해주는 기술

## 그 중에서 Sequelize

Node.js와 Express 기반의 웹 서버에서 널리 사용되는 ORM 도구

한 가지 강력한 철학

**모든 테이블을 객체처럼 다루겠다.**

우리는 객체에 익숙하다!!

그래서? 테이블, 열, 행, 관계(PK, FK) 같은 DB요소들을
전부 객체 지향적으로 표현.

그 중 대표적인 키워드가 모델!

모델 => 하나의 DB테이블

## 모델이란?

지금 당장은, DB 테이블 === 하나의 모델
이라고 보셔도 괜찮습니다.

좀 더 깊게 : DB 테이블을 JS 객체로 표현

```sh
npm install sequelize
```