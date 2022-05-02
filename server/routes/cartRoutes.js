import express from "express";
import {
  getCarts,
  createCart,
  plusProduct,
  deleteCart,
  minusProduct,
  getTotal,
} from "../controllers/cartController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/cart").get(protect, getCarts).post(protect, createCart);

router.route("/cart/delete/:id").delete(protect, deleteCart);

router.route("/cart/plus/:id").patch(protect, plusProduct);

router.route("/cart/minus/:id").patch(protect, minusProduct);

router.route("/cart/total").get(protect, getTotal);

export default router;
