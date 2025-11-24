import express from "express";
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
import addressRoutes from "./routes/address.route.js";
import orderRoutes from "./routes/Order.routes.js";
import authRoute from './routes/authRoute.js'
import OrderModel from "./models/order.model.js"; // adjust path if needed
import "./config/passport.js"
import Stripe from "stripe";
dotenv.config();

const app = express();

// Stripe setup
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

// 1. Stripe webhook MUST come first and use express.raw()
app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    let event;

    try {
      const sig = req.headers["stripe-signature"];
      event = stripe.webhooks.constructEvent(
        req.body, // <-- use req.body here
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.error("Webhook signature verification failed.", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle successful payment
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      const { orderId, userId } = session.metadata;

      // Update order in DB
      await OrderModel.findOneAndUpdate(
        { orderId, userId },
        {
          payment_status: "Paid",
          orderStatus: "Confirmed",
          paymentIntentId: session.payment_intent,
        },
        { new: true }
      );
    }

    res.status(200).json({ received: true });
  }
);

// 2. Now apply other middleware for all remaining routes
app.use(cors());

app.use(cookieParser());
app.use(morgan("dev"));
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(express.json());

// 3. Test route
app.get("/", (req, res) => {
  res.json({ message: "server is running" });
});

// 4. API routes
app.use("/auth", authRoute)
app.use("/api/user", userRoute);
app.use("/api/categories", categoryRoutes);
app.use("/api/product", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/banner", bannerRoutes);
app.use("/api/adsbanner", adsbannerRoutes);
app.use("/api/addresses", addressRoutes);
app.use("/api/orders", orderRoutes);

// 5. Error middleware
app.use(ErrorMiddleware);

// 6. Start server
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
