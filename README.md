## Node Express CRUD Project

-   [Api Swagger](http://dfgdwssegf.shop:3000/swagger/)

## ✨ 사용 기술

![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)

## 🛠️ 미들웨어

-   **에러 핸들러**: 애플리케이션 전반에서 발생하는 에러를 처리합니다.
-   **Auth**: 사용자 인증 및 권한 부여를 처리합니다.
-   **Logger**: 요청 및 응답 로깅을 처리합니다.

## 📁 프로젝트 구조

```markdown
📁 NODE-EXPRESS-CRUD
├── 📂 controllers
│ ├── adminController.js
│ ├── authController.js
│ └── productController.js
├── 📂 services
│ ├── authService.js
│ ├── jwtService.js
│ └── productService.js
├── 📂 middlewares
│ ├── auth.middleware.js
│ ├── errorHandler.middleware.js
│ └── logger.middleware.js
├── 📂 schemas
│ └── user.schema.js
│ └── product.schema.js
├── 📂 utils
│ ├── statusCode.js
│ ├── swaggerOption.js
│ └── validation
│ ├── authValidation.js
│ └── productValidation.js
└── 📄 app.js
└── 📄 db.js
```

## 📜 주요 기능

### 관리자 기능 (Admin)

-   **제품삭제** : 관리자 유저는 비밀번호 없이 제품을 삭제합니다.

### 사용자 인증 (Auth)

-   **회원가입**: 새로운 사용자 등록
-   **로그인**: 사용자 로그인 및 JWT 토큰 발급
-   **토큰 재발급**: 만료된 액세스 토큰 재발급

### 제품 관리 (Products)

-   **제품 생성**: 새로운 제품 등록
-   **제품 조회**: 모든 제품 및 개별 제품 조회
-   **제품 업데이트**: 특정 제품 정보 수정
-   **제품 삭제**: 제품 삭제

## 📂 스키마

### User Schema

-   **username**: 사용자 이름 (String, 필수, 고유)
-   **email**: 이메일 (String, 필수, 고유)
-   **password**: 비밀번호 (String, 필수)
-   **role**: 역할 (String, 기본값: "user", "user" 또는 "admin")
-   **createdAt**: 생성 날짜 (Date, 기본값: 현재 날짜)
-   **updatedAt**: 수정 날짜 (Date, 기본값: 현재 날짜)

**Methods**:

-   **verifyPassword**: 입력된 비밀번호가 저장된 비밀번호와 일치하는지 확인
-   **pre('save')**: 비밀번호가 변경된 경우 저장 전에 비밀번호를 해시 처리

### Products Schema

-   **name**: 제품 이름 (String, 필수, 고유)
-   **description**: 제품 설명 (String, 필수)
-   **manager**: 관리자 이름 (String, 필수)
-   **status**: 상태 (String, 기본값: "FOR_SALE", "FOR_SALE" 또는 "SOLD_OUT")
-   **password**: 비밀번호 (String, 필수)
-   **createdAt**: 생성 날짜 (Date, 기본값: 현재 날짜)
-   **updatedAt**: 수정 날짜 (Date, 기본값: 현재 날짜)

**Methods**:

-   **encryptPassword**: 비밀번호를 암호화
-   **verifyPassword**: 입력된 비밀번호가 저장된 비밀번호와 일치하는지 확인

-   **pre('save')**: 비밀번호가 변경된 경우 저장 전에 비밀번호를 암호화
