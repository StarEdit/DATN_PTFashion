import express from "express";
const router = express.Router();
import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
  getAllCategories,
  searchCategories,
} from "../controllers/categoryController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.get("/category", getAllCategories);

router
  .route("/category")
  .get(protect, admin, getCategories)
  .post(protect, admin, createCategory);

router.route("/category/search").get(protect, admin, searchCategories);

router
  .route("/category/:id")
  .get(getCategoryById)
  .delete(protect, admin, deleteCategory)
  .put(protect, admin, updateCategory);

export default router;
