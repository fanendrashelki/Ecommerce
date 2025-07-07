import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// Optional: Avoid Mongoose deprecation warning
mongoose.set("strictQuery", true);

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGOURL);

    console.log("✅ MongoDB connected successfully.");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1);
  }
}

export default connectDB;
