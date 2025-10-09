import { Router } from "express";
import { getUser, updateUser } from "../controller/userController.js";
import { protect } from "../middleware/auth.js";

const router = Router();

router.get("/:user", getUser);
router.put("/",protect, updateUser);

export default router;
