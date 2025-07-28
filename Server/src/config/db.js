import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGO_URL);
    console.log("db is connected");
  } catch {
    console.log("error connecting db");
  }
};

export default connectDB;
