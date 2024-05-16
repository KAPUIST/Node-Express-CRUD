const productSchema = {
    type: "object",
    properties: {
        name: {
            type: "string",
            description: "제품의 고유 이름",
            required: true,
            unique: true
        },
        description: {
            type: "string",
            description: "제품 설명",
            required: true
        },
        manager: {
            type: "string",
            description: "제품을 담당하는 관리자",
            required: true
        },
        status: {
            type: "string",
            description: "제품의 판매 상태",
            enum: ["FOR_SALE", "SOLD_OUT"],
            default: "FOR_SALE"
        },
        password: {
            type: "string",
            description: "제품 관리를 위한 암호화된 비밀번호",
            required: true
        }
    },
    required: ["name", "description", "manager", "status", "password"]
};

export default productSchema;
