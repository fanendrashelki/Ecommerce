import express from "express";

import HomeBannerController from "../controllers/HomeBanner.controller.js";
import upload, { setUploadFolder } from "../middleware/multer.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/",
  setUploadFolder("banner"),
  upload.single("banner"),
  authMiddleware,
  HomeBannerController.addBanner
);

router.put(
  "/:id",
  setUploadFolder("banner"),
  upload.single("banner"),
  authMiddleware,
  HomeBannerController.updateBanner
);

router.delete("/:id", authMiddleware, HomeBannerController.deleteBanner);
router.get("/", HomeBannerController.getBanner);
export default router;
