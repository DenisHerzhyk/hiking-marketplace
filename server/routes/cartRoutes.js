import { Router } from "express";
import {
  cartAdd,
  cartRemove,
  getCart,
  moveCartItemToWishlist,
} from "../controllers/cartController.js";
import { verifyJWT } from "../middlewares/authMiddleware.js";
import { updateCartItem } from "../controllers/cartController.js";

const router = Router();

router.get("/", verifyJWT, getCart);
router.post("/add/:productId", verifyJWT, cartAdd);
router.delete("/remove/:productId", verifyJWT, cartRemove);
router.post("/movewishlist/:productId", verifyJWT, moveCartItemToWishlist);
router.post("/update/:id", verifyJWT, updateCartItem);

export default router;
