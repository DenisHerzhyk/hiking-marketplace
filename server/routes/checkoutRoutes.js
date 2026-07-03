import { Router } from "express";
import {
  createCheckout,
  getCheckout,
} from "../controllers/checkoutController.js";
import { verifyJWT } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", verifyJWT, getCheckout);
router.post("/add", verifyJWT, createCheckout);

export default router;
