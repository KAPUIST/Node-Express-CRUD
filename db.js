import Dotenv from "dotenv";
Dotenv.config();
import mongoose from "mongoose";

const connectDB = async () => {
    const uri = process.env.MONGODB_CONNECTION_URI; // MongoDB 연결 URI
    const options = {
        // 연결 옵션
        dbName: process.env.MONGODB_DBNAME
    };

    try {
        await mongoose.connect(uri, options);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("MongoDB connection failed: ", error.message);
    }
};

export default connectDB;
