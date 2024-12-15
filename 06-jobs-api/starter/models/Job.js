import pkg from 'mongoose';

const JobSchema = pkg.Schema({
    company: {
        type: String,
        required: [true, 'Please provide company name'],
        maxlength: 50
    },
    position: {
        type: String,
        required: [true, 'Please provide position'],
        maxlength: 100
    },
    status: {
        type: String,
        enum: ['interview', 'declined', 'pending'],
        default: 'pending',
    },
    createdBy: {
        type: pkg.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide user'],
    },
}, {timestamps: true}
);

export default pkg.model('Job', JobSchema);