import { Router } from "express";
import { verifyJWT } from "../middlewares/authMiddleware.js";
import { suggestGear } from "../controllers/aiController.js";

const router = Router();

router.post("/suggest", suggestGear);

export default router;
