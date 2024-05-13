import request from "supertest";
import app from "../app";
import mongoose from "mongoose";
import Products from "../schemas/products.schema.js";

describe("Products API", () => {
    it("GET /api/products - success", async () => {
        const response = await request(app).get("/api/products");
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    it("POST /api/products - success", async () => {
        const response = await request(app).post("/api/products").send({
            name: "New Item",
            description: "Details of new item",
            manager: "Manager Name",
            password: "12345"
        });
        expect(response.status).toBe(201);
        expect(response.body.name).toEqual("New Item");
    });
    afterEach(async () => {
        // 모든 Item 데이터 삭제
        await Products.deleteMany({});
    });

    // 테스트가 모두 끝난 후에 데이터베이스 연결 종료
    afterAll(async () => {
        await mongoose.connection.close();
    });
});
