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

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: 관리자 사용자 기능
 */

/**
 * @swagger
 * /admin/products/{productId}:
 *   delete:
 *     tags: [Admin]
 *     summary: 제품 ID로 제품 삭제 (관리자 전용)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: 제품 ID
 *     responses:
 *       200:
 *         description: 상품 삭제에 성공했습니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "상품 삭제에 성공했습니다."
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "664566ea6492a4071e3d058a"
 *                     name:
 *                       type: string
 *                       example: "New Item"
 *                     description:
 *                       type: string
 *                       example: "TEST"
 *                     manager:
 *                       type: string
 *                       example: "luke"
 *                     status:
 *                       type: string
 *                       example: "FOR_SALE"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-05-16T01:52:42.239Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-05-16T01:52:42.239Z"
 *       403:
 *         description: Forbidden - 엑세스 토큰이 만료되었습니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 403
 *                 error:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: "Forbidden"
 *                     message:
 *                       type: string
 *                       example: "Forbidden: 엑세스 토큰이 만료되었습니다."
 *       404:
 *         description: 상품이 존재하지 않습니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 404
 *                 error:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: "Not found"
 *                     message:
 *                       type: string
 *                       example: "상품이 존재하지 않습니다."
 */
