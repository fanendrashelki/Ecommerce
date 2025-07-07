import express, { response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import connectDB from "./config/connectDb.js";
import userRoute from "./routes/User.route.js";
import categoryRoutes from "./routes/Categoty.route.js";
import productRoutes from "./routes/Product.route.js";
import cartRoutes from "./routes/Cart.route.js";
import wishlistRoutes from "./routes/wishList.route.js";
import bannerRoutes from "./routes/Banner.route.js";
import adsbannerRoutes from "./routes/AdsBanner.route.js";
import ErrorMiddleware from "./middleware/ErrorHandlerMIddleware.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
// app.options("*", cors());
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(helmet({ crossOriginResourcePolicy: false }));

app.use("/api/user", userRoute);
app.use("/api/categories", categoryRoutes);
app.use("/api/product", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/banner", bannerRoutes);
app.use("/api/adsbanner", adsbannerRoutes);

app.use(ErrorMiddleware);
const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect to DB. Server not started.", err);
  });
