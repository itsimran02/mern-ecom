import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minLength: 3,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      "Invalid email",
    ],
  },
  password: {
    type: String,
    required: true,
    minLength: 3,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  cartItems: {
    type: [String],
    default: [],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("User", UserSchema);
