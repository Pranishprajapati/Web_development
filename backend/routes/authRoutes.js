import express from "express";
import {
  registerUser,
  loginUser,
  sendForgotPasswordCode,
  resetPasswordWithCode,
} from "../controllers/authController.js";

const router = express.Router();


// Register new user
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// Send forgot password verification code
router.post("/forgot-password/send-code", sendForgotPasswordCode);

// Reset password using verification code
router.post("/forgot-password/reset", resetPasswordWithCode);

export default router;