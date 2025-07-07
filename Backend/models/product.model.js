import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    images: [
      {
        url: String,
        publicId: String,
      },
    ],
    brand: {
      type: String,
      default: "Generic",
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
    },
    oldPrice: {
      type: Number,
    },
    discount: {
      type: Number,
      default: 0, // as percent (e.g., 20 = 20%)
    },
    category: {
      catId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
      },
      catName: {
        type: String,
      },

      subCatId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
      },
      subCatName: {
        type: String,
      },

      thirdSubCatId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
      },
      thirdSubCatName: {
        type: String,
      },
    },
    productRam: [
      {
        type: String, // e.g., "8GB"
      },
    ],
    size: [
      {
        type: String, // e.g., "M", "L", "XL" for clothes
      },
    ],
    productWeight: {
      type: String, // e.g., "1.5kg"
    },
    countInStore: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    dateCreated: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const ProductModel = mongoose.model("Product", productSchema);
export default ProductModel;
