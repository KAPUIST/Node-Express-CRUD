## Node Express CRUD Project

-   [Api Swagger](http://dfgdwssegf.shop:3000/swagger/)

# 서버 실행 방법

## 설치 절차

1. 레포지토리 클론
2. 의존성 설치 (yarn)
3. 환경변수 설정:

-   프로젝트 루트에 .env 파일을 생성하고 필요한 변수를 설정해야 합니다 .

```
MONGODB_CONNECTION_URI="YOUR_MONGO"
MONGODB_DBNAME="node_express"
PORT = 3000
JWT_ACCESS_SECRET="node5"
JWT_REFRESH_SECRET="5edon"
```

4. 서버 실행

-   서버실행 커멘드 : yarn start
-   개발모드 실행 : yarn run dev

5. 서버 접근

-   [http://localhost:3000/api](http://localhost:3000/api)

# ✨EndPoint

## 인증 관련 엔드포인트

-   **POST /api/auth/register**

    -   설명: 새로운 사용자를 등록합니다.
    -   요청 바디:
        ```json
        {
            "username": "your_username",
            "password": "your_password",
            "email": "your_email@example.com"
        }
        ```

-   **POST /api/auth/login**
    -   설명: 사용자 로그인을 수행하고 토큰을 발급합니다.
    -   요청 바디:
        ```json
        {
            "username": "your_username",
            "password": "your_password"
        }
        ```
-   **POST /api/auth/refresh**
    -   설명: 저장된 refresh token을 사용하여 새로운 access token을 발급받습니다. 이 과정은 사용자의 지속적인 인증 상태 유지를 위해 필요하며, 보안을 강화하기 위해 HTTP Only 쿠키에 저장된 토큰을 사용합니다.
    -   요청 헤더:
        -   `Cookie`: 포함된 refresh token (예: `refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)
    -   성공 응답 (`200`):
        -   설명: 엑세스 토큰 갱신에 성공했습니다.
        -   내용:
            ```json
            {
                "status": 200,
                "message": "엑세스 토큰 갱신 성공",
                "token": {
                    "username": "admin",
                    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3MTU4Mjc2NzUsImV4cCI6MTcxNTgyODU3NX0.AvtFgnpF5_NmdnzT966Fy98ijfApLiJDaTuGAQogQuQ"
                }
            }
            ```

## 제품 관련 엔드포인트

-   **GET /api/products**

    -   설명: 모든 제품의 리스트를 반환합니다.

-   **POST /api/products**

    -   설명: 새로운 제품을 추가합니다.
    -   요청 바디:
        ```json
        {
            "name": "product_name",
            "description": "product_description",
            "manager": "manager_name",
            "password": "product_password"
        }
        ```

-   **GET /api/products/{productId}**

    -   설명: 특정 제품의 상세 정보를 반환합니다.
    -   파라미터: `productId` (제품 ID)

-   **PUT /api/products/{productId}**

    -   설명: 기존 제품의 정보를 업데이트합니다.
    -   요청 바디:
        ```json
        {
            "name": "product_name",
            "description": "product_description",
            "manager": "manager_name",
            "password": "product_password",
            "status": "product_status"
        }
        ```

-   **DELETE /api/products/{productId}**
    -   설명: 지정된 ID를 가진 제품을 삭제합니다.
    -   파라미터: `productId` (제품 ID)
    -   요청 바디:
        ```json
        {
            "password": "product_password"
        }
        ```

## 관리자 관련 엔드포인트

-   **DELETE /api/admin/products/{productId}**

    -   설명: 관리자가 주어진 ID의 제품을 데이터베이스에서 삭제합니다. 이 작업은 관리자 권한이 필요하며, 적절한 인증 및 권한 부여 과정을 거쳐야 합니다.
    -   파라미터: `productId`: 삭제할 제품의 ID
    -   요청 헤더:
    -   `authorization`: 포함된 access token (예: `accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)
    -   성공 응답 (`200`):
        -   설명: 상품 삭제에 성공했습니다.
        -   내용:
            ```json
            {
                "status": 200,
                "message": "상품 삭제에 성공했습니다.",
                "data": {
                    "_id": "664566ea6492a4071e3d058a",
                    "name": "New Item",
                    "description": "TEST",
                    "manager": "luke",
                    "status": "FOR_SALE",
                    "createdAt": "2024-05-16T01:52:42.239Z",
                    "updatedAt": "2024-05-16T01:52:42.239Z"
                }
            }
            ```

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
