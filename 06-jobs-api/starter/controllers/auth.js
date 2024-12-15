import { StatusCodes } from 'http-status-codes';
import User from '../models/User.js';
import BadRequestError from '../errors/bad-request.js';
import UnauthenticatedError from '../errors/unauthenticated.js';

const register = async (req, res) => {
    const user = await User.create({ ...req.body });
    const token = user.createJWT();  // Generate JWT token for the new user.
    res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
}
const login = async (req, res) => {
    const { email, password } = req.body;
    
    // if (!email || !password) {
    //     const errMsg = !email && !password ? 'Please provide email and password' : (!password ? 'Please provide password' : 'Please provide email'); 
    //     throw new BadRequestError(errMsg);
    // }

    const user = await User.findOne({ email });
    if (!user) {
        throw new UnauthenticatedError('Invalid Credentials');
    }
    // compare password
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
        throw new UnauthenticatedError('Invalid Credentials');
    }

    const token = user.createJWT();
    res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
}

export {
    register,
    login,
}

// For Reference:
// const register = async (req, res) => {
    // const { name, password, email } = req.body;
    // if (!name || !password || !email) { 
    //     throw new BadRequestError('Please provide all required fields');
    // }
//     const user = await User.create({ ...req.body });
//     res.status(StatusCodes.CREATED).json({ user });
// }