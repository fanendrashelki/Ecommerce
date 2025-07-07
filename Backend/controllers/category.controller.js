import Category from "../models/Category.model.js";
import asyncHandler from "../utils/AsyncHandler.js";
import ErrorHandle from "../utils/ErrorHandler.js";
import { cloudinary } from "../config/cloudinary.js";

//======================= Create Category ===========================
const createCategory = asyncHandler(async (req, res, next) => {
  let { name, parentId } = req.body;
  const file = req.file;

  if (!name) {
    return next(new ErrorHandle("Category name is required", 400));
  }

  name = name.trim().toLowerCase();
  const existCat = await Category.findOne({ name, parentId: parentId || null });
  if (existCat) {
    return next(new ErrorHandle("Category already exists", 400));
  }

  let parentCatName = null;
  if (parentId) {
    const parentCat = await Category.findById(parentId);
    if (!parentCat) {
      return next(new ErrorHandle("Parent category not found", 400));
    }
    parentCatName = parentCat.name;
  }

  const newCategory = new Category({
    name,
    parentId: parentId || null,
    parentCatName,
    image: file?.path || "",
    imagePublicId: file?.filename || "",
  });

  await newCategory.save();

  res.status(201).json({
    message: "Category created successfully",
    category: newCategory,
  });
});

//======================= All Category ===========================
const buildCategoryTree = (categories, parentId = null) => {
  const categoryTree = [];
  categories
    .filter((cat) => String(cat.parentId) === String(parentId))
    .forEach((cat) => {
      categoryTree.push({
        _id: cat._id,
        name: cat.name,
        image: cat.image,
        parentId: cat.parentId,
        parentCatName: cat.parentCatName,
        children: buildCategoryTree(categories, cat._id),
      });
    });
  return categoryTree;
};

// Get all categories
export const getCategories = asyncHandler(async (req, res, next) => {
  const categories = await Category.find().lean();

  if (!categories || categories.length === 0) {
    return next(new ErrorHandle("No categories found", 404));
  }

  const category = buildCategoryTree(categories);
  res.status(200).json({ data: category });
});
// Get all sub categories
export const getSubcategories = asyncHandler(async (req, res, next) => {
  // Step 1: Get top-level category IDs (parent categories)
  const parentCategories = await Category.find({ parentId: null }).select(
    "_id"
  );

  const topLevelIds = parentCategories.map((cat) => cat._id);

  // Step 2: Get only subcategories whose parent is a top-level category
  const subcategories = await Category.find({
    parentId: { $in: topLevelIds },
  }).lean();

  if (!subcategories || subcategories.length === 0) {
    return next(new ErrorHandle("No subcategories found", 404));
  }

  res.status(200).json({ data: subcategories });
});

//======================= Update Category ===========================
const updateCategory = asyncHandler(async (req, res, next) => {
  const { name, parentId } = req.body;
  const file = req.file;

  const category = await Category.findById(req.params.id);
  if (!category) {
    return next(new ErrorHandle("Category not found", 404));
  }
  if (parentId && parentId !== category._id.toString()) {
    const parentCat = await Category.findById(parentId);
    if (!parentCat) {
      return next(new ErrorHandle("Parent category not found", 400));
    }
    category.parentId = parentId;
    category.parentCatName = parentCat.name;
  }

  if (name) category.name = name;

  if (file) {
    if (category.imagePublicId) {
      await cloudinary.uploader.destroy(category.imagePublicId);
    }
    category.image = file.path;
    category.imagePublicId = file.filename;
  }
  const updatedCategory = await category.save();
  res.status(200).json(updatedCategory);
});
//=======================  Get Single Category ===========================
const getCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    return next(new ErrorHandle("Category not found", 400));
  }
  res.status(200).json(category);
});

//=======================  Delete Category ===========================
const deleteCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    return next(new ErrorHandle("Category not found", 404));
  }

  // Recursive function to delete subcategories
  const deleteSubcategories = async (parentId) => {
    const subcategories = await Category.find({ parentId });

    for (const sub of subcategories) {
      // Delete image from Cloudinary if exists
      if (sub.imagePublicId) {
        await cloudinary.uploader.destroy(sub.imagePublicId);
      }

      // Recursively delete its children
      await deleteSubcategories(sub._id);

      // Delete the subcategory itself
      await sub.deleteOne();
    }
  };

  // First delete all subcategories
  await deleteSubcategories(category._id);

  // Delete image of parent category
  if (category.imagePublicId) {
    await cloudinary.uploader.destroy(category.imagePublicId);
  }

  // Delete the parent category
  await category.deleteOne();

  res
    .status(200)
    .json({ message: "Category and its subcategories deleted successfully" });
});

//=======================  Category Counts ===========================
const getCategoryCounts = asyncHandler(async (req, res, next) => {
  const category = await Category.find();
  const mainCategories = category.filter((cat) => cat.parentId === null);
  const subCategories = category.filter((cat) => cat.parentId !== null);

  res.status(200).json({
    totalCategories: mainCategories.length,
    totalSubcategories: subCategories.length,
  });
});

export default {
  createCategory,
  getCategories,
  updateCategory,
  getCategory,
  deleteCategory,
  getCategoryCounts,
  getSubcategories,
};
