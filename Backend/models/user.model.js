import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      // required: [true, "Provide name"],
    },
    email: {
      type: String,
      required: [true, "Provide Email"],
      unique: true,
      lowercase: true,
      trim: true,
      index: true
    },
    googleId: {
      type: String,
      default: null,
    },
    password: {
      type: String,
      select: false,
      // required: [true, "Provide password"],
    },

    pendingEmail: {
      type: String,
      default: "",
      lowercase: true,
      trim: true,
    },
    avatar: {
      type: String,
      default: "",
    },
    avatarPublicId: {
      type: String,
      default: "",
    },
    mobile: {
      type: Number,
      default: null,
    },
    verify_email: {
      type: Boolean,
      default: false,
    },
    last_login_date: {
      type: Date,
      default: null,
    },
    status: {
      type: String,
      enum: ["Active", "Inactive", "Suspended"],
      default: "Active",
    },
    address_details: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "address",
      },
    ],
    shopping_cart: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "cartProduct",
      },
    ],
    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    orderHistory: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "order",
      },
    ],
    otp: {
      type: Number,
      default: null,
    },
    otp_expiry: {
      type: Date,
      default: null,
    },
    otpVerifiedAt: {
      type: Date,
      default: null,
    },
    role: {
      type: String,
      enum: ["Admin", "User"],
      default: "User",
    },
  },
  {
    timestamps: true,
  }
);
userSchema.index({ email: 1 });
const UserModel = mongoose.model("User", userSchema);
export default UserModel;
