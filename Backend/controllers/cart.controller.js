// controllers/cart.controller.js
import asyncHandler from "../utils/AsyncHandler.js";
import mongoose from "mongoose";
import UserModel from "../models/user.model.js";
import ProductModel from "../models/product.model.js";
import CartProductModel from "../models/cartproduct.model.js";

// Add to Cart
const addToCart = asyncHandler(async (req, res) => {
  const { productId, quantity, selectedSize, selectedRam } = req.body;
  const userId = req.user.id;

  if (!productId || !quantity) {
    return res.status(400).json({
      success: false,
      message: "Product ID and quantity are required",
    });
  }

  const qty = Number(quantity);
  if (
    !mongoose.Types.ObjectId.isValid(productId) ||
    !mongoose.Types.ObjectId.isValid(userId) ||
    isNaN(qty) ||
    qty <= 0
  ) {
    return res.status(400).json({ success: false, message: "Invalid input" });
  }

  const existingProduct = await ProductModel.findById(productId);
  if (!existingProduct) {
    return res
      .status(404)
      .json({ success: false, message: "Product not found" });
  }

  // Validate variants if required
  if (existingProduct.size?.length > 0 && !selectedSize) {
    return res
      .status(400)
      .json({ success: false, message: "Please select a size." });
  }

  if (existingProduct.productRam?.length > 0 && !selectedRam) {
    return res
      .status(400)
      .json({ success: false, message: "Please select RAM." });
  }

  // Check if item with same variants already in cart
  let cartItem = await CartProductModel.findOne({
    userId,
    productId,
    selectedSize: selectedSize || null,
    selectedRam: selectedRam || null,
  });

  if (!cartItem) {
    cartItem = new CartProductModel({
      userId,
      productId,
      quantity: qty,
      selectedSize: selectedSize || null,
      selectedRam: selectedRam || null,
    });
    await cartItem.save();

    await UserModel.findByIdAndUpdate(userId, {
      $push: { shopping_cart: cartItem.id },
    });
  } else {
    cartItem.quantity += qty;
    await cartItem.save();
  }

  res.status(200).json({ success: true, cartItem });
});

// Get Cart
const getCart = asyncHandler(async (req, res) => {
  const cart = await CartProductModel.find({ userId: req.user.id }).populate(
    "productId"
  );

  res.status(200).json({ success: true, cart });
});

// Update Cart Quantity
const updateCart = asyncHandler(async (req, res) => {
  const { cartItemId, quantity, selectedSize, selectedRam } = req.body;
  console.log(req.body);

  // Validate cartItemId
  if (!mongoose.Types.ObjectId.isValid(cartItemId)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid cart item ID" });
  }

  // Validate quantity
  if (typeof quantity !== "number" || isNaN(quantity)) {
    return res
      .status(400)
      .json({ success: false, message: "Quantity must be a valid number" });
  }

  // Remove item if quantity < 1
  if (quantity < 1) {
    const deletedItem = await CartProductModel.findOneAndDelete({
      _id: cartItemId,
      userId: req.user.id,
    });

    if (deletedItem) {
      await UserModel.findByIdAndUpdate(req.user.id, {
        $pull: { shopping_cart: cartItemId },
      });

      return res
        .status(200)
        .json({ success: true, message: "Item removed from cart" });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "Cart item not found" });
    }
  }

  // Prepare update fields
  const updateFields = { quantity };
  if (selectedSize !== undefined) updateFields.selectedSize = selectedSize;
  if (selectedRam !== undefined) updateFields.selectedRam = selectedRam;

  // Update cart item
  const cartItem = await CartProductModel.findOneAndUpdate(
    { _id: cartItemId, userId: req.user.id },
    updateFields,
    { new: true }
  );

  if (!cartItem) {
    return res
      .status(404)
      .json({ success: false, message: "Cart item not found" });
  }

  res.status(200).json({ success: true, cartItem });
});
// Delete Cart Item
const deleteCart = asyncHandler(async (req, res) => {
  const { cartItemId } = req.params.id;

  const cartItem = await CartProductModel.findOneAndDelete({
    id: cartItemId,
    userId: req.user.id,
  });

  if (!cartItem) {
    return res
      .status(404)
      .json({ success: false, message: "Cart item not found" });
  }

  await UserModel.findByIdAndUpdate(req.user.id, {
    $pull: { shopping_cart: cartItem.id },
  });

  res.status(200).json({ success: true, message: "Removed from cart" });
});

export default {
  addToCart,
  getCart,
  updateCart,
  deleteCart,
};
