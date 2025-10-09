import { Router } from "express";
import { getUser, updateProfile } from "../controller/userControoler.js";

const router = Router();

router.get("/:user", getUser);
router.patch("/:user", updateProfile);

export default router;
