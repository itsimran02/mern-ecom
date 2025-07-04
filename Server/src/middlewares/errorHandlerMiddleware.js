const errorHandler = (err, req, res, next) => {
  console.log(err);
  return res.status(err.statusCode || 500).json({
    message: err.message || "something went wrong",
    success: false,
  });
};

export default errorHandler;
