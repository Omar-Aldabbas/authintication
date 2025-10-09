import { Router } from "express";
import { getUser, updateUser } from "../controller/userControoler.js";

const router = Router();

router.get("/:user", getUser);
router.patch("/:user", updateUser);

export default router;
