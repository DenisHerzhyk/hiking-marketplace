import { Router } from "express";
import { verifyJWT, requireAdmin } from "../middlewares/authMiddleware.js";
import {
  addSizeAmount,
  decreaseSizeAmount,
  removeSize,
} from "../controllers/manageSizeController.js";
const router = Router();

router.put("/add/:productId", verifyJWT, requireAdmin, addSizeAmount);
router.put("/decrease/:productId", verifyJWT, requireAdmin, decreaseSizeAmount);
router.delete(
  "/remove/:productId/:size",
  verifyJWT,
  requireAdmin,
  removeSize,
);

export default router;
