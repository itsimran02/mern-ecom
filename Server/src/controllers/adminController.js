import { JWT_SECRET_KEY } from "../config/envConfig.js";
import Order from "../models/Order.js";
import User from "../models/User.js";
import AppError from "../utils/appError.js";
import jwt from "jsonwebtoken";
const getOrders = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token)
    return next(new AppError("anauthorized request", 401));
  try {
    const decoded = jwt.verify(token, JWT_SECRET_KEY);

    if (decoded.role !== "admin") {
      return next(
        new AppError("anauthorized request", 401)
      );
    }

    const orders = await Order.find().sort({
      createdAt: -1,
    });

    if (orders.length === 0) {
      return next(new AppError("No orders found", 404));
    }

    return res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    return next(
      new AppError(
        error.message || "something went wrong",
        500
      )
    );
  }
};

const getCustomers = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return next(new AppError("unauthorized request", 401));
  try {
    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    if (decoded.role !== "admin") {
      return next(
        new AppError("anauthorized request", 401)
      );
    }
    const users = await User.find({ role: "user" }).select(
      "-password -__v"
    );

    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    return next(
      new AppError(
        error.message || "something went wrong",
        500
      )
    );
  }
};

// const getUserDetails = async (req, res, next) => {
//   try {
//     const { token } = req.cookies;
//     if (!token)
//       return next(new AppError("unauthorized requst", 401));

//     const { userId } = req.body;
//     if (!userId)
//       return next(new AppError("no user found", 404));
//     const decode = jwt.verify(token, JWT_SECRET_KEY);
//     if (decode.role !== "admin")
//       return next(new AppError("unauthorized requst", 401));
//     const user = await User.findById(userId);
//     return res.status(200).json({
//       success:true,

//     })
//   } catch (error) {
//     return next(
//       new AppError(error.message || "something went wrong")
//     );
//   }
// };

export { getOrders, getCustomers };
