import express from "express";
import {
  checkAuth,
  loginUser,
  registerUser,
} from "../controllers/authController.js";
import { checkAuthMiddleware } from "../middlewares/checkAuth.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/check-auth", checkAuthMiddleware, checkAuth);

export default router;
