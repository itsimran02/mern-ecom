import Stripe from "stripe";
import User from "../models/User.js";
import Order from "../models/Order.js";
import {
  STRIPE_KEY,
  WEBHOOK_SECRET,
} from "../config/envConfig.js";
import AppError from "../utils/appError.js";

const stripe = new Stripe(STRIPE_KEY);

const handleStripWebhook = async (req, res, next) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      WEBHOOK_SECRET
    );
  } catch (error) {
    return next(
      new AppError(error.message || "webhook error" || 400)
    );
  }
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    console.log(
      "💰 Payment completed for session:",
      session.id
    );
    try {
      await createOrderFromSession(session);
      console.log("✅ Order created successfully");
    } catch (error) {
      console.error("❌ Error creating order:", error);
      return res
        .status(500)
        .json({ error: "Failed to create order" });
    }
  }

  res.json({ received: true });
};

async function createOrderFromSession(session) {
  try {
    const { userId, userEmail, products, userName } =
      session.metadata;
    console.log(products);
    const parsedProducts = JSON.parse(products);
    const existingOrder = await Order.findOne({
      stripeSessionId: session.id,
    });

    if (existingOrder) {
      console.log("🔄 Order already exists:", session.id);
      return res.status(401).json({
        message: "order already exists",
        order: existingOrder,
      });
    }

    const order = new Order({
      user: userId,
      email: userEmail,
      userName: userName,
      products: [...parsedProducts],
      status: "processing",
      amount: session.amount_total,
      stripeSessionId: session.id,
      PaymentIntent: session.payment_intent,
    });
    console.log(order);
    const savedOrder = await order.save();

    await User.findByIdAndUpdate(userId, {
      $push: { orders: savedOrder._id },
      $set: { cartItems: [] },
    });
    return savedOrder;
  } catch (error) {
    throw error;
  }
}

export default handleStripWebhook;
