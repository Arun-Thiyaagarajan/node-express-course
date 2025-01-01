import { StatusCodes } from "http-status-codes";
import Product from "../models/Product.js";
import { NotFoundError } from "../errors/index.js";



const createProduct = async (req, res) => {
    req.body.user = req.user.userId;
    const product = await Product.create(req.body);
    res.status(StatusCodes.CREATED).json({ product });
}

const getAllProducts = async (req, res) => {
    const products = await Product.find({});
    res.status(StatusCodes.OK).json({ products, totalCount: products.length });
}

const getSingleProduct = async (req, res) => {
    const { id: productId } = req.params;
    const product = await Product.findOne({ _id: productId });
    if (!product) {
        throw new NotFoundError('Product not found');
    }
    res.status(StatusCodes.OK).json({ product });
}

const updateProduct = async (req, res) => {
    const { id: productId } = req.params;
    const product = await Product.findOneAndUpdate(
        { _id: productId },
        req.body,
        { new: true, runValidators: true, }
    );
    if (!product) {
        throw new NotFoundError('Product not found');
    }
    res.status(StatusCodes.OK).json({ product });
}

const deleteProduct = async (req, res) => {
    const { id: productId } = req.params;
    const product = await Product.findOne({ _id: productId });
    if (!product) {
        throw new NotFoundError('Product not found');
    }
    await product.deleteOne();
    res.status(StatusCodes.OK).json({ msg: 'Product Deleted Successfully!' });
}

const uploadImage = async (req, res) => {
    res.send('uploadImage');
}

export {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    uploadImage,
};