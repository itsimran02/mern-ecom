import express from "express";
import handleStripWebhook from "../controllers/webHookController.js";

const router = express.Router();

router.post(
  "/stripe-webhook",
  express.raw({ type: "application/json" }),
  handleStripWebhook
);

export default router;
