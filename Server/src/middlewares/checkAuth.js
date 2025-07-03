import jwt from "jsonwebtoken";
import User from "../models/User.js";
import AppError from "../utils/appError.js";
import { JWT_SECRET_KEY } from "../config/envConfig.js";

export const checkAuthMiddleware = async (
  req,
  res,
  next
) => {
  const token = req.cookies.token;

  if (!token) {
    next(new AppError("please login again", 401));
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET_KEY);

    const findUser = await User.findById(decoded.userId);
    if (!findUser)
      return next(new AppError("no user found") || 404);
    const { _id, userName, email, role, cartItems } =
      findUser;
    req.user = {
      id: _id,
      userName,
      email,
      role,
      cartItems,
    };
    return next();
  } catch (error) {
    return next(
      new AppError(
        error.message || "soemthing went wrong",
        500
      )
    );
  }
};
