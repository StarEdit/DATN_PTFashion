import express from "express";
import {
  getProductsByCategory,
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  filterProduct,
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/search").get(filterProduct);

router.route("/product-page").get(getProductsByCategory);

router
  .route("/product")
  .get(protect, admin, getAllProducts)
  .post(protect, admin, createProduct);

router
  .route("/product/:id")
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);

router.route("/product-page/:category").get(getProductsByCategory);

export default router;
