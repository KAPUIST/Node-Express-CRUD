import fs from "fs";
import path from "path";

const logsDirectory = path.join(path.dirname(new URL(import.meta.url).pathname), "..", "logs");

// 로그 디렉토리가 없으면 생성
if (!fs.existsSync(logsDirectory)) {
    fs.mkdirSync(logsDirectory);
}

const fileLoggerMiddleware = (req, res, next) => {
    const { method, url, params, body } = req;

    const timestamp = new Date().toISOString();
    const currentDate = new Date().toISOString().split("T")[0]; // 현재 날짜
    const logFileName = `${currentDate}-access.log`;
    const logFilePath = path.join(logsDirectory, logFileName);

    const logMessage = `
[Request] ${timestamp}
  Method: ${method}
  URL: ${url}
  Params: ${JSON.stringify(params)}
  Body: ${JSON.stringify(body)}
`;

    fs.appendFileSync(logFilePath, logMessage);

    next();
};

export default fileLoggerMiddleware;
