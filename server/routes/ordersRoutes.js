import { Router } from "express";
import { orderConfirm, getOrders } from "../controllers/ordersController.js";
import { verifyJWT } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("", verifyJWT, getOrders);
router.post("/confirm", verifyJWT, orderConfirm);

export default router;
