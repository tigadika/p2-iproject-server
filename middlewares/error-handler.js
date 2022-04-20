function errorHandler(err, req, res, next) {
  switch (err.name) {
    case "Unauthorized":
      err.statusCode = 401;
      err.message = "Unauthorized";
      break;
    case "TokenExpiredError":
      err.statusCode = 401;
      err.message = "Unauthorized";
      break;
    case "JsonWebTokenError":
      err.statusCode = 401;
      err.message = "Unauthorized";
      break;
    case "Forbidden":
      err.statusCode = 403;
      err.message = "Forbidden";
      break;
    case "SequelizeUniqueConstraintError":
      err.statusCode = 400;
      err.message = err.errors[0].message;
      break;
    case "SequelizeValidationError": //addproduct, editOneProduct, register
      err.statusCode = 400;
      err.message = err.errors[0].message;
      break;
    case "PairNotFound": //findProduct, editOneProduct, deleteOneProduct
      err.statusCode = 404;
      err.message = "Crypto Coin Not Found";
      break;
    case "UserNotValid":
      err.statusCode = 400;
      err.message = "Invalid Email / Password";
      break;
    default:
      err.statusCode = 500;
      err.message = "Internal Server Error";
  }

  const statusCode = err.statusCode;
  const message = err.message;

  res.status(statusCode).json({
    statusCode,
    message,
  });
}

module.exports = errorHandler;
