import OrderModel from "../models/order.model.js";
import crypto from "crypto";

// Create a new order
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

    if (!userId || !items || !Array.isArray(items) || items.length === 0) {
      return res
        .status(400)
        .json({ message: "User ID and items are required" });
    }

    // Generate unique order ID
    const orderId = `ORD-${crypto
      .randomBytes(6)
      .toString("hex")
      .toUpperCase()}`;

    // Create new order (deliveryDate auto-calculated in model)
    const newOrder = new OrderModel({
      userId,
      orderId,
      items,
      delivery_address,
      payment_status: "Pending",
      subTotalAmt,
      totalAmt,
      orderStatus: "Pending", // enum handled by schema
      paymentMethod,
      tax,
      Shippingcharge,
      orderDate: new Date(), // required for deliveryDate calculation
      cancelled: false, // default
    });

    await newOrder.save();

    return res.status(201).json({
      success: true,
      message: "Order created successfully",
      order: newOrder,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
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
