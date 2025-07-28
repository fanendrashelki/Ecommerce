import Stripe from "stripe";
import crypto from "crypto";
import OrderModel from "../models/order.model.js";
import CartModel from "../models/cartproduct.model.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createOrder = async (req, res) => {
  try {
    const {
      userId,
      items,
      delivery_address,
      paymentMethod,
      subTotalAmt,
      totalAmt,
      tax,
      Shippingcharge,
    } = req.body;

    if (!userId || !Array.isArray(items) || items.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "User ID and items are required" });
    }

    if (totalAmt <= 0) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid total amount" });
    }

    const orderId = `ORD-${crypto
      .randomBytes(6)
      .toString("hex")
      .toUpperCase()}`;

    const newOrder = await OrderModel.create({
      userId,
      orderId,
      items,
      delivery_address,
      payment_status: "Pending",
      subTotalAmt,
      totalAmt,
      orderStatus: "Pending",
      paymentMethod,
      tax,
      Shippingcharge,
      orderDate: new Date(),
      cancelled: false,
    });

    // Clear the user's cart
    await CartModel.findOneAndDelete({ userId });

    let paymentUrl = null;
    if (paymentMethod !== "Cash on Delivery") {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"], // future: add 'upi', 'netbanking'
        mode: "payment",
        customer_email: newOrder.email,
        customer: undefined, // or create a customer object first if you want
        customer_creation: "always",
        shipping_address_collection: {
          allowed_countries: ["IN"], // can add more if exporting globally
        },
        line_items: items.map((item) => ({
          price_data: {
            currency: "inr",
            product_data: { name: item.name },
            unit_amount: Math.round(item.price * 100),
          },
          quantity: item.quantity,
        })),
        success_url: `${process.env.CLIENT_URL}order-success/${newOrder._id}`,
        cancel_url: `${process.env.CLIENT_URL}checkout`,
        metadata: { orderId: newOrder.orderId, userId: userId.toString() },
      });
      paymentUrl = session.url;
    }

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      order: newOrder,
      paymentUrl,
    });
  } catch (error) {
    console.error("Error creating order:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to create order",
      error: error.message,
    });
  }
};

// Get all orders of a user
export const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await OrderModel.find({ userId })
      .populate("items.productId")
      .populate("delivery_address")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("Error fetching orders:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Get a single order by ID
export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await OrderModel.findById(id)
      .populate("delivery_address")
      .populate("userId")
      .populate("items.productId");

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Order retrieved successfully",
      order,
    });
  } catch (error) {
    console.error("Error fetching order:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Cancel an order
export const cancelOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await OrderModel.findById(id);

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    // Mark order as cancelled
    order.orderStatus = "Cancelled";
    order.cancelled = true;
    await order.save();

    return res.status(200).json({
      success: true,
      message: "Order cancelled successfully",
      order,
    });
  } catch (error) {
    console.error("Error cancelling order:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
