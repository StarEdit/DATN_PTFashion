import express from "express";
import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
  getAllCategories,
} from "../controllers/categoryController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/categories", getAllCategories);

router
  .route("/category")
  .get(protect, admin, getCategories)
  .post(protect, admin, createCategory);

router
  .route("/category/:id")
  .get(protect, admin, getCategoryById)
  .delete(protect, admin, deleteCategory)
  .put(protect, admin, updateCategory);

export default router;
