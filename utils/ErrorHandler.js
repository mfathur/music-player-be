const errorHandler = (err, req, res, next) => {
  const errorStatus = err.statusCode || 500;
  const errorMsg = err.message || "Something went wrong";

  res.status(errorStatus).json({
    status: errorStatus,
    message: errorMsg,
    stack: process.env.NODE_ENV === "development" ? err.stack : {},
  });
};

module.exports = { errorHandler };
