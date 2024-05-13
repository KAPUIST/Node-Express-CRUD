import Joi from "joi";
const productValidation = Joi.object({
    name: Joi.string().min(3).max(50).required().messages({
        "string.base": `문자열로 입력해주셔야 합니다.`,
        "string.empty": `name 은 3 글자이상 작성해주셔야 합니다.`,
        "string.min": `name 은 3 글자이상 작성해주셔야 합니다.`,
        "string.max": `name 은 50 글자이상 작성 할수 없습니다.`,
        "any.required": `name 정보는 필수 입니다.`
    }),
    description: Joi.string().min(5).max(500).required().messages({
        "string.base": `문자열로 입력해주셔야 합니다.`,
        "string.empty": `description 은 5 글자이상 작성해주셔야 합니다.`,
        "string.min": `description 은 5 글자이상 작성해주셔야 합니다.`,
        "string.max": `description 은 500 글자이상 작성 할수 없습니다.`,
        "any.required": `description 정보는 필수입니다.`
    }),
    manager: Joi.string().min(3).max(50).required().messages({
        "string.base": `문자열로 입력해주셔야 합니다.`,
        "string.empty": `manager 는 5 글자이상 작성해주셔야 합니다.`,
        "string.min": `manager 는 5 글자이상 작성해주셔야 합니다.`,
        "string.max": `manager 는 50 글자이상 작성 할수 없습니다.`,
        "any.required": `manager 정보는 필수입니다.`
    }),
    password: Joi.string().min(6).max(50).required().messages({
        "string.base": `문자열로 입력해주셔야 합니다.`,
        "string.empty": `password 는 6 글자이상 작성해주셔야 합니다.`,
        "string.min": `password 는 6 글자이상 작성해주셔야 합니다.`,
        "string.max": `password 는 50 글자이상 작성 할수 없습니다.`,
        "any.required": `password 정보는 필수입니다.`
    }),
    status: Joi.string().valid("FOR_SALE", "SOLD_OUT", "").messages({
        "string.valid": `status는 "FOR_SALE", "SOLD_OUT" 또는 빈 문자열이어야 합니다.`
    })
});

export default productValidation;
