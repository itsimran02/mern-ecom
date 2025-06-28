import express from "express";
import {
  getCustomers,
  getOrders,
} from "../controllers/adminController.js";

const router = express.Router();

router.post("/getorders", getOrders);
router.post("/getcustomers", getCustomers);

export default router;
