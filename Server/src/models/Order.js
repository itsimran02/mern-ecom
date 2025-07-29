import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userName: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  email: {
    type: String,
  },
  products: [Object],
  status: {
    type: String,
    default: "pending",
  },
  amount: {
    type: Number,
  },
  PaymentIntent: String,
  stripeSessionId: {
    type: String,
    unique: true,
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Order", orderSchema);
