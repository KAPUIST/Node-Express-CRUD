import jwt from "jsonwebtoken";
import { Forbidden } from "../middlewares/errorHandler.middleware.js";

class JwtService {
    constructor() {
        if (!process.env.JWT_ACCESS_SECRET || !process.env.JWT_REFRESH_SECRET) {
            throw new Error("JWT 키가 설정되지 않았습니다.");
        }
        this.accessSecret = process.env.JWT_ACCESS_SECRET;
        this.refreshSecret = process.env.JWT_REFRESH_SECRET;
        this.accessOption = { expiresIn: "15m" }; // 기본 액세스 토큰 만료 시간
        this.refreshOptions = { expiresIn: "7d" }; // 리프레시 토큰 만료 시간
    }

    // 액세스 토큰 생성
    generateAccessToken(payload) {
        return jwt.sign(payload, this.accessSecret, this.accessOption);
    }

    // 리프레시 토큰 생성
    generateRefreshToken(payload) {
        return jwt.sign(payload, this.refreshSecret, this.refreshOptions);
    }

    // 액세스 토큰 검증
    verifyAccessToken(token) {
        try {
            const user = jwt.verify(token, this.accessSecret);
            return user;
        } catch (error) {
            if (error instanceof jwt.TokenExpiredError) {
                throw new Forbidden("엑세스 토큰이 만료되었습니다.");
            } else if (error instanceof jwt.JsonWebTokenError) {
                throw new Forbidden("엑세스 토큰이 유효하지 않습니다.");
            } else {
                throw new Error("엑세스 토큰 검증 중 오류가 발생했습니다.");
            }
        }
    }

    // 리프레시 토큰 검증
    verifyRefreshToken(token) {
        try {
            return jwt.verify(token, this.refreshSecret);
        } catch (error) {
            if (error instanceof jwt.TokenExpiredError) {
                throw new Forbidden("리프레시 토큰이 만료되었습니다.");
            } else if (error instanceof jwt.JsonWebTokenError) {
                throw new Forbidden("리프레시 토큰이 유효하지 않습니다.");
            } else {
                throw new Error("리프레시 토큰 검증 중 오류가 발생했습니다.");
            }
        }
    }
}
export default JwtService;
