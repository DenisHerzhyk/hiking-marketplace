import { Router } from "express";
import {
  register,
  login,
  logout,
  getUser,
  changeUserData,
} from "../controllers/authController.js";
import { profile } from "../controllers/profileContoller.js";
import { verifyJWT } from "../middlewares/authMiddleware.js";
import { verifyEmail } from "../controllers/authController.js";

const router = Router();

router.get("/get_user", verifyJWT, getUser);
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/profile", verifyJWT, profile);
router.put("/change", verifyJWT, changeUserData);
router.get("/verify-email", verifyEmail);

export default router;
