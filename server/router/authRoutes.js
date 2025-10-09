import { Router } from "express";
import {
  authinticate,
  generateOTP,
  login,
  logout,
  register,
  registerMail,
  resetPassword,
  resetSession,
  verifyOTP,
} from "../controller/authController.js";

const router = Router();

// get
router.get("/OTP", generateOTP);
router.get("/OTP/verify", verifyOTP);
router.get("/reset-session", resetSession);
router.get("/logout", logout);

//post
router.get("/register", register);
router.get("/register-mail", registerMail);
router.get("/login", login);
router.get("/redet-password", resetPassword);
router.get("/authinticate", authinticate);
//

export default router;
