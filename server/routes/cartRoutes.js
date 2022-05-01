import express from "express";
const router = express.Router();
import {
  getCarts,
  createCart,
  deleteCart,
} from "../controllers/cartController.js";
import { protect } from "../middleware/authMiddleware.js";

router.route("/").get(protect, getCarts).post(protect, createCart);
router.route("/:id").delete(protect, deleteCart);

export default router;
