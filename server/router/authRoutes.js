import { Router } from "express";
import {
  authenticate,
  generateOTP,
  login,
  logout,
  register,
  // registerMail,
  resetPassword,
  resetSession,
  userVerify,
  verifyOTP,
} from "../controller/authController.js";
import { localVariables } from "../middleware/auth.js";
import { registerMail } from "../utils/mailer.js";


const router = Router();

// get
router.get("/generate-OTP", userVerify, localVariables, generateOTP);
router.get("/verify-OTP",userVerify, verifyOTP);
router.get("/reset-session", resetSession);
router.get("/logout", logout);

//post
router.post("/register", register);
router.post("/register-mail", registerMail);
router.post("/login", userVerify, login);
router.post("/authenticate",userVerify, authenticate);

// put
router.put("/reset-password", userVerify, resetPassword);

export default router;
