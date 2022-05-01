import express from "express";
import {
  registerUser,
  authUser,
  logout,
  getUserInfo,
  getUserProfile,
  updateUserProfile,
  deleteUser,
  getUserById,
  forgotPassword,
  updatePassword,
} from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/users").post(registerUser);

router.route("/users/forgot-password").post(forgotPassword);
router.post("/user/login", authUser);
router.route("/user/change-password").put(protect, updatePassword);
router.get("/user/info", protect, getUserInfo);
router.get("/user/logout", logout);

router
  .route("/user/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router.route("/users/:id").get(getUserById).delete(protect, admin, deleteUser);

export default router;
