import swaggerJsdoc from "swagger-jsdoc";
import productSchema from "./components/products.js";
const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: "Express API for Products",
        version: "1.0.0",
        description: `
        이 API 문서는 개발자들을 위한 안내서입니다. 다음은 데모 접속 정보입니다:
  
        - 데모 아이디: admin
        - 데모 비밀번호: thswldud7!
  
        이 정보를 사용하여 API의 데모 버전에 접근하고 테스트할 수 있습니다.
        - Admin 용 api에 접근할수있습니다.
      `
    },
    servers: [
        {
            url: "http://localhost:3000/api/",
            description: "Development server"
        }
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT"
            }
        },
        schemas: {
            Product: productSchema
        }
    }
};

const options = {
    swaggerDefinition,

    apis: ["./controllers/*.js"]
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
