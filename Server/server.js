import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./src/config/db.js";
import authRoutes from "./src/routes/authRoutes.js";
dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use(cookieParser());

app.use(
  cors({
    origin:
      process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "PUT", "POST", "DELETE"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

// connect db

connectDB();

// routes
app.use("/api/auth", authRoutes);
// start app server

app.listen(PORT, () => {
  console.log(`server is running at port ${PORT}`);
});
