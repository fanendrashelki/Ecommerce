import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import asyncHandler from "../utils/AsyncHandler.js";
import ErrorHandle from "../utils/ErrorHandler.js";
import getToken from "../utils/getToken.js";
import sendMail from "../utils/sendMail.js";
import generateOtp from "../utils/generateOtp.js";
import { setAuthCookies } from "../utils/setAuthCookies.js";
import { cloudinary } from "../config/cloudinary.js";

//=======================REGISTER===========================
const register = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      message: "All fields are required",
      error: true,
      success: false,
    });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new ErrorHandle("User already exists", 400));
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    email,
    name,
    password: hashedPassword,
  });

  await user.save();
  const otp = generateOtp();
  const otp_expiry = Date.now() + process.env.OTP_EXPIRY_MINUTES * 60 * 1000;

  const UpdateOTP = await User.updateOne(
    { _id: user._id },
    { otp, otp_expiry }
  );



  await sendMail({
    name: user.name,
    email: user.email,
    otp: otp,
    otpExpireTime: process.env.OTP_EXPIRY_MINUTES,
    type: "verifyEmail",
  });

  res.status(201).json({
    message: "User registered",
    error: false,
    success: true,
  });
});

//=======================LOGIN===========================
const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "All fields are required",
      error: true,
      success: false,
    });
  }

  const existingUser = await User.findOne({ email });

  if (!existingUser) {
    return next(new ErrorHandle("Invalid credentials", 400));
  }
  if (!existingUser.password) {
    return next(new ErrorHandle("This account was created using Google Login. Please continue with Google to sign in.", 400));
  }

  const isMatch = await bcrypt.compare(password, existingUser.password);
  if (!isMatch) {
    return next(new ErrorHandle("Invalid credentials", 401));
  }

  const token = getToken.generateToken(existingUser);

  await User.updateOne(
    { _id: existingUser.id },
    { last_login_date: new Date() }
  );

  // Set cookie
  setAuthCookies(res, token);

  res.status(200).json({
    message: `${existingUser.role === "Admin" ? "Admin" : "User"
      } logged in successfully`,
    error: false,
    success: true,

    token,
    user: {
      role: existingUser.role,
    },
  });
});

//=======================getMyDetail===========================
const getMyDetail = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("-password");

  res.status(201).json({
    error: false,
    success: true,
    user,
  });
});
//=======================LOGOUT===========================
const logout = asyncHandler(async (req, res) => {
  // Safely get the token from cookie or Authorization header
  const token =
    req.cookies.token ||
    (req.headers.authorization
      ? req.headers.authorization.split(" ")[1]
      : null);

  if (token) {
    try {
      // Optionally: Remove refresh token from DB here if you store it
    } catch (error) {
      console.error("Error clearing token:", error);
      // Don't block logout if token clearing fails
    }
  }

  // Clear cookies - cookie names are case sensitive, so "token" instead of "Token"
  res.clearCookie("Token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
  });

  res.status(200).json({ message: "Logged out successfully" });
});

//=======================FORGOT PASSWORD===========================
const forgetPassword = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) return next(new ErrorHandle("User not found", 404));

  const otp = generateOtp();
  const otp_expiry = Date.now() + process.env.OTP_EXPIRY_MINUTES * 60 * 1000;

  const UpdateOTP = await User.updateOne(
    { _id: user._id },
    { otp, otp_expiry }
  );

  await sendMail({
    name: user.name,
    email: user.email,
    otp: otp,
    otpExpireTime: process.env.OTP_EXPIRY_MINUTES,
    type: "forgetpassword",
  });
  res.json({ message: "OTP sent to email" });
});

//=======================  forget password  Verify OTP ===========================

const VerifyOTP = asyncHandler(async (req, res, next) => {
  const { email, otp, type } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: "Email and OTP are required" });
  }
  const user = await User.findOne({ email: email });
  if (!user) return next(new ErrorHandle("User not found", 404));

  if (!user.otp || !user.otp_expiry || user.otp !== otp) {
    return next(new ErrorHandle("Invalid OTP", 400));
  }
  if (user.otp_expiry < Date.now()) {
    return next(new ErrorHandle("OTP has expired", 400));
  }
  if (type === "emailVerify") {
    user.verify_email = true;
    user.otp = "";
    user.otp_expiry = "";
    await user.save();
  }

  const token = getToken.generateToken(user);

  res.status(200).json({
    message: "OTP verified successfully",
    token,
  });
});

//=======================Reset Password===========================

const resetPassword = asyncHandler(async (req, res, next) => {
  const { email, newPassword, confirmPassword } = req.body;

  // Step 1: Validate required fields
  if (!email || !newPassword || !confirmPassword) {
    return next(
      new ErrorHandle(
        "Email, new password, and confirm password are required",
        400
      )
    );
  }

  // Step 2: Check if new passwords match
  if (newPassword !== confirmPassword) {
    return next(
      new ErrorHandle("New password and confirm password do not match", 400)
    );
  }

  // Step 3: Check if user exists
  const user = await User.findOne({ email });
  if (!user) return next(new ErrorHandle("User not found", 404));

  // Step 4: Check OTP verification time (expiry check)
  const otpVerifiedAt = user.otpVerifiedAt;
  const isExpired =
    !otpVerifiedAt ||
    Date.now() - new Date(otpVerifiedAt).getTime() >
    process.env.OTP_EXPIRY_MINUTES * 60 * 1000;

  if (!isExpired) {
    return next(
      new ErrorHandle("OTP verification expired. Please verify OTP again.", 403)
    );
  }

  // Step 5: Hash new password
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  // Step 6: Update user password and clear OTP verification timestamp
  user.password = hashedPassword;
  user.otpVerifiedAt = null;
  user.otp = "";
  user.otp_expiry = "";
  await user.save();

  return res.status(200).json({ message: "Password reset successful" });
});

//======================= update Profile ===========================

const updateProfile = asyncHandler(async (req, res, next) => {
  const { name, email, mobile } = req.body;
  const userId = req.user.id;
  const user = await User.findById(userId);

  if (!user) return next(new ErrorHandle("User not found", 404));

  let isUpdated = false;

  // Update name
  if (name && name !== user.name) {
    user.name = name;
    isUpdated = true;
  }

  // Update mobile
  if (mobile && mobile !== user.mobile) {
    user.mobile = mobile;
    isUpdated = true;
  }

  if (!isUpdated) {
    return res
      .status(400)
      .json({ message: "No changes detected", success: false });
  }

  await user.save();

  res.status(200).json({
    message: "Profile updated successfully",
    success: true,
  });
});

//======================= verify Email Otp ===========================

const verifyEmailOtp = asyncHandler(async (req, res, next) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return next(new ErrorHandle("Email and OTP are required", 400));
  }

  // Try to find user by current or pending email
  const user = await User.findOne(email);
  if (!user) return next(new ErrorHandle("User not found", 404));

  if (!user.otp || !user.otp_expiry || user.otp !== otp) {
    return next(new ErrorHandle("Invalid OTP", 400));
  }

  if (user.otp_expiry < Date.now()) {
    return next(new ErrorHandle("OTP has expired", 400));
  }

  // Clear OTP fields after successful verification
  user.otp = "";
  user.otp_expiry = "";

  await user.save();

  res.status(200).json({
    message: "Email verified successfully",
    updatedEmail: user.email,
  });
});

//======================= send email Verification code ===========================

const send_Verification_code = asyncHandler(async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return next(new ErrorHandle("User not found", 404));

  const otp = generateOtp();
  const otp_expiry = Date.now() + process.env.OTP_EXPIRY_MINUTES * 60 * 1000;

  const UpdateOTP = await User.updateOne(
    { _id: user._id },
    { otp, otp_expiry }
  );

  await sendMail({
    name: user.name,
    email: user.email,
    otp: otp,
    otpExpireTime: process.env.OTP_EXPIRY_MINUTES,
    type: "verifyEmail",
  });
  res.json({ message: "OTP sent to email" });
});

//======================= User Avatar ===========================

const userAvatar = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;

  if (!req.file || !req.file.path || !req.file.filename) {
    return next(new ErrorHandle("No file uploaded", 400));
  }

  const imageUrl = req.file.path; // Cloudinary URL
  const publicId = req.file.filename;

  const user = await User.findById(userId);

  if (!user) {
    return next(new ErrorHandle("User not found", 404));
  }

  // 🧹 Optional: Delete old Cloudinary image using stored public_id

  if (user.avatarPublicId) {
    try {
      await cloudinary.uploader.destroy(user.avatarPublicId);
    } catch (err) {
      console.error("Error deleting old image:", err);
    }
  }

  // 💾 Update user with new image
  user.avatar = imageUrl;
  user.avatarPublicId = publicId;
  await user.save();

  res.status(200).json({
    error: false,
    success: true,
    message: "Image uploaded successfully",
    imageUrl: user.avatar,
  });
});

//=======================getMyDetail===========================
const getallUser = asyncHandler(async (req, res, next) => {
  const user = await User.find().select("-password");

  res.status(201).json({
    error: false,
    success: true,
    user,
  });
});

export default {
  register,
  login,
  getMyDetail,
  logout,
  forgetPassword,
  VerifyOTP,
  resetPassword,
  updateProfile,
  verifyEmailOtp,
  send_Verification_code,
  userAvatar,
  getallUser,
};
