
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

## API 정보 (Swagger)
* ~~서버 실행 후 http://localhost:3000/api/ 접속~~  

문제가 있어 대체 합니다 ㅠㅠ
> **POST** - [http://localhost:3000/signup](http://localhost:3000/signup)  
**DATA** - id (string), password (string)
회원가입

> **POST** - [http://localhost:3000/](http://localhost:3000/signup)login  
**DATA** - id (string), password (string)
로그인

> **POST** - [http://localhost:3000/](http://localhost:3000/signup)post  
**DATA** - title (string), content (string)
게시글 작성

> **POST** - [http://localhost:3000/](http://localhost:3000/signup)comment  
**DATA** - comment (string), postId (string)
댓글 작성

> **PATCH** - [http://localhost:3000/](http://localhost:3000/signup)comment  
**DATA** - commentId (string), comment (string)
댓글 수정

> **POST** - [http://localhost:3000/](http://localhost:3000/signup)like  
**DATA** - commentId (string), isLike (boolean)
좋아요/싫어요

> **GET** - [http://localhost:3000/](http://localhost:3000/signup)comments/{postId}/{filter?}  
게시글에 달린 댓글 조회, 필터(옵셔널)

> **DELETE** - [http://localhost:3000/](http://localhost:3000/signup)comment/{commentId}  
댓글 아이디로 댓글 삭제

## 회고

* 부득이하게 동시에 두개의 코딩테스트를 진행하게 되어 부족한 부분이 많지만 일정에 맞추기 위해 높은 텐션으로 개발을 진행하며 꽤나 즐거운 시간이었습니다. 

* 평소에 관심있던 TDD를 최대한 적용하였습니다. TDD가 항상 정답은 아니지만 빠른 피드백을 통하여 리팩토링을 부담없이 진행할 수 있었습니다.

* 다급함을 느끼자 코드 품질에 대해 신경을 쓸 겨를이 전혀 없는 것을 보니 아직 많이 배워야겠다고 생각했습니다.

* 부족한 부분
  * 예외처리
  * 복잡한 테스트 코드
  * 낮은 가독성


