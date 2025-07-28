import mongoose from "mongoose";
import { MONGO_URI } from "./envConfig.js";

const connectDB = async () => {
  try {
    mongoose.connect(MONGO_URI);
    console.log("db is connected");
  } catch {
    console.log("error connecting db");
  }
};

export default connectDB;
