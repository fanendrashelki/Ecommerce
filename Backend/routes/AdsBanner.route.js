import express from "express";

import AdsBannerController from "../controllers/AdsBanner.Controller.js";
import upload, { setUploadFolder } from "../middleware/multer.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/",
  setUploadFolder("Adsbanner"),
  upload.single("banner"),
  authMiddleware,
  AdsBannerController.addBanner
);

router.put(
  "/:id",
  setUploadFolder("Adsbanner"),
  upload.single("banner"),
  authMiddleware,
  AdsBannerController.updateBanner
);

router.delete("/:id", authMiddleware, AdsBannerController.deleteBanner);
router.get("/", AdsBannerController.getBanner);
export default router;
