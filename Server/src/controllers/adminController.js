import { JWT_SECRET_KEY } from "../config/envConfig.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
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

const changeOrderStatus = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    const { orderId, orderStatus } = req.body;
    console.log(orderStatus);
    if (!token)
      return next(new AppError("unauthorized requst", 401));
    if (
      !orderId ||
      !orderStatus ||
      typeof orderStatus !== "string"
    )
      return next(new AppError("no order found", 404));
    const decode = jwt.verify(token, JWT_SECRET_KEY);
    if (decode.role !== "admin") {
      return next(
        new AppError("unauthorized request", 401)
      );
    }

    const order = await Order.findByIdAndUpdate(
      orderId,
      {
        status: orderStatus,
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      order: order,
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

const deleteProduct = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    const { productId } = req.body;

    if (!token)
      next(new AppError("unauthorized request", 401));
    if (!productId)
      next(new AppError("no products found ", 404));
    const decode = jwt.verify(token, JWT_SECRET_KEY);
    if (decode.role !== "admin") {
      return next(
        new AppError("forbidden admin only route ", 403)
      );
    }

    const deleteProduct = await Product.findByIdAndDelete(
      productId
    );
    if (!deleteProduct) {
      return res.status("product not found", 404);
    }
    return res.status(200).json({
      success: true,
      message: "product deleted successfully",
    });
  } catch (error) {
    next(
      new AppError(
        error.message || "something went wrong",
        500
      )
    );
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    const { productId } = req.params;

    const { name, description, price } = req.body;
    const files = req.files;
    const images = files.map((imageData) => imageData.path);

    if (!token) {
      return next(
        new AppError("unauthorized request", 401)
      );
    }
    if (!productId) {
      return next(
        new AppError("cant find the product to delete", 404)
      );
    }

    if (
      !name ||
      !description ||
      !price ||
      !images?.length > 0
    ) {
      return next(
        new AppError("please fill all the fields", 400)
      );
    }

    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    if (decoded.role !== "admin") {
      return next(new AppError("admin only route", 403));
    }
    const updateData = {};
    if (name) updateData.name = name;
    if (description) updateData.description = description;
    if (price) updateData.price = price;
    if (images && images.length > 0)
      updateData.images = images;

    const product = await Product.findByIdAndUpdate(
      productId,
      updateData,
      { new: true }
    );

    if (!product) {
      return next(
        new AppError("cant find the product to update", 404)
      );
    }
    return res.status(200).json({
      success: true,
      message: "product updated successfully",
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

const deleteCustomer = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    const { customerId } = req.params;

    if (!token || !customerId) {
      return next(
        new AppError("unauthorized request", 401)
      );
    }
    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    if (decoded.role !== "admin") {
      return next(new AppError("bad gatway", 403));
    }
    const deleteCustomer = await User.findByIdAndDelete(
      customerId
    );
    if (!deleteCustomer) {
      return next(new AppError("no user found", 404));
    }
    return res.status(200).json({
      success: true,
      message: "customer deleted successfully",
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

export {
  updateProduct,
  getOrders,
  getCustomers,
  changeOrderStatus,
  deleteProduct,
  deleteCustomer,
};
