
## 설명

상품 업로드, 회원 인증 서버

## 설치

```bash
$ npm install
```

## 환경변수
* 아래 예제를 참고하여 .config.json파일을 수정하여 로컬 데이터베이스 정보를 적용한다.

```
// config.json
{
  "development": {
    "username": "charlie",
    "password": "1331",
    "database": "cizion",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "charlie",
    "password": "1331",
    "database": "cizion",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "logging": false
  }
}
```

## 실행

```bash
# development
$ npm run start
```

## 테스트

```bash
$ npm run test
```


