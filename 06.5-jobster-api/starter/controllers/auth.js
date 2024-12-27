import { StatusCodes } from 'http-status-codes';
import User from '../models/User.js';
import UnauthenticatedError from '../errors/unauthenticated.js';

const register = async (req, res) => {
    const user = await User.create({ ...req.body });
    const token = user.createJWT();  // Generate JWT token for the new user.
    res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
}
const login = async (req, res) => {
    const { email, password } = req.body;
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