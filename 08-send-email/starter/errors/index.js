const CustomAPIError = require('./custom-api').default
const UnauthenticatedError = require('./unauthenticated')
const NotFoundError = require('./not-found').default
const BadRequestError = require('./bad-request').default

module.exports = {
  CustomAPIError,
  UnauthenticatedError,
  NotFoundError,
  BadRequestError,
}
