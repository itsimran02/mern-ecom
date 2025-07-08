import express from "express";
import {
  changeOrderStatus,
  deleteProduct,
  getCustomers,
  getOrders,
  updateProduct,
} from "../controllers/adminController.js";
import { upload } from "../middlewares/uploadMiddleware.js";

const router = express.Router();

router.post("/getorders", getOrders);
router.post("/getcustomers", getCustomers);
router.patch("/changestatus", changeOrderStatus);
router.delete("/deleteproduct", deleteProduct);
router.patch(
  "/updateproduct/:productId",
  upload.array("images", 3),
  updateProduct
);

export default router;
