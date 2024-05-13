import mongoose from "mongoose";
import bcrypt from "bcrypt";

const { Schema, model } = mongoose;

const productsSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        description: {
            type: String,
            required: true
        },
        manager: {
            type: String,
            required: true
        },
        status: {
            type: String,
            enum: ["FOR_SALE", "SOLD_OUT"],
            default: "FOR_SALE"
        },
        password: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        }, // 명시적으로 필드 추가
        updatedAt: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true
    }
);

// 비밀번호를 암호화하는 메소드 추가
productsSchema.methods.encryptPassword = async function () {
    const saltRounds = 10; // 솔트 라운드 수를 정확하게 명시
    this.password = await bcrypt.hash(this.password, saltRounds);
};

// 제공된 비밀번호와 저장된 비밀번호를 비교하는 메소드 추가
productsSchema.methods.verifyPassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

// 저장하기 전에 비밀번호 암호화를 위한 미들웨어 설정
productsSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next(); // 비밀번호가 변경되지 않았다면 다음 미들웨어로 넘어감
    await this.encryptPassword();
    next();
});

export default model("Products", productsSchema);
