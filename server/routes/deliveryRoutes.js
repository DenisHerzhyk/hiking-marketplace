import e, { Router } from "express";
import { getDefaultAddress } from "../controllers/ordersController.js";
import { verifyJWT } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/get_default_address", verifyJWT, getDefaultAddress);

export default router;
