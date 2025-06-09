import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./src/config/db.js";
import authRoutes from "./src/routes/authRoutes.js";
import productRoutes from "./src/routes/ProductRoutes.js";
import errorHandler from "./src/middlewares/errorHandlerMiddleware.js";
import checkoutRoutes from "./src/routes/checkoutRoutes.js";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 5000;

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

// app.post("/api/stripe-checkout", async (req, res, next) => {
//   const { products } = req.body;

//   const lineItems = products.map((product) => ({
//     price_data: {
//       currency: "inr",
//       product_data: {
//         name: product.name,
//         images: [product.images[0]],
//       },
//       unit_amount: Math.ceil(product.price * 100),
//     },
//     quantity: product.quantity || 1,
//   }));

//   const session = await stripe.checkout.sessions.create({
//     payment_method_types: ["card"],
//     line_items: lineItems,
//     mode: "payment",
//     success_url:
//       "http://localhost:5173/shop/payment-successfull",
//     cancel_url: "http://localhost:5173/shop/payment-failed",
//   });
//   res.json({ id: session.id });
// });

// start app server

// all route error midd

app.use("/api", checkoutRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`server is running at port ${PORT}`);
});
