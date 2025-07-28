import express from "express";
import {
  createOrder,
  getAllOrders,
  getUserOrders,
  getOrderById,
  ChangeOrderStatus,
  cancelOrder,
} from "../controllers/Order.controller.js";

import { authMiddleware } from "../middleware/authMiddleware.js";
const router = express.Router();

// Create a new order
router.post("/", authMiddleware, createOrder);

// all order admin
router.get("/", authMiddleware, getAllOrders);
// Get all orders for a user
router.get("/:userId", authMiddleware, getUserOrders);

// Get  orders by id
router.get("/orderId/:id", authMiddleware, getOrderById);

router.put("/changeStatus/:id", authMiddleware, ChangeOrderStatus);
router.put("/cancelled/:id", authMiddleware, cancelOrder);

export default router;
