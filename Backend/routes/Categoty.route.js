import express from "express";

import CategoryController from "../controllers/category.controller.js";

import upload from "../middleware/multer.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// create
router.post(
  "/",
  authMiddleware,
  upload.single("image"),
  CategoryController.createCategory
);

// get all Categories
router.get("/", CategoryController.getCategories);

// get sub Categories
router.get(
  "/subcategories",

  CategoryController.getSubcategories
);

// get Category
router.get("/:id", CategoryController.getCategory);

// update Category
router.put(
  "/:id",
  authMiddleware,
  upload.single("image"),
  CategoryController.updateCategory
);

// delete Category
router.delete("/:id", authMiddleware, CategoryController.deleteCategory);

// get Category Counts
router.get("/get/count", CategoryController.getCategoryCounts);

export default router;
