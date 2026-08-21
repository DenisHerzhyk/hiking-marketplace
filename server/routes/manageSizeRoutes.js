import { Router } from "express";
import { verifyJWT } from "../middlewares/authMiddleware.js";
import {
  addSizeAmount,
  decreaseSizeAmount,
  removeSize,
} from "../controllers/manageSizeController.js";
const router = Router();

router.put("/add/:productId", verifyJWT, addSizeAmount);
router.put("/decrease/:productId", verifyJWT, decreaseSizeAmount);
router.delete("/remove/:productId/:size", verifyJWT, removeSize);

export default router;
