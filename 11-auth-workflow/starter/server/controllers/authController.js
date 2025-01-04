import User from '../models/User.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, UnauthenticatedError } from '../errors/index.js';
import { attachCookiesToResponse, createHash, createTokenUser, sendResetPasswordEmail, sendVerificationEmail } from '../utils/index.js';
import crypto from 'crypto';
import Token from '../models/Token.js';

const register = async (req, res) => {
  const { email, name, password } = req.body;

  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) {
    throw new BadRequestError('Email already exists');
  }

  // first registered user is an admin
  const isFirstAccount = (await User.countDocuments({})) === 0;
  const role = isFirstAccount ? 'admin' : 'user';

  const verificationToken = crypto.randomBytes(40).toString('hex');

  const user = await User.create({ name, email, password, role, verificationToken });
  const origin = 'http://localhost:3000'

  await sendVerificationEmail({
    name: user.name,
    email: user.email,
    verificationToken: user.verificationToken,
    origin,
  });

  res.status(StatusCodes.CREATED).json({
    msg: 'Success! Please check your email to verify account',
  });
};

const verifyEmail = async (req, res) => {
  const { verificationToken, email } = req.body;
  const user = await User.findOne({ email });
  if (!user || user.verificationToken !== verificationToken) {
    throw new UnauthenticatedError('Verification Failed');
  }
  user.isVerified = true;
  user.verified = Date.now();
  user.verificationToken = '';
  await user.save();

  res.status(StatusCodes.OK).json({ msg: `${email} is verified successfully!` });
}

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError('Please provide email and password');
  }
  const user = await User.findOne({ email });

  if (!user) {
    throw new UnauthenticatedError('Invalid Credentials');
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid Credentials');
  }
  if (!user.isVerified) {
    throw new UnauthenticatedError('Please verify your email');
  }
  const tokenUser = createTokenUser(user);

  // create refresh token
  let refreshToken = '';
  // check for existing token
  const existingToken = await Token.findOne({ user: user._id });

  if (existingToken) {
    const { isValid } = existingToken;
    if (!isValid) {
      throw new UnauthenticatedError('Invalid Credentials');
    }
    refreshToken = existingToken.refreshToken;
    await existingToken.save();
  } else {
    refreshToken = crypto.randomBytes(40).toString('hex');
    const userAgent = req.headers['user-agent'];
    const ip = req.ip;
    const usertoken = {
      refreshToken,
      ip,
      userAgent,
      user: user._id,
    };
    await Token.create(usertoken);
  }

  attachCookiesToResponse({ res, user: tokenUser, refreshToken });

  res.status(StatusCodes.OK).json({ user: tokenUser });
};

const logout = async (req, res) => {
  await Token.findOneAndDelete({ user: req.user.userId });

  res.cookie('accessToken', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.cookie('refreshToken', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  });

  res.status(StatusCodes.OK).json({ msg: 'user logged out!' });
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    const passwordToken = crypto.randomBytes(40).toString('hex');
    //send email
    await sendResetPasswordEmail({
      name: user.name,
      email: user.email,
      passwordToken: passwordToken,
      origin: 'http://localhost:3000',
    });
    
    const fifteenMinutes = 1000 * 60 * 15;
    const passwordTokenExpiration = new Date(Date.now() + fifteenMinutes);
    user.passwordToken = createHash(passwordToken);
    user.passwordTokenExpiration = passwordTokenExpiration;
    await user.save();
  }

  res.status(StatusCodes.OK).json({ msg: 'Please check your email for the password reset link!' });
}

const resetPassword = async (req, res) => {
  const { token, email, password } = req.body;
  if (!token ||!email ||!password) {
    throw new BadRequestError('Please provide all required values');
  }
  const user = await User.findOne({ email });
  if (user) {
    const currentTime = new Date();
    if (user.passwordToken === createHash(token) && currentTime < user.passwordTokenExpiration) {
      user.password = password;
      user.passwordTokenExpiration = '';
      user.passwordToken = '';
      await user.save();
    } else {
      throw new UnauthenticatedError('Reset Password Link Expired');
    }
  }

  res.status(StatusCodes.OK).json({ msg: `Password reseted for the email: ${email} successfully!` });
}

export {
  register,
  login,
  logout,
  verifyEmail,
  forgotPassword,
  resetPassword,
};
