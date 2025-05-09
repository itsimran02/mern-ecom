import express from "express";
import {
  addProduct,
  getProduct,
  getProducts,
  searchProducts,
} from "../controllers/productController.js";
import { upload } from "../middlewares/uploadMiddleware.js";

const router = express.Router();

router.get("/", getProducts);
router.post("/", upload.array("images", 3), addProduct);
router.get("/search", searchProducts);
router.get("/:id", getProduct);

export default router;
