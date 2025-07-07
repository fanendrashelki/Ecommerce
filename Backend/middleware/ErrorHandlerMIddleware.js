const ErrorMiddleware = (error, req, res, next) => {
  let statusCode = error.statusCode || 500;
  let message = error.message || "Internal Server Error";

  res.status(statusCode).json({
    error: true,
    success: false,
    message,
  });
};

export default ErrorMiddleware;
