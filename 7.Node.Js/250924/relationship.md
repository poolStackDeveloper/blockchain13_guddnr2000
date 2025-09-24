```sql
sudo mysql -u guddnr2000 -p
```

## 어제 SQL과 친해지라고 한 이유

MySQL 서버에게 명령을 내린다는 건? 결국?

- 데이터 추가 (Insert)
- 데이터 불러오기 (SELECT)
- 데이터 수정 (UPDATE)
- 데이터 수정 (UPDATE)
- 데이터 삭제 (DELETE)

 SQL 문법을 통해 MySQL 서버에게 요청하는 방식

 그래서 우리는 나중에 이런 코드를 작성해요.

 ```js
 const fianAll - async () => {
    const [result] = await pool.query("SELECT * FROM boards;");
    return result;
 };
 ```

 근데 이제? 썸까지 탔다면? 문법만 잘 안다고 해서(아직 문법도 시간이 더 필요하지만)

 - 어떤 테이블을 만들건지
 - 어떤 컬럼을 만들건지
 - 어떤 관계를 맺을건지
=> 데이터 구조 자체를 설계할 수 있는 역량
핵심: SQL 문법 자체도 중요하지만, 구조 자체를 설계하는 역량도 필요하다.

