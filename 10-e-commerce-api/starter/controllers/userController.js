import { StatusCodes } from "http-status-codes";
import User from "../models/User.js";
import { NotFoundError } from "../errors/index.js";


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
    res.send('update user');
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