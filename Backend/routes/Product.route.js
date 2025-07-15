import express from "express";
import productController from "../controllers/Product.Controller.js";
const router = express.Router();
import { authMiddleware } from "../middleware/authMiddleware.js";
import upload, { setUploadFolder } from "../middleware/multer.js";

// create product
router.post(
  "/",
  setUploadFolder("product"),
  upload.array("images"),
  authMiddleware,
  productController.createProduct
);

// get All product
router.get("/", productController.getAllProducts);

//update Product
router.put(
  "/:id",
  setUploadFolder("product"),
  upload.array("images"),
  authMiddleware,
  productController.updateProduct
);

//delete Product
router.delete("/:id", authMiddleware, productController.deleteProduct);

// get Product By catId
router.get(
  "/getProductBycatId/:id",

  productController.getProductBycatId
);

// get Product By catName
router.get(
  "/getProductBycatName",

  productController.getProductBycatName
);

// get Product By subcatId
router.get(
  "/getProductBySubcatId/:id",

  productController.getProductBySubcatId
);

// get Product By subcatName
router.get(
  "/getProductBySubcatName",

  productController.getProductBySubcatName
);

// get Product By subcatId
router.get(
  "/getProductBythirdSubcatId/:id",

  productController.getProductBythirdSubcatId
);

// get Product By subcatName
router.get(
  "/getProductBythirdSubcatName",

  productController.getProductBythirdSubcatName
);

// Product filter
router.get("/filter", productController.filterProducts);

// get single product
router.get(
  "/featured-product",

  productController.featuredProduct
);
// get single product
router.get("/:id", productController.getProductById);

//  Rate Product
router.put("/:id/rating", productController.rateProduct);
router.get("/:id/ratings", productController.getProductRatings);

export default router;
