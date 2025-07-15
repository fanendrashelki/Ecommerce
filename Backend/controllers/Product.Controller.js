import ProductModel from "../models/product.model.js";
import asyncHandler from "../utils/AsyncHandler.js";

import ErrorHandle from "../utils/ErrorHandler.js";
import { cloudinary } from "../config/cloudinary.js";

const parseSize = (size) => {
  if (typeof size === "string") {
    return size.trim() ? size.split(",").map((s) => s.trim()) : [];
  } else if (Array.isArray(size)) {
    return size;
  }
  return [];
};

const parseRam = (productRam) => {
  if (typeof productRam === "string") {
    return productRam.trim() ? productRam.split(",").map((s) => s.trim()) : [];
  } else if (Array.isArray(productRam)) {
    return productRam;
  }
  return [];
};

//======================= create Product ===========================
const createProduct = asyncHandler(async (req, res, next) => {
  const {
    name,
    description,
    brand,
    price,
    oldPrice,
    catId,
    catName,
    subCatId,
    subCatName,
    thirdSubCatId,
    thirdSubCatName,
    countInStore,
    rating,
    isFeatured,
    discount,
    productRam,
    size,
    productWeight,
  } = req.body;

  console.log(req.body);
  console.log(size);

  const images =
    req.files?.map((file) => ({
      url: file.path,
      publicId: file.filename,
    })) || [];

  if (!name || !price || !catId || !description) {
    return res.status(400).json({
      message: "Name, price, category, and description are required.",
    });
  }

  const product = await ProductModel.create({
    name: name.trim(),
    description,
    brand,
    price: Number(price),
    oldPrice: oldPrice ? Number(oldPrice) : undefined,
    images,
    category: {
      catId,
      catName,
      subCatId: subCatId || undefined,
      subCatName: subCatName || undefined,
      thirdSubCatId: thirdSubCatId || undefined,
      thirdSubCatName: thirdSubCatName || undefined,
    },
    countInStore: countInStore ? Number(countInStore) : 0,
    rating: rating ? Number(rating) : 0,
    isFeatured: isFeatured === "true" || isFeatured === true,
    discount: discount ? Number(discount) : 0,
    productRam: productRam !== undefined ? parseRam(productRam) : [],
    size: size !== undefined ? parseSize(size) : [],
    productWeight,
  });

  res.status(201).json({ success: true, product });
});

//======================= get Product By Id ===========================
const getProductById = asyncHandler(async (req, res, next) => {
  const product = await ProductModel.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
});
//======================= get All Products ===========================
const getAllProducts = asyncHandler(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const totalProducts = await ProductModel.countDocuments();

  const products = await ProductModel.find()
    .populate("category.catId", "name")
    .populate("category.subCatId", "name")
    .populate("category.thirdSubCatId", "name")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  if (products.length === 0) {
    return next(new ErrorHandle("No products found", 404));
  }

  res.status(200).json({
    products,
    total: totalProducts,
    page,
    limit,
    totalPages: Math.ceil(totalProducts / limit),
    count: products.length,
  });
});

//======================= update Product ===========================
const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const existingProduct = await ProductModel.findById(id);
  if (!existingProduct) {
    return res.status(404).json({ message: "Product not found" });
  }

  let images = existingProduct.images;

  if (req.files && req.files.length > 0) {
    images = req.files.map((file) => ({
      url: file.path,
      publicId: file.filename,
    }));
  }

  const {
    name,
    description,
    brand,
    price,
    oldPrice,
    catId,
    catName,
    subCatId,
    subCatName,
    thirdSubCatId,
    thirdSubCatName,
    countInStore,
    rating,
    isFeatured,
    discount,
    productRam,
    size,
    productWeight,
  } = req.body;

  console.log("Size from body:", size);

  existingProduct.name = name || existingProduct.name;
  existingProduct.description = description || existingProduct.description;
  existingProduct.brand = brand || existingProduct.brand;
  existingProduct.price =
    price !== undefined ? Number(price) : existingProduct.price;
  existingProduct.oldPrice =
    oldPrice !== undefined ? Number(oldPrice) : existingProduct.oldPrice;
  existingProduct.images = images;

  existingProduct.category = {
    catId: catId || existingProduct.category.catId,
    catName: catName || existingProduct.category.catName,
    subCatId: subCatId || existingProduct.category.subCatId,
    subCatName: subCatName || existingProduct.category.subCatName,
    thirdSubCatId: thirdSubCatId || existingProduct.category.thirdSubCatId,
    thirdSubCatName:
      thirdSubCatName || existingProduct.category.thirdSubCatName,
  };

  existingProduct.countInStore =
    countInStore !== undefined
      ? Number(countInStore)
      : existingProduct.countInStore;

  existingProduct.rating =
    rating !== undefined ? Number(rating) : existingProduct.rating;

  existingProduct.isFeatured =
    isFeatured !== undefined
      ? isFeatured === "true" || isFeatured === true
      : existingProduct.isFeatured;

  existingProduct.discount =
    discount !== undefined ? Number(discount) : existingProduct.discount;

  existingProduct.productRam =
    productRam !== undefined
      ? parseRam(productRam)
      : existingProduct.productRam;

  existingProduct.size =
    size !== undefined ? parseSize(size) : existingProduct.size;

  existingProduct.productWeight =
    productWeight || existingProduct.productWeight;

  const updatedProduct = await existingProduct.save();
  res.status(200).json({ success: true, product: updatedProduct });
});

//======================= delete Product ===========================
const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await ProductModel.findById(id);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  // Delete Cloudinary images
  for (const image of product.images) {
    if (image.publicId) {
      await cloudinary.uploader.destroy(image.publicId);
    }
  }

  // Remove product from DB
  await product.deleteOne();

  res
    .status(200)
    .json({ success: true, message: "Product deleted successfully" });
});

//======================= get Product by cat  ===========================
const getProductBycatId = asyncHandler(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const totalProducts = await ProductModel.countDocuments({
    "category.catId": req.params.id,
  });

  const products = await ProductModel.find({
    "category.catId": req.params.id,
  })
    .populate("category.catId", "name")
    .populate("category.subCatId", "name")
    .populate("category.thirdSubCatId", "name")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  if (products.length === 0) {
    return next(new ErrorHandle("No products found", 404));
  }

  res.status(200).json({
    products,
    total: totalProducts,
    page,
    limit,
    totalPages: Math.ceil(totalProducts / limit),
    count: products.length,
  });
});

//======================= get Product by cat Name ===========================
const getProductBycatName = asyncHandler(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const totalProducts = await ProductModel.countDocuments({
    "category.catName": req.query.catName,
  });

  const products = await ProductModel.find({
    "category.catName": req.query.catName,
  })
    .populate("category.catId", "name")
    .populate("category.subCatId", "name")
    .populate("category.thirdSubCatId", "name")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  if (products.length === 0) {
    return next(new ErrorHandle("No products found", 404));
  }

  res.status(200).json({
    products,
    total: totalProducts,
    page,
    limit,
    totalPages: Math.ceil(totalProducts / limit),
    count: products.length,
  });
});

//======================= get Product by cat  ===========================
const getProductBySubcatId = asyncHandler(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const totalProducts = await ProductModel.countDocuments({
    "category.subCatId": req.params.id,
  });

  const products = await ProductModel.find({
    "category.subCatId": req.params.id,
  })
    .populate("category.catId", "name")
    .populate("category.subCatId", "name")
    .populate("category.thirdSubCatId", "name")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  if (products.length === 0) {
    return next(new ErrorHandle("No products found", 404));
  }

  res.status(200).json({
    products,
    total: totalProducts,
    page,
    limit,
    totalPages: Math.ceil(totalProducts / limit),
    count: products.length,
  });
});

//======================= get Product by cat Name ===========================
const getProductBySubcatName = asyncHandler(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const totalProducts = await ProductModel.countDocuments({
    "category.subcatName": req.query.subcatName,
  });

  const products = await ProductModel.find({
    "category.subcatName": req.query.subcatName,
  })
    .populate("category.catId", "name")
    .populate("category.subCatId", "name")
    .populate("category.thirdSubCatId", "name")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  if (products.length === 0) {
    return next(new ErrorHandle("No products found", 404));
  }

  res.status(200).json({
    products,
    total: totalProducts,
    page,
    limit,
    totalPages: Math.ceil(totalProducts / limit),
    count: products.length,
  });
});

//======================= get Product by cat  ===========================
const getProductBythirdSubcatId = asyncHandler(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const totalProducts = await ProductModel.countDocuments({
    "category.thirdSubCatId": req.params.id,
  });

  const products = await ProductModel.find({
    "category.thirdSubCatId": req.params.id,
  })
    .populate("category.catId", "name")
    .populate("category.subCatId", "name")
    .populate("category.thirdSubCatId", "name")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  if (products.length === 0) {
    return next(new ErrorHandle("No products found", 404));
  }

  res.status(200).json({
    products,
    total: totalProducts,
    page,
    limit,
    totalPages: Math.ceil(totalProducts / limit),
    count: products.length,
  });
});

//======================= get Product by cat Name ===========================
const getProductBythirdSubcatName = asyncHandler(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const totalProducts = await ProductModel.countDocuments({
    "category.thirdSubCatId": req.query.thirdSubCatId,
  });

  const products = await ProductModel.find({
    "category.thirdSubCatId": req.query.thirdSubCatId,
  })
    .populate("category.catId", "name")
    .populate("category.subCatId", "name")
    .populate("category.thirdSubCatId", "name")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  if (products.length === 0) {
    return next(new ErrorHandle("No products found", 404));
  }

  res.status(200).json({
    products,
    total: totalProducts,
    page,
    limit,
    totalPages: Math.ceil(totalProducts / limit),
    count: products.length,
  });
});

//======================= filter Products ===========================
const filterProducts = asyncHandler(async (req, res, next) => {
  const {
    catName,
    brand,
    minPrice,
    maxPrice,
    ram,
    size,
    keyword,
    page = 1,
    limit = 10,
    sort = "createdAt", // or "price", "rating"
    price,
    rating,
    order = "desc", // "asc" or "desc"
  } = req.query;

  const query = {};

  // Filter by category name
  if (catName) {
    query["category.catName"] = { $regex: new RegExp(catName, "i") };
  }

  // Filter by brand
  if (brand) {
    query.brand = { $regex: new RegExp(brand, "i") };
  }

  // Filter by price range
  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
  }

  // Filter by product RAM
  if (ram) {
    query.productRam = ram;
  }
  // Filter by rating
  if (rating) {
    query.rating = rating;
  }
  // Filter by price
  if (price) {
    query.price = price;
  }

  // Filter by size
  if (size) {
    query.size = size;
  }

  // Search by name or description
  if (keyword) {
    query.$or = [
      { name: { $regex: new RegExp(keyword, "i") } },
      { description: { $regex: new RegExp(keyword, "i") } },
    ];
  }

  const skip = (page - 1) * limit;

  const totalProducts = await ProductModel.countDocuments(query);

  const products = await ProductModel.find(query)
    .sort({ [sort]: order === "asc" ? 1 : -1 })
    .skip(skip)
    .limit(Number(limit));

  res.status(200).json({
    products,
    total: totalProducts,
    page: Number(page),
    limit: Number(limit),
    totalPages: Math.ceil(totalProducts / limit),
    count: products.length,
  });
});

//======================= get Featured Product ===========================
const featuredProduct = asyncHandler(async (req, res, next) => {
  const product = await ProductModel.find({ isFeatured: true });
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
});

const rateProduct = async (req, res) => {
  const { userId, star, comment } = req.body;

  try {
    const product = await ProductModel.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Remove old rating if user has rated before
    product.ratings = product.ratings.filter(
      (r) => r.user.toString() !== userId.toString()
    );

    // Push new rating
    product.ratings.push({ user: userId, star, comment });

    if (product.ratings.length === 0) {
      product.rating = 2;
    } else {
      const total = product.ratings.reduce((sum, r) => sum + r.star, 0);
      product.rating = parseFloat((total / product.ratings.length).toFixed(1));
    }
    await product.save();

    res.status(200).json({ message: "Rating submitted" });
  } catch (error) {
    res.status(500).json({ message: "Error rating product" });
  }
};

const getProductRatings = async (req, res) => {
  try {
    const productId = req.params.id;

    const product = await ProductModel.findById(productId)
      .populate("ratings.user", "name  avatar") // Optional: show user details
      .select("name ratings rating"); // Only select relevant fields

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({
      productName: product.name,
      averageRating: product.rating,
      totalReviews: product.ratings.length,
      reviews: product.ratings,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductBycatId,
  getProductBycatName,
  getProductBySubcatId,
  getProductBySubcatName,
  getProductBythirdSubcatId,
  getProductBythirdSubcatName,
  filterProducts,
  featuredProduct,
  rateProduct,
  getProductRatings,
};
