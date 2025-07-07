import express from "express";

import CartController from "../controllers/cart.controller.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// create
router.post("/add", authMiddleware, CartController.addToCart);
router.get("/get", authMiddleware, CartController.getCart);
router.put("/update", authMiddleware, CartController.updateCart);
router.delete("/remove/:id", authMiddleware, CartController.deleteCart);

export default router;
