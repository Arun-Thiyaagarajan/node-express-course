import { model, Schema } from "mongoose";
import isEmail from "validator/lib/isEmail";


const UserScehma = Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name'],
        minlength: 3,
        maxlength: 50,
    },
    email: {
        type: String,
        required: [true, 'Please provide a email address'],
        validate: {
            validator: isEmail,
            message: 'Please enter a valid email address',
        },
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 8,
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
    }
});

export default model('User', UserScehma);