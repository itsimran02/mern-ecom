import Stripe from "stripe";
import AppError from "../utils/appError.js";
import {
  FRONTEND_URL,
  STRIPE_KEY,
} from "../config/envConfig.js";
const stripe = new Stripe(STRIPE_KEY);

const BASE_FRONTEND_URL = FRONTEND_URL;

const checkout = async (req, res, next) => {
  try {
    const { products } = req.body;
    if (!products || !Array.isArray(products))
      return next(new AppError("no items found", 404));
    const lineItems = products.map((product) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: product.name,
          images: [product.images[0]],
        },
        unit_amount: Math.ceil(product.price * 100),
      },
      quantity: product.quantity || 1,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${BASE_FRONTEND_URL}/shop/payment-successfull`,
      cancel_url: `${BASE_FRONTEND_URL}/shop/payment-failed`,
    });
    res.status(200).json({
      success: true,
      id: session.id,
    });
  } catch (error) {
    next(
      new AppError(
        error.message || "something went wrong",
        500
      )
    );
  }
};

export default checkout;
