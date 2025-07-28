import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    orderId: {
      type: String,
      required: [true, "Provide orderId"],
      unique: true,
    },
    items: [
      {
        productId: { type: mongoose.Schema.ObjectId, ref: "Product" },
        name: String,
        image: String,
        quantity: { type: Number, default: 1 },
        price: { type: Number, default: 0 },
      },
    ],
    paymentId: {
      type: String,
      default: "",
    },
    payment_status: {
      type: String,
      default: "Pending",
    },
    paymentMethod: {
      type: String,
      enum: ["card", "Cash on Delivery"],
      default: "Cash on Delivery",
    },
    delivery_address: {
      type: mongoose.Schema.ObjectId,
      ref: "address",
      required: true,
    },
    subTotalAmt: {
      type: Number,
      default: 0,
    },
    totalAmt: {
      type: Number,
      default: 0,
    },
    tax: {
      type: Number,
      default: 0,
    },
    Shippingcharge: {
      type: Number,
      default: 0,
    },
    invoice_receipt: {
      type: String,
      default: "",
    },
    orderStatus: {
      type: String,
      enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
    },
    orderDate: {
      type: Date,
      default: Date.now,
    },
    deliveryDate: {
      type: Date,
      default: () => {
        const date = new Date();
        date.setDate(date.getDate() + 4);
        return date;
      },
    },
    cancelled: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const OrderModel = mongoose.model("Order", orderSchema);

export default OrderModel;
