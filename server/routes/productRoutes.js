import express from "express";
import {
  getProductsByCategory,
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  filterProduct,
} from "../controllers/productController.js";
import { uploadMultiFile } from "../utils/uploadFiles.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/product-page").get(getProductsByCategory);

router
  .route("/product")
  .get(protect, admin, getAllProducts)
  .post(protect, admin, uploadMultiFile, createProduct);

router
  .route("/product/:id")
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, uploadMultiFile, updateProduct);

router.route("/product-page/search").get(filterProduct);
router.route("/product-page/:category").get(getProductsByCategory);

export default router;
