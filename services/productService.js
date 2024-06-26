import Products from "../schemas/products.schema.js";
import { BadRequest, NotFound } from "../middlewares/errorHandler.middleware.js";

class ProductService {
    constructor() {
        this.Products = Products;
    }

    async createProduct(data) {
        const existingProduct = await Products.findOne({ name: data.name });
        if (existingProduct) {
            throw new BadRequest("이미 같은이름의 상품이 존재합니다.");
        }
        const newProduct = new this.Products(data);
        await newProduct.save();
        const responseData = {
            _id: newProduct._id,
            name: newProduct.name,
            description: newProduct.description,
            manager: newProduct.manager,
            status: newProduct.status,
            createdAt: newProduct.createdAt,
            updatedAt: newProduct.updatedAt
        };
        return responseData;
    }

    async getProducts() {
        return this.Products.find({}).select("-password -__v").sort("-createdAt");
    }

    async getProductById(id) {
        return this.Products.findById(id).select("-password -__v");
    }

    async updateProduct(id, data) {
        const product = await this.verifyProductOwner(id, data.password);

        const fieldUpdate = ["name", "description", "manager", "status"];
        fieldUpdate.forEach((item) => {
            if (data[item] !== undefined) {
                product[item] = data[item];
            }
        });

        await product.save();

        const returnedProduct = {
            id: product._id,
            name: product.name,
            description: product.description,
            manager: product.manager,
            status: product.status
        };
        return returnedProduct;
    }
    async updateProductForAdmin(id, data) {
        const product = await this.Products.findById(id);
        if (!product) {
            throw new NotFound("상품이 존재하지 않습니다.");
        }

        const fieldUpdate = ["name", "description", "manager", "status"];
        fieldUpdate.forEach((item) => {
            if (data[item] !== undefined) {
                product[item] = data[item];
            }
        });

        await product.save();

        const returnedProduct = {
            id: product._id,
            name: product.name,
            description: product.description,
            manager: product.manager,
            status: product.status
        };
        return returnedProduct;
    }
    async deleteProduct(id, password) {
        const product = await this.verifyProductOwner(id, password);

        await this.Products.findByIdAndDelete(id);
        product.password = undefined;
        product.__v = undefined;
        return product;
    }
    async deleteProductForAdmin(id) {
        const product = await this.Products.findById(id);
        if (!product) {
            throw new NotFound("상품이 존재하지 않습니다.");
        }
        await this.Products.findByIdAndDelete(id);
        product.password = undefined;
        product.__v = undefined;
        return product;
    }
    async verifyProductOwner(id, password) {
        const product = await this.Products.findById(id);
        if (!product) {
            throw new NotFound("상품이 존재하지 않습니다.");
        }
        if (!(await product.verifyPassword(password))) {
            throw new BadRequest("비밀번호가 일치하지 않습니다.");
        }
        return product;
    }
}

export default ProductService;
