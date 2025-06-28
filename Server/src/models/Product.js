import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  subCategory: {
    type: String,
  },
  brand: { type: String },
  colors: [String],
  sizes: [String],
  images: [String],
  InStock: {
    type: Boolean,
    default: true,
  },
  rating: { type: Number, default: 0 },
  numReviews: {
    type: Number,
    default: 0,
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Product", ProductSchema);
