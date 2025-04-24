import jwt from "jsonwebtoken";

export const checkAuthMiddleware = async (
  req,
  res,
  next
) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "unauthorised user",
    });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY
    );

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message || "something went wrong",
    });
  }
};
