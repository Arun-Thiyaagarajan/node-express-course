import { StatusCodes } from "http-status-codes";
import User from "../models/User.js";
import { BadRequestError, UnauthenticatedError } from '../errors/index.js';
import { createJWT } from "../utils/jwt.js";

const register = async (req, res) => {
    const { email } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new BadRequestError('Email already exists');
    }

    // First registered user is the admin
    const isFirstAccount = await User.countDocuments({}) === 0;
    const role = isFirstAccount ? 'admin' : 'user';

    const user = await User.create({ ...req.body, role: role });
    const tokenUser = { name: user.name, userId: user._id, role: user.role };
    const token = createJWT({ payload: tokenUser });

    res.status(StatusCodes.CREATED).json({ user: tokenUser, token });
}

const login = async (req, res) => {
    res.send('login user');
}

const logout = async (req, res) => {
    res.send('logout user');
}

export {
    register,
    login,
    logout,
}