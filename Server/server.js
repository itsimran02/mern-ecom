import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./src/config/db.js";
import authRoutes from "./src/routes/authRoutes.js";
import productRoutes from "./src/routes/ProductRoutes.js";
import errorHandler from "./src/middlewares/errorHandlerMiddleware.js";
import checkoutRoutes from "./src/routes/checkoutRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import webhookroutes from "./src/routes/webhookRoutes.js";

import adminRoutes from "./src/routes/adminRoutes.js";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 5000;
app.use("/api/webhook", webhookroutes);
app.use(express.json());

app.use(cookieParser());

app.use(
  cors({
    origin:
      process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "PUT", "POST", "DELETE", "PATCH"],
    credentials: true,
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
  })
);

// connect db

connectDB();

// routes

app.use("/api/auth", authRoutes);

app.use("/api/products", productRoutes);

app.use("/api", checkoutRoutes);

app.use("/api/user", userRoutes);

app.use("/api/admin", adminRoutes);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`server is running at port ${PORT}`);
});
