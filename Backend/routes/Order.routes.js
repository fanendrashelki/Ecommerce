import express from "express";
import {
  createOrder,
  getUserOrders,
  getOrderById,
} from "../controllers/Order.controller.js";

import { authMiddleware } from "../middleware/authMiddleware.js";
const router = express.Router();

// Create a new order
router.post("/", authMiddleware, createOrder);

// Get all orders for a user
router.get("/:userId", authMiddleware, getUserOrders);

// Get  orders by id
router.get("/orderId/:id", authMiddleware, getOrderById);

export default router;
