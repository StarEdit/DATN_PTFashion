import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";
import {
  createOrder,
  getOrders,
  getOrderById,
  deleteOrder,
  updateOrder,
  getOrderUser,
} from "../controllers/orderController.js";

const router = express.Router();

router
  .route("/order")
  .post(protect, createOrder)
  .get(protect, admin, getOrders);

router.route("/order/user").get(protect, getOrderUser);

router
  .route("/order/:id")
  .get(protect, admin, getOrderById)
  .delete(protect, admin, deleteOrder)
  .patch(protect, admin, updateOrder);

export default router;
