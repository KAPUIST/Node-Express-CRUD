import Joi from "joi";
export const registerValidation = Joi.object({
    username: Joi.string().min(3).max(10).required().messages({
        "string.base": `문자열로 입력해주셔야 합니다.`,
        "string.empty": `usename 은 3 글자이상 작성해주셔야 합니다.`,
        "string.min": `usename 은 3 글자이상 작성해주셔야 합니다.`,
        "string.max": `usename 은 10 글자이상 작성 할수 없습니다.`,
        "any.required": `usename 정보는 필수 입니다.`
    }),
    email: Joi.string().email().min(3).max(50).required().messages({
        "string.base": `이메일은 문자열로 입력해야 합니다.`,
        "string.email": `유효한 이메일 주소를 입력해야 합니다.`,
        "string.empty": `이메일은 비워둘 수 없습니다.`,
        "string.min": `이메일은 최소 3자 이상이어야 합니다.`,
        "string.max": `이메일은 최대 50자까지 가능합니다.`,
        "any.required": `이메일 정보는 필수입니다.`
    }),
    password: Joi.string().min(6).max(50).required().messages({
        "string.base": `문자열로 입력해주셔야 합니다.`,
        "string.empty": `password 는 6 글자이상 작성해주셔야 합니다.`,
        "string.min": `password 는 6 글자이상 작성해주셔야 합니다.`,
        "string.max": `password 는 50 글자이상 작성 할수 없습니다.`,
        "any.required": `password 정보는 필수입니다.`
    })
});
export const loginValidation = Joi.object({
    username: Joi.string().min(3).max(10).required().messages({
        "string.base": `문자열로 입력해주셔야 합니다.`,
        "string.empty": `usename 은 3 글자이상 작성해주셔야 합니다.`,
        "string.min": `usename 은 3 글자이상 작성해주셔야 합니다.`,
        "string.max": `usename 은 10 글자이상 작성 할수 없습니다.`,
        "any.required": `usename 정보는 필수 입니다.`
    }),

    password: Joi.string().min(6).max(50).required().messages({
        "string.base": `문자열로 입력해주셔야 합니다.`,
        "string.empty": `password 는 6 글자이상 작성해주셔야 합니다.`,
        "string.min": `password 는 6 글자이상 작성해주셔야 합니다.`,
        "string.max": `password 는 50 글자이상 작성 할수 없습니다.`,
        "any.required": `password 정보는 필수입니다.`
    })
});
