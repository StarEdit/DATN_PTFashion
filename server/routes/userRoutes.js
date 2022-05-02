import express from "express";
import {
  registerUser,
  authUser,
  logout,
  getUserInfo,
  getUserProfile,
  updateUserInfo,
  deleteUser,
  getUserById,
  forgotPassword,
  updatePassword,
} from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/user").post(registerUser);

router.post("/user/login", authUser);

router.route("/user/forgot-password").post(forgotPassword);

router.route("/user/change-password").put(protect, updatePassword);

router
  .route("/user/info")
  .get(protect, getUserInfo)
  .put(protect, updateUserInfo);

router.route("/user/logout").post(logout);

router.route("/user/profile").get(protect, admin, getUserProfile);

router
  .route("/user/:id")
  .get(protect, admin, getUserById)
  .delete(protect, admin, deleteUser);

export default router;
