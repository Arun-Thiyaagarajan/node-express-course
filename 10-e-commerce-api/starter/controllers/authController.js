import { StatusCodes } from "http-status-codes";

const register = async (req, res) => {
    res.send('register user');
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