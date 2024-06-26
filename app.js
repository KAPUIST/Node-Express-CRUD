import express from "express";
import Dotenv from "dotenv";
Dotenv.config();
import cookieParser from "cookie-parser";
import connectDB from "./db.js";
import { errorHandler } from "./middlewares/errorHandler.middleware.js";
import ProductController from "./controllers/productController.js";
import AuthController from "./controllers/authContorller.js";
import AdminController from "./controllers/adminController.js";
import loggerMiddleware from "./middlewares/logger.middleware.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./utils/swaggerOptions.js";
connectDB();

const app = express();
const router = express.Router();
const PORT = process.env.PORT || 3000;

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(loggerMiddleware);
app.use("/api", [AuthController, AdminController, ProductController]);

// 404 에러 처리
app.use((req, res, next) => {
    res.status(404).send("Page not found");
});

app.use(router);

app.use(errorHandler);
app.listen(PORT, () => {
    console.log("Listening on port " + PORT);
});

export default app;
