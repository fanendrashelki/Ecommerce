import asyncHandler from "../utils/AsyncHandler.js";
import AdsBanner from "../models/AdsBanner.js";

import ErrorHandle from "../utils/ErrorHandler.js";
import { cloudinary } from "../config/cloudinary.js";

// Add Banner
const addBanner = asyncHandler(async (req, res, next) => {
  console.log(req.file);

  if (!req.file || !req.file.path || !req.file.filename) {
    return next(new ErrorHandle("No file uploaded", 400));
  }
  const active = req.body.active === "true" || req.body.active === true;
  const bannerUrl = req.file.path;
  const bannerPublicId = req.file.filename;

  const newBanner = new AdsBanner({
    banner: bannerUrl,
    bannerPublicId,
    active: active,
  });

  const savedBanner = await newBanner.save();

  res.status(200).json({
    error: false,
    success: true,
    message: "Add Banner successfully",
    image: savedBanner,
  });
});

// updatev Banner
const updateBanner = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { active } = req.body;

  const banner = await AdsBanner.findById(id);
  if (!banner) {
    return res.status(404).json({ message: "Banner not found" });
  }

  // If a new file is uploaded, replace the old one
  if (req.file) {
    // Delete old file from Cloudinary/local if needed
    if (banner.bannerPublicId) {
      await cloudinary.uploader.destroy(banner.bannerPublicId);
    }
    banner.banner = req.file.path;
    banner.bannerPublicId = req.file.filename;
  }

  // Always update the active status
  banner.active = active;

  await banner.save();
  res.status(200).json({ message: "Banner updated successfully" });
});

// delete banner
const deleteBanner = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  // 1. Check if banner exists
  const banner = await AdsBanner.findById(id);
  if (!banner) {
    return next(new ErrorHandle("Banner not found", 404));
  }

  // 2. Delete image from Cloudinary if it exists
  if (banner.bannerPublicId) {
    try {
      await cloudinary.uploader.destroy(banner.bannerPublicId);
    } catch (err) {
      console.error("Cloudinary image deletion error:", err);
      // Optional: return next(new ErrorHandle("Failed to delete image from Cloudinary", 500));
    }
  }

  // 3. Delete from DB
  await banner.deleteOne();

  // 4. Respond success
  res.status(200).json({
    success: true,
    message: "Banner deleted successfully",
  });
});

const getBanner = asyncHandler(async (req, res, next) => {
  const banner = await AdsBanner.find().sort({ _id: -1 });
  if (banner.length === 0) {
    return next(new ErrorHandle("No banner found", 404));
  }
  res.status(200).json({
    success: true,
    banner,
  });
});
export default { addBanner, updateBanner, deleteBanner, getBanner };
