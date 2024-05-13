import jwt from "jsonwebtoken";

class JwtService {
    constructor() {
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
            return jwt.verify(token, this.accessSecret);
        } catch (error) {
            throw new Error("Invalid or expired access token provided.");
        }
    }

    // 리프레시 토큰 검증
    verifyRefreshToken(token) {
        try {
            return jwt.verify(token, this.refreshSecret);
        } catch (error) {
            throw new Error("Invalid or expired refresh token provided.");
        }
    }
}
export default JwtService;
