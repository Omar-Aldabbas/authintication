import { Router } from "express";

const router = Router();

router.get("")











// get
router.route("/user/:username").get((req, res) => res.json("User Request"));
router.route("/generateOTP").get((req, res) => res.json("OTP Request"));
router.route("/verifyOTP").get((req, res) => res.json("OTP verify Request"));
router
  .route("/createResetSession")
  .get((req, res) => res.json("Rest session Request"));
router.route("/logout").get((req, res) => res.json("Logout request"));


// post
router.route("/register").post((req, res) => res.json("Regiter Request"));
router
  .route("/registerMail")
  .post((req, res) => res.json("Register Mail Request"));
router
  .route("/authinticate")
  .post((req, res) => res.json("authinticate Request"));
router.route("/login").post((req, res) => res.json("login Request"));

// put

router.route("/updateuser").put((req, res) => res.json("Update user request"));
router
  .route("/resetPassword")
  .put((req, res) => res.json("Reset password request"));

// export
export default router;
