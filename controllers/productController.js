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
            res.status(200).json(products);
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
            res.status(200).json(product);
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
