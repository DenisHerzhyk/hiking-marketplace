import { Router } from "express";
import { getProducts, getProduct } from "../controllers/productsController.js";

const router = Router();

router.get("/", getProducts);
router.get("/:productId", getProduct);

export default router;
