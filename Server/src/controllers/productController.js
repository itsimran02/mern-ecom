import Product from "../models/Product.js";
import User from "../models/User.js";
import AppError from "../utils/appError.js";
import productSchemaValidator from "../validators/productValidator.js";

const getProducts = async (req, res, next) => {
  try {
    const {
      category,
      brand,
      minPrice,
      maxPrice,
      colors,
      page = 1,
      limit = 12,
      sort = "createdAt_desc",
    } = req.query;

    const filter = {};

    if (category) filter.category = category;
    if (brand) filter.brand = brand;
    if (colors)
      filter.colors = {
        $in: colors.split(","),
      };

    if (minPrice || maxPrice) {
      filter.price = {};

      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const [sortField, sortDirection] = sort.split("_");

    const sortOptions = {
      [sortField]: sortDirection === "desc" ? -1 : 1,
    };

    const [products, total] = await Promise.all([
      Product.find(filter)
        .sort(sortOptions)
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec(),
      Product.countDocuments(filter).exec(),
    ]);

    const totalPages = Math.ceil(total / limit);

    if (total === 0) {
      const err = new AppError("No products found", 404);

      return next(err);
    }

    const hasNext = page < totalPages;
    const hasPrev = page > 1;

    res.status(200).json({
      products,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages,
        hasNext,
        hasPrev,
      },
    });
  } catch (error) {
    const err = new AppError(
      error.message || "something went wrong",
      500
    );
    return next(err);
  }
};

const addProduct = async (req, res, next) => {
  try {
    const { error } = productSchemaValidator.validate(
      req.body
    );
    if (error) {
      const err = new AppError(
        error?.message || "something weny wrong",
        400
      );
      return next(err);
    }

    if (!req.files || req.files.length === 0) {
      const err = new AppError(
        "please add atleast one image",
        400
      );
      return next(err);
    }

    const imageLinks = req.files.map((file) => file.path);
    const product = new Product({
      ...req.body,
      images: imageLinks,
    });

    const savedProduct = await product.save();
    return res.status(201).json({
      success: true,
      savedProduct,
    });
  } catch (error) {
    const err = new AppError(
      error.message || "something went wrong",
      500
    );
    return next(err);
  }
};

const getProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return next(
        new AppError("Product ID is required", 400)
      );
    }

    const product = await Product.findById(id);
    if (!product) {
      return next(new AppError("Product not found", 404));
    }

    return res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    return next(
      new AppError(
        error.message || "Something went wrong",
        500
      )
    );
  }
};

const searchProducts = async (req, res, next) => {
  try {
    const {
      keyword,
      category,
      brand,
      minPrice,
      maxPrice,
      page = 1,
      limit = 12,
    } = req.query;

    if (!keyword) {
      return next(
        new AppError("Search keyword is required", 400)
      );
    }

    const filters = {};
    if (category) filters.category = category;
    if (brand) filters.brand = brand;

    if (minPrice || maxPrice) {
      filters.price = {}; // ✅ initialize this object first

      if (minPrice) filters.price.$gte = Number(minPrice);
      if (maxPrice) filters.price.$lte = Number(maxPrice);
    }

    const regx = new RegExp(keyword, "i");

    const query = {
      $and: [
        {
          $or: [
            { name: regx },
            { category: regx },
            { subCategory: regx },
          ],
        },

        ...(Object.keys(filters).length > 0
          ? [filters]
          : []),
      ],
    };

    const [products, total] = await Promise.all([
      Product.find(query)
        .limit(Number(limit))
        .skip((Number(page) - 1) * Number(limit))
        .exec(),
      Product.countDocuments(query),
    ]);

    if (total === 0) {
      return next(new AppError("No products found", 404));
    }

    const totalPages = Math.ceil(total / limit);
    const hasNext = page < totalPages;
    const hasPrev = page > 1;

    return res.status(200).json({
      success: true,
      data: products,
      pagination: {
        total,
        totalPages,
        limit: Number(limit),
        page: Number(page),
        hasNext,
        hasPrev,
      },
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

const addToCartProduct = async (req, res, next) => {
  try {
    const { productId, userId } = req.body;

    const findProductById = await Product.findById(
      productId
    );
    if (!findProductById) {
      return next(
        new AppError(
          "Can't add this product to the cart",
          400
        )
      );
    }

    const findUser = await User.findById(userId);
    if (!findUser) {
      return next(new AppError("User not found", 404));
    }

    if (!findUser.cartItems.includes(productId)) {
      findUser.cartItems.push(productId);
      await findUser.save();
    } else {
      return next(
        new AppError("Product is already in your cart", 400)
      );
    }

    const updatedCart = await Product.find({
      _id: { $in: findUser.cartItems },
    });

    return res.status(200).json({
      success: true,
      message: "Product added to the cart",
      updatedCart: updatedCart || [],
    });
  } catch (error) {
    next(
      new AppError(
        error.message || "Something went wrong",
        500
      )
    );
  }
};

const getAllCartItems = async (req, res, next) => {
  try {
    const { cartItems } = req.body;
    if (!Array.isArray(cartItems) || cartItems.length === 0)
      return next(new AppError("cart is empty", 401));
    const getItems = await Product.find({
      _id: {
        $in: cartItems,
      },
    });
    if (!getItems)
      return next(
        new AppError("something went wrong", 404)
      );

    return res.status(200).json({
      success: true,
      cartItems: getItems,
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
const deleteCartItem = async (req, res, next) => {
  try {
    const { productId, userId } = req.body;
    console.log(productId);
    if (
      !productId ||
      typeof productId !== "string" ||
      !userId ||
      typeof userId !== "string"
    ) {
      return next(
        new AppError("Invalid product ID or user ID", 400)
      );
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $pull: { cartItems: productId } },
      { new: true }
    );

    if (!updatedUser) {
      return next(new AppError("User not found", 404));
    }

    const updatedCart = await Product.find({
      _id: { $in: updatedUser.cartItems },
    });

    return res.status(200).json({
      success: true,
      message: "Product removed from cart successfully",
      updatedCart,
    });
  } catch (error) {
    next(
      new AppError(
        error.message ||
          "Failed to remove product from cart",
        500
      )
    );
  }
};

export {
  getProducts,
  addProduct,
  getProduct,
  searchProducts,
  addToCartProduct,
  getAllCartItems,
  deleteCartItem,
};
