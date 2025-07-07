import asyncHandler from "../utils/AsyncHandler.js";
import mongoose from "mongoose";
import UserModel from "../models/user.model.js";
import ProductModel from "../models/product.model.js";
import CartProductModel from "../models/cartproduct.model.js";

// Add to Cart
const addToCart = asyncHandler(async (req, res) => {
  const { productId, quantity } = req.body;
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

  let cartItem = await CartProductModel.findOne({ user: userId, productId });

  if (!cartItem) {
    cartItem = new CartProductModel({
      userId: userId,
      productId: productId,
      quantity: qty,
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

// get cart
const getCart = asyncHandler(async (req, res) => {
  const cart = await CartProductModel.find({ userId: req.user.id }).populate(
    "productId"
  );

  res.status(200).json({ success: true, cart });
});

//  update cart
const updateCart = asyncHandler(async (req, res) => {
  const { cartItemId, quantity } = req.body;

  const cartItem = await CartProductModel.findOneAndUpdate(
    { id: cartItemId, user: req.user.id },
    { quantity },
    { new: true }
  );

  if (!cartItem) {
    return res
      .status(404)
      .json({ success: false, message: "Cart item not found" });
  }

  res.status(200).json({ success: true, cartItem });
});

// Delete from Cart
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

export default { addToCart, getCart, updateCart, deleteCart };
