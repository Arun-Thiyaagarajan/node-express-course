import Errors from '../errors/index.js';
import { StatusCodes } from 'http-status-codes'

const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    // set default error
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || 'An unexpected error occurred',
  }

  // if (err instanceof CustomAPIError) {
  //   return res.status(err.statusCode).json({ msg: err.message })
  // }

  if (err.name === 'CastError') {
    customError.message = `No item found with id: ${err.value}`;
    customError.statusCode = StatusCodes.NOT_FOUND;
  }

  if (err.name === 'ValidationError') {
    customError.message = Object.values(err.errors).map((item) => item.message).join(", ");
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  if (err.code && err.code === 11000) {
    customError.message = `Duplicate ${Object.keys(err.keyValue)} found.`;
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  return res.status(customError.statusCode).json({ msg: customError.message });
  // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err })
}

export default errorHandlerMiddleware
