import express from "express";
import {
  changeOrderStatus,
  deleteCustomer,
  deleteProduct,
  getCustomers,
  getOrders,
  updateProduct,
} from "../controllers/adminController.js";
import { upload } from "../middlewares/uploadMiddleware.js";

const router = express.Router();

router.post("/orders", getOrders);
router.post("/customers", getCustomers);
router.delete(
  "/customers/deletecustomer/:customerId",
  deleteCustomer
);

router.patch("/changestatus", changeOrderStatus);
router.delete("/deleteproduct", deleteProduct);
router.patch(
  "/updateproduct/:productId",
  upload.array("images", 3),
  updateProduct
);

export default router;
