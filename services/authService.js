import User from "../schemas/user.schema.js";
import { BadRequest } from "../middlewares/errorHandler.middleware.js";

class AuthService {
    constructor() {
        this.user = User;
    }
    async registerUser(data) {
        const existingUser = await User.findOne({ $or: [{ email: data.email }, { username: data.username }] });
        if (existingUser) {
            console.log(existingUser);
            throw new BadRequest("이메일 또는 사용자 이름이 이미 사용 중입니다.");
        }
        const newUser = new this.user(data);
        await newUser.save();
        const responseData = {
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            createdAt: newUser.createdAt,
            updatedAt: newUser.updatedAt
        };
        return responseData;
    }
    async validateUser(data) {
        const existingUser = await User.findOne({ username: data.username });
        if (!existingUser) {
            console.log(existingUser);
            throw new BadRequest("사용자 이름을 찾을수 없습니다.");
        }
        if (!(await existingUser.verifyPassword(data.password))) {
            throw new BadRequest("비밀번호가 일치하지 않습니다.");
        }
        return existingUser;
    }
}

export default AuthService;
