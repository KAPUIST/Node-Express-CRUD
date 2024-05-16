import express from "express";
import ProductService from "../services/productService.js";
import productValidation from "../utils/validation/productValidation.js";
import { BadRequest, NotFound, ValidationError } from "../middlewares/errorHandler.middleware.js";
import statusCode from "../utils/statusCode.js";

class ProductController {
    constructor() {
        this.productService = new ProductService();
        this.router = express.Router();

        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.post("/products", this.createProduct);
        this.router.get("/products", this.getProducts);
        this.router.get("/products/:productId", this.getProductById);
        this.router.put("/products/:productId", this.updateProduct);
        this.router.delete("/products/:productId", this.deleteProduct);
    }

    createProduct = async (req, res, next) => {
        try {
            const validatedData = await productValidation.validateAsync(req.body);

            const newProduct = await this.productService.createProduct(validatedData);
            res.status(statusCode.CREATED).json({ status: statusCode.CREATED, data: newProduct });
        } catch (error) {
            if (error.isJoi) {
                next(new ValidationError(error));
            }
            next(error);
        }
    };

    getProducts = async (req, res, next) => {
        try {
            const products = await this.productService.getProducts();
            res.status(statusCode.OK).json(products);
        } catch (error) {
            next(error);
        }
    };

    getProductById = async (req, res, next) => {
        try {
            const product = await this.productService.getProductById(req.params.productId);
            if (!product) {
                throw new NotFound("상품이 존재하지 않습니다.");
            }
            res.status(statusCode.OK).json(product);
        } catch (error) {
            next(error);
        }
    };

    updateProduct = async (req, res, next) => {
        try {
            const validatedData = await productValidation.validateAsync(req.body);

            const updatedProduct = await this.productService.updateProduct(req.params.productId, validatedData);
            res.status(statusCode.OK).json({
                status: statusCode.OK,
                message: "상품 업데이트에 성공했습니다.",
                data: updatedProduct
            });
        } catch (error) {
            if (error.isJoi) {
                next(new ValidationError(error));
            } else {
                next(error);
            }
        }
    };

    deleteProduct = async (req, res, next) => {
        try {
            const { password } = req.body;
            const productId = req.params.productId;
            const product = await this.productService.deleteProduct(productId, password);
            res.status(statusCode.OK).json({
                status: statusCode.OK,
                message: "상품 삭제에 성공했습니다.",
                data: product
            });
        } catch (error) {
            next(error);
        }
    };
}

export default new ProductController().router;
/**
 * @swagger
 * tags:
 *   name: Products
 *   description: 제품 관리 기능
 */

/**
 * @swagger
 * /products:
 *   post:
 *     tags: [Products]
 *     summary: 새 제품을 생성합니다.
 *     description: 새 제품의 정보를 데이터베이스에 추가합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: 제품이 성공적으로 생성되었습니다.
 *       400:
 *         description: 요청이 잘못되었습니다.
 *       500:
 *         description: 서버 오류
 */
/**
 * @swagger
 * /products:
 *   get:
 *     tags: [Products]
 *     summary: 모든 제품을 조회합니다.
 *     description: 데이터베이스에 저장된 모든 제품의 리스트를 반환합니다.
 *     responses:
 *       200:
 *         description: 성공적으로 제품들을 조회했습니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: 서버 오류
 */
/**
 * @swagger
 * /products/{productId}:
 *   get:
 *     tags: [Products]
 *     summary: 특정 ID를 가진 제품을 조회합니다.
 *     description: 주어진 ID를 가진 단일 제품의 상세 정보를 반환합니다.
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: 제품의 ID
 *     responses:
 *       200:
 *         description: 제품 조회에 성공했습니다.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: 제품을 찾을 수 없습니다.
 *       500:
 *         description: 서버 오류
 */
/**
 * @swagger
 * /products/{productId}:
 *   put:
 *     tags: [Products]
 *     summary: 특정 ID를 가진 제품을 업데이트합니다.
 *     description: 주어진 ID를 가진 제품의 정보를 업데이트합니다.
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: 제품의 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: 제품이 성공적으로 업데이트되었습니다.
 *       400:
 *         description: 비밀번호가 일치하지 않습니다.
 *       404:
 *         description: 제품을 찾을 수 없습니다.
 *       500:
 *         description: 서버 오류
 */
/**
 * @swagger
 * /products/{productId}:
 *   delete:
 *     tags: [Products]
 *     summary: 특정 ID를 가진 제품을 삭제합니다.
 *     description: 주어진 ID를 가진 제품을 데이터베이스에서 삭제합니다. 삭제를 위해 비밀번호 검증이 필요합니다.
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: 제품의 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 description: 제품 관리를 위한 비밀번호
 *     responses:
 *       200:
 *         description: 제품이 성공적으로 삭제되었습니다.
 *       400:
 *         description: 비밀번호가 일치하지 않습니다.
 *       404:
 *         description: 제품을 찾을 수 없습니다.
 *       500:
 *         description: 서버 오류
 */
