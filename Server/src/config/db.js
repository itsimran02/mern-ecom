import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connect(
      "mongodb+srv://imranphynix:1234@cluster0.itd42.mongodb.net/"
    );
    console.log("db is connected");
  } catch {
    console.log("error connecting db");
  }
};

export default connectDB;
