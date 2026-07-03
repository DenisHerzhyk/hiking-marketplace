import { Router } from "express";
import {
  getWishlist,
  wishlistAdd,
  wishlistRemove,
  moveWishlistItemToCart,
} from "../controllers/wishlistController.js";
import { verifyJWT } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("", verifyJWT, getWishlist);
router.post("/add/:productId", verifyJWT, wishlistAdd);
router.delete("/remove/:productId", verifyJWT, wishlistRemove);
router.post("/movecart/:productId", verifyJWT, moveWishlistItemToCart);

export default router;
