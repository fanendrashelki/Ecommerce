import express from "express";
import userController from "../controllers/user.controller.js";
const router = express.Router();

import upload, { setUploadFolder } from "../middleware/multer.js";
import {
  authMiddleware,
  authorizeRoles,
} from "../middleware/authMiddleware.js";

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/me", authMiddleware, userController.getMyDetail);

router.get(
  "/get-all-User",
  authMiddleware,
  authorizeRoles("Admin"),
  userController.getallUser
);
router.get("/logout", authMiddleware, userController.logout);

router.post("/forgot-password", userController.forgetPassword);
router.post("/verify-otp", userController.VerifyOTP);
router.post("/reset-password", userController.resetPassword);

router.put("/update-profile", authMiddleware, userController.updateProfile);
router.post(
  "/verify-updateEmail-otp",
  authMiddleware,
  userController.verifyEmailOtp
);
router.post(
  "/send-verification-code",
  authMiddleware,
  userController.send_Verification_code
);

router.post(
  "/profile-image",
  setUploadFolder("profile"),
  authMiddleware,
  upload.single("image"),
  userController.userAvatar
);

export default router;
