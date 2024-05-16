import JwtService from "../services/jwtService.js";

import { Forbidden, Unauthorized } from "./errorHandler.middleware.js";

const jwtService = new JwtService();

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token === undefined) {
        throw new Unauthorized();
    }

    try {
        const user = jwtService.verifyAccessToken(token);
        req.user = user;
        next();
    } catch (error) {
        next(new Forbidden(error));
    }
};
const authorize = (permissions) => {
    return (req, res, next) => {
        const userRole = req.user.role;
        if (permissions.includes(userRole)) {
            next();
        } else {
            throw new Forbidden("권한이 존재하지않습니다.");
        }
    };
};
export { authenticateToken, authorize };
