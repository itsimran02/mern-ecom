import express from "express";
import {
  addProduct,
  getProducts,
} from "../controllers/productController.js";
import { upload } from "../middlewares/uploadMiddleware.js";

const router = express.Router();

router.get("/", getProducts);
router.post("/", upload.array("images", 3), addProduct);

export default router;
