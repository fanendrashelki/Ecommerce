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
import OrderModel from "./models/order.model.js"; // adjust path if needed

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
    const sig = req.headers["stripe-signature"];
    console.log("logs", req.headers);

    let event;

    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
      console.error(`Webhook signature verification failed: ${err.message}`);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle Stripe events
    switch (event.type) {
      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object;
        console.log(`PaymentIntent for ${paymentIntent.amount} succeeded`);

        // Update order in DB using metadata.orderId
        if (paymentIntent.metadata && paymentIntent.metadata.orderId) {
          const orderId = paymentIntent.metadata.orderId;
          try {
            await OrderModel.findByIdAndUpdate(orderId, {
              paymentStatus: "Paid",
              stripePaymentId: paymentIntent.id,
            });
            console.log(`Order ${orderId} marked as Paid`);
          } catch (dbErr) {
            console.error(`Failed to update order ${orderId}:`, dbErr);
          }
        }
        break;
      }

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Send OK to Stripe
    res.sendStatus(200);
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
