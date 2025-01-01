import { StatusCodes } from "http-status-codes";
import Product from "../models/Product.js";



const createProduct = async (req, res) => {
    req.body.user = req.user.userId;
    const product = await Product.create(req.body);
    res.status(StatusCodes.CREATED).json({ product });
}

const getAllProducts = async (req, res) => {
    res.send('getAllProducts');
}

const getSingleProduct = async (req, res) => {
    res.send('getSingleProduct');
}

const updateProduct = async (req, res) => {
    res.send('updateProduct');
}

const deleteProduct = async (req, res) => {
    res.send('deleteProduct');
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