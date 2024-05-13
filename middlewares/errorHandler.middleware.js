// 에러 핸들링 미들웨어
import statusCode from "../utils/statusCode.js";
import path from "path";
import fs from "fs";
const logsDirectory = path.join(path.dirname(new URL(import.meta.url).pathname), "..", "logs");

// 로그 디렉토리가 없으면 생성
if (!fs.existsSync(logsDirectory)) {
    fs.mkdirSync(logsDirectory);
}

export function errorHandler(err, req, res, next) {
    const timestamp = new Date().toISOString();
    const currentDate = new Date().toISOString().split("T")[0]; // 현재 날짜

    const logFileName = `${currentDate}-access.log`;
    const logFilePath = path.join(logsDirectory, logFileName);
    if (res.headersSent) {
        return next(err);
    }
    if (err.name === "CastError") {
        err.status = 400;
        err.message = "유효하지않은 Id 입니다.";
    }
    const status = err.status || 500;
    const errorResponse = {
        status: status,
        error: {
            name: err.name || "Internal Server Error",
            message: err.message || "예상치 못한 에러가 발생했습니다. 관리자에게 문의해 주세요."
        }
    };
    // 서버 로그에 에러 기록
    console.error("Error:", err);
    const errorMessage = `
          [Error] ${timestamp}
          Name: ${err.name || "Unknown"}
          Message: ${err.message || "Unknown"}
        `;
    fs.appendFileSync(logFilePath, errorMessage);
    // 클라이언트에 에러 응답 전송
    res.status(status).json(errorResponse);
}
export class BadRequest extends Error {
    constructor(message = "잘못된 요청입니다.") {
        super(message);
        this.status = statusCode.BAD_REQUEST;
        this.name = "Bad Request";
    }
}
export class NotFound extends Error {
    constructor(message = "해당 요청의 자료를 찾을수없습니다.") {
        super(message);
        this.status = statusCode.NOT_FOUND;
        this.name = "NotFound";
    }
}

export class ValidationError extends Error {
    constructor(error, message = "유효성 검사 실패.") {
        super(message);
        this.message = error.details.map((detail) => detail.message).join(", ");
        this.status = statusCode.BAD_REQUEST;
        this.name = "ValidationError";
    }
}
