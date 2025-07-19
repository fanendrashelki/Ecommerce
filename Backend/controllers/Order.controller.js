import OrderModel from "../models/order.model.js";
import crypto from "crypto";

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

    const newOrder = new OrderModel({
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
      orderDate: new Date(), // add orderDate if your schema requires it
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

export const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await OrderModel.find({ userId })
      .populate("items.productId")
      .populate("delivery_address");

    return res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getOrderById = async (req, res) => {
  const { id } = req.params;

  const order = await OrderModel.findById(id)
    .populate("delivery_address")
    .populate("userId");

  if (!order) {
    return res.status(404).json({ success: false, message: "Order not found" });
  }
  res.status(200).json({
    message: "Order ",
    success: true,
    order,
  });
};
