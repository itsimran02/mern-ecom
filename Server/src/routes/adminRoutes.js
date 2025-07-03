import express from "express";
import {
  changeOrderStatus,
  getCustomers,
  getOrders,
} from "../controllers/adminController.js";

const router = express.Router();

router.post("/getorders", getOrders);
router.post("/getcustomers", getCustomers);
router.patch("/changestatus", changeOrderStatus);

export default router;
