import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";
import {
  createOrder,
  getOrders,
  getOrderById,
  deleteOrder,
  updateOrder,
} from "../controllers/orderController.js";

const router = express.Router();

router
  .route("/order")
  .post(protect, createOrder)
  .get(protect, admin, getOrders);

router
  .route("/order/:id")
  .get(protect, getOrderById)
  .delete(protect, deleteOrder)
  .patch(protect, admin, updateOrder);

export default router;
