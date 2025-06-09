import express from "express";
import {
  addProduct,
  addToCartProduct,
  deleteCartItem,
  getAllCartItems,
  getProduct,
  getProducts,
  searchProducts,
} from "../controllers/productController.js";
import { upload } from "../middlewares/uploadMiddleware.js";

const router = express.Router();

router.get("/", getProducts);
router.post("/", upload.array("images", 3), addProduct);
router.get("/search", searchProducts);
router.post("/getcartitems", getAllCartItems);
router.patch("/addtocart", addToCartProduct);
router.patch("/deletecartitem", deleteCartItem);

router.get("/:id", getProduct);

export default router;
