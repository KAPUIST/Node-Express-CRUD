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

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: 유저 인증 관리
 */

/**
 /**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: 새로운 유저 생성
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: 로그인 아이디.
 *               email:
 *                 type: string
 *                 description: 로그인 아이디.
 *               password:
 *                 type: string
 *                 description: 로그인 비밀번호.
 *     responses:
 *       201:
 *         description: 유저 생성 성공.
 */

/**
/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags: [Authentication]
 *     summary: 사용자 로그인
 *     description: 사용자의 이름과 비밀번호를 받아 로그인을 수행합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: 로그인 아이디.
 *               password:
 *                 type: string
 *                 description: 로그인 비밀번호.
 *     responses:
 *       200:
 *         description: 로그인 성공
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
 *                   example: "로그인 성공"
 *                 token:
 *                   type: object
 *                   properties:
 *                     username:
 *                       type: string
 *                       example: "admin"
 *                     accessToken:
 *                       type: string
 *                       example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3MTU4Mjc2NzUsImV4cCI6MTcxNTgyODU3NX0.AvtFgnpF5_NmdnzT966Fy98ijfApLiJDaTuGAQogQuQ"
 *                     refreshToken:
 *                       type: string
 *                       example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3MTU4Mjc2NzUsImV4cCI6MTcxNjQzMjQ3NX0.MAHJAFF0urodVycXat6HEm8QZ_SPUYYZyHV6z2GfcVE"
 *       400:
 *         description: 잘못된 요청 (유효하지 않은 사용자 이름 또는 비밀번호)
 *       500:
 *         description: 서버 오류
 */

/**
 * @swagger
 * /auth/refresh:
 *   post:
 *     tags: [Authentication]
 *     summary: 엑세스 토큰 재발급
 *     description: 쿠키에 저장된 refresh token을 사용하여 새 access token을 발급받습니다.
 *     responses:
 *       200:
 *         description: 엑세스 토큰 갱신 성공
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
 *                   example: "엑세스 토큰 갱신 성공"
 *                 token:
 *                   type: object
 *                   properties:
 *                     username:
 *                       type: string
 *                       example: "user_example"
 *                     accessToken:
 *                       type: string
 *                       example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXJfZXhhbXBsZSIwicm9sZSI6InVzZXIiLCJpYXQiOjE2MzI2OTQwODAsImV4cCI6MTYzMjcwMTI4MH0.V3dV4TS9xGItFzk8mi1h88kL2SjQxGH0x5z0fQIL1SU"
 *       401:
 *         description: 인증 실패, 유효하지 않거나 존재하지 않는 토큰
 *       500:
 *         description: 서버 오류
 */
