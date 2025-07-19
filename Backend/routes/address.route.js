import { authMiddleware } from "../middleware/authMiddleware.js";

import AddressController from "../controllers/Address.Controller.js";
import express from "express";

const router = express.Router();

// Create Address
router.post("/", authMiddleware, AddressController.addAddress);

// Get all addresses of a user
router.get("/user/:userId", authMiddleware, AddressController.getAddress);

// Update Address
router.put("/:id", authMiddleware, AddressController.UpdateAddress);

// Delete (soft delete by status = false)
router.delete("/:id", authMiddleware, AddressController.deleteAddress);

export default router;
