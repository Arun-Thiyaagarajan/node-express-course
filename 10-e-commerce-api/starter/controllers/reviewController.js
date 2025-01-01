import { StatusCodes } from "http-status-codes";
import Review from "../models/Review.js";
import { BadRequestError } from "../errors/index.js";
import Product from "../models/Product.js";


const createReview = async (req, res) => {
    const { product: productId } = req.body;
    const isValidProuct = await Product.findOne({ _id: productId });

    if (!isValidProuct) {
        throw new BadRequestError('Invalid product id');
    }

    const alreadyReviewed = await Review.findOne({
        product: productId,
        user: req.user.userId
    });

    if (alreadyReviewed) {
        throw new BadRequestError('You have already reviewed this product');
    }

    req.body.user = req.user.userId;
    const review = await Review.create(req.body);
    res.status(StatusCodes.CREATED).json({ review });
}

const getAllReviews = async (req, res) => {
    res.send('getAllReviews');
}

const getSingleReview = async (req, res) => {
    res.send('getSingleReview');
}

const updateReview = async (req, res) => {
    res.send('updateReview');
}

const deleteReview = async (req, res) => {
    res.send('deleteReview');
}

export {
    createReview,
    getAllReviews,
    getSingleReview,
    updateReview,
    deleteReview,
}