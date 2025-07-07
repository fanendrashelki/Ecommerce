import asyncHandler from "../utils/AsyncHandler.js";
import UserModel from "../models/user.model.js";
import ProductModel from "../models/product.model.js";

// add To Wishlist
const addToWishlist = asyncHandler(async (req, res) => {
  const { productId } = req.body;

  const user = await UserModel.findById(req.user.id);

  if (!user.wishlist.includes(productId)) {
    user.wishlist.push(productId);
    await user.save();
    return res
      .status(200)
      .json({ success: true, message: "Added to wishlist" });
  }

  res
    .status(400)
    .json({ success: false, message: "Product already in wishlist" });
});

//  Get Wishlist
const getWishlist = asyncHandler(async (req, res) => {
  const user = await UserModel.findById(req.user.id).populate("wishlist");
  res.status(200).json({ success: true, wishlist: user.wishlist });
});

// ✅ Remove from Wishlist
const removeFromWishlist = asyncHandler(async (req, res) => {
  const { id } = req.params;

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
  });
});

// ✅ Clear Wishlist
const clearWishlist = asyncHandler(async (req, res) => {
  const user = await UserModel.findByIdAndUpdate(
    req.user.id,
    { $set: { wishlist: [] } },
    { new: true }
  );
  res.status(200).json({ success: true, message: "Wishlist cleared" });
});
export default {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
  clearWishlist,
};
