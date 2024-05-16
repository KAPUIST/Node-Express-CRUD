import express from "express";
import ProductService from "../services/productService.js";
import { authenticateToken, authorize } from "../middlewares/auth.middleware.js";
import statusCode from "../utils/statusCode.js";

class AdminController {
    constructor() {
        this.router = express.Router();
        this.productService = new ProductService();
        this.initializeRoutes();
    }
    initializeRoutes = () => {
        this.router.delete("/admin/products/:productId", authenticateToken, authorize(["admin"]), this.deleteProduct);
    };

    deleteProduct = async (req, res, next) => {
        try {
            const productId = req.params.productId;
            const product = await this.productService.deleteProductForAdmin(productId);
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

export default new AdminController().router;
