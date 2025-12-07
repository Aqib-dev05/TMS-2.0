import express from "express";
import {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  resetPassword,
  checkDatabaseStatus,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/status", checkDatabaseStatus);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/reset-password", resetPassword);
router
  .route("/me")
  .get(protect, getProfile)
  .put(protect, updateProfile);

export default router;

