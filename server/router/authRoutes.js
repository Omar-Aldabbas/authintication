import { Router } from "express";
import {
  authenticate,
  generateOTP,
  login,
  logout,
  register,
  registerMail,
  resetPassword,
  resetSession,
  userVerify,
  verifyOTP,
} from "../controller/authController.js";

const router = Router();

// get
router.get("/OTP", generateOTP);
router.get("/OTP/verify", verifyOTP);
router.get("/reset-session", resetSession);
router.get("/logout", logout);

//post
router.post("/register", register);
router.post("/register-mail", registerMail);
router.post("/login", userVerify, login);
router.post("/reset-password", resetPassword);
router.post("/authenticate", authenticate);


export default router;
