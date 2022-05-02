import express from "express";
import {
  getProductsByCategory,
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { uploadMultiFile } from "../utils/uploadFiles.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/product")
  .get(protect, admin, getAllProducts)
  .post(protect, admin, uploadMultiFile, createProduct);

router
  .route("/product/:id")
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, uploadMultiFile, updateProduct);

router.route("/product/:category").get(getProductsByCategory);

export default router;
