const { Schema, model, Types } = require("mongoose");


const ReviewSchema = Schema({
    rating: {
        type: Number,
        required: [true, 'Please provide rating'],
        min: 1,
        max: 5,
    },
    title: {
        type: String,
        required: [true, 'Please provide review title'],
        minlength: 3,
        maxlength: [100, 'No more than 100 characters'],
    },
    comment: {
        type: String,
        required: [true, 'Please provide review comment'],
        minlength: 3,
        maxlength: [1000, 'No more than 1000 characters'],
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User',
        required: true,
    },
    product: {
        type: Schema.ObjectId,
        ref: 'Product',
        required: true,
    },
}, { timeStamps: true });

// Only One Product Review per User
ReviewSchema.index(
    { product: 1, user: 1 },
    { unique: true }
);

export default model('Review', ReviewSchema);