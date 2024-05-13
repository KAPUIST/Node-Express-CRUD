import statusCode from "../utils/statusCode.js";
import AuthService from "../services/authService.js";
import JwtService from "../services/jwtService.js";
import { registerValidation, loginValidation } from "../utils/validation/authValidation.js";
import express from "express";
import { ValidationError } from "../middlewares/errorHandler.middleware.js";
class AuthController {
    constructor() {
        this.authService = new AuthService();
        this.router = express.Router();
        this.jwtService = new JwtService();

        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post("/register", this.register);
        this.router.post("/login", this.login);
    }

    register = async (req, res, next) => {
        try {
            const validatedData = await registerValidation.validateAsync(req.body);
            const user = await this.authService.registerUser(validatedData);
            res.status(statusCode.CREATED).json({
                status: statusCode.CREATED,
                message: "사용자 등록 성공.",
                data: user
            });
        } catch (error) {
            if (error.isJoi) {
                next(new ValidationError(error));
            }
            next(error);
        }
    };
    login = async (req, res, next) => {
        try {
            const validatedData = await loginValidation.validateAsync(req.body);
            const user = await this.authService.validateUser(validatedData);

            const accessToken = this.jwtService.generateAccessToken({ userName: user.username });
            const refreshToken = this.jwtService.generateRefreshToken({ userName: user.username });
            res.cookie("accessToken", accessToken, {
                httpOnly: true,
                sameSite: "strict"
            });
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                sameSite: "strict"
            });
            res.status(statusCode.OK).json({
                status: statusCode.OK,
                message: "로그인 성공",
                token: {
                    username: user.username,
                    accessToken,
                    refreshToken
                }
            });
        } catch (error) {
            if (error.isJoi) {
                next(new ValidationError(error));
            }
            next(error);
        }
    };
}
export default new AuthController().router;
