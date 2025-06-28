import express from "express";
import { userLogOut } from "../controllers/userController.js";

const router = express.Router();

router.post("/logout", userLogOut);

export default router;
