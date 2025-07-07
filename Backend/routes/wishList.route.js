import express from "express";
import wishListController from "../controllers/wishList.controller.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add", authMiddleware, wishListController.addToWishlist);
router.get("/", authMiddleware, wishListController.getWishlist);
router.delete(
  "/remove/:id",
  authMiddleware,
  wishListController.removeFromWishlist
);
router.delete("/clear", authMiddleware, wishListController.clearWishlist);

export default router;
