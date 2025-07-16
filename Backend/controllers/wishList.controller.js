import asyncHandler from "../utils/AsyncHandler.js";
import UserModel from "../models/user.model.js";
import ProductModel from "../models/product.model.js";

// ✅ Add to Wishlist
const addToWishlist = asyncHandler(async (req, res) => {
  const { productId } = req.body;

  // Check if product exists
  const product = await ProductModel.findById(productId);
  if (!product) {
    return res
      .status(404)
      .json({ success: false, message: "Product not found" });
  }

  // Use $addToSet to avoid duplicates
  const user = await UserModel.findByIdAndUpdate(
    req.user.id,
    { $addToSet: { wishlist: productId } },
    { new: true }
  );

  res.status(200).json({ success: true, message: "Added to wishlist" });
});

// ✅ Get Wishlist
const getWishlist = asyncHandler(async (req, res) => {
  const user = await UserModel.findById(req.user.id).populate("wishlist");

  res.status(200).json({
    success: true,
    wishlist: user.wishlist,
    count: user.wishlist.length,
  });
});

// ✅ Remove from Wishlist
const removeFromWishlist = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Validate ObjectId format
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid Product ID" });
  }

  const user = await UserModel.findByIdAndUpdate(
    req.user.id,
    { $pull: { wishlist: id } },
    { new: true }
  ).populate("wishlist");

  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  res.status(200).json({
    success: true,
    message: "Removed from wishlist",
    wishlist: user.wishlist,
    count: user.wishlist.length,
  });
});

// ✅ Clear Wishlist
const clearWishlist = asyncHandler(async (req, res) => {
  const user = await UserModel.findByIdAndUpdate(
    req.user.id,
    { $set: { wishlist: [] } },
    { new: true }
  );

  res.status(200).json({
    success: true,
    message: "Wishlist cleared",
  });
});

export default {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
  clearWishlist,
};
