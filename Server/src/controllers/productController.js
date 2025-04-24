import Product from "../models/Product.js";
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

export { getProducts, addProduct };
