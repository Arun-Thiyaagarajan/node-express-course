import { StatusCodes } from "http-status-codes";
import User from "../models/User.js";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import { createTokenUser } from "../utils/createTokenUser.js";
import { attachCookiesToResponse } from "../utils/jwt.js";


const getAllUsers = async (req, res) => {
    const allUsers = await User.find({ role: 'user' }).select('-password');
    res.status(StatusCodes.OK).json({ allUsers });
}

const getSingleUser = async (req, res) => {
    const user = await User.findOne({ _id: req.params.id }).select('-password');
    if (!user) {
        throw new NotFoundError('User not found');
    }
    res.status(StatusCodes.OK).json({ user });
}

const showCurrentUser = async (req, res) => {
    res.status(StatusCodes.OK).json({ user: req.user });
}

const updateUser = async (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        throw new BadRequestError('Provide the required fields');
    }
    const user = await User.findOneAndUpdate(
        { _id: req.user.userId },
        { name, email },
        { new: true, runValidators: true, }
    );
    const tokenUser = createTokenUser(user);
    attachCookiesToResponse({ res, user: tokenUser });

    res.status(StatusCodes.OK).json({ user: tokenUser });
}

const updateUserPassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword ||!newPassword) {
        throw new BadRequestError('Please provide the required fields');
    }

    const user = await User.findOne({ _id: req.user.userId });
    if (!(await user.comparePassword(oldPassword))) {
        throw new UnauthenticatedError('Invalid credentials');
    }
    user.password = newPassword;
    await user.save();

    res.status(StatusCodes.OK).json({ msg: 'Updated Password Successfully!' });
}

export {
    getAllUsers,
    getSingleUser,
    showCurrentUser,
    updateUser,
    updateUserPassword,
}