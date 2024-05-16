import statusCode from "../utils/statusCode.js";
import AuthService from "../services/authService.js";
import JwtService from "../services/jwtService.js";
import { registerValidation, loginValidation } from "../utils/validation/authValidation.js";
import express from "express";
import { Unauthorized, ValidationError } from "../middlewares/errorHandler.middleware.js";
import { authorize, authenticateToken } from "../middlewares/auth.middleware.js";
class AuthController {
    constructor() {
        this.authService = new AuthService();
        this.router = express.Router();
        this.jwtService = new JwtService();

        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post("/auth/register", this.register);
        this.router.post("/auth/login", this.login);
        this.router.post("/auth/refresh", this.refresh);
        this.router.get("/auth/protected", authenticateToken, authorize(["user"]), (req, res, next) => {
            res.status(200).json({ message: "This is a protected route" });
        });
    }
    refresh = async (req, res, next) => {
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            throw new Unauthorized();
        }
        try {
            const userData = this.jwtService.verifyRefreshToken(refreshToken);
            const newAccessToken = this.jwtService.generateAccessToken({
                username: userData.username,
                role: userData.role
            });
            res.cookie("accessToken", newAccessToken, {
                httpOnly: true,
                sameSite: "strict"
            });
            res.status(statusCode.OK).json({
                status: statusCode.OK,
                message: "엑세스 토큰 갱신 성공",
                token: {
                    username: userData.username,
                    accessToken: newAccessToken
                }
            });
        } catch (error) {
            next(error);
        }
    };
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

            const accessToken = this.jwtService.generateAccessToken({ username: user.username, role: user.role });
            const refreshToken = this.jwtService.generateRefreshToken({ username: user.username, role: user.role });
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
