import { model, Schema  } from "mongoose";


const SingleCartItemSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    product: {
        type: Schema.ObjectId,
        ref: 'Product',
        required: true,
    },
});

const OrderSchema = Schema({
    tax: {
        type: Number,
        required: true,
    },
    shippingFee: {
        type: Number,
        required: true,
    },
    subTotal: {
        type: Number,
        required: true,
    },
    total: {
        type: Number,
        required: true,
    },
    orderItems: [SingleCartItemSchema],
    status: {
        type: String,
        required: true,
        enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled', 'failed'],
        default: 'pending'
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User',
        required: true,
    },
    clientSecret: {
        type: String,
        required: true,
    },
    paymentId: {
        type: String,
        required: true,
    },
}, { timestamps: true });


export default model('Order', OrderSchema);