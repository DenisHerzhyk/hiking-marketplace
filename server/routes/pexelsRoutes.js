import { Router } from "express";
import { pexelsQuery } from "../controllers/pexelsController.js";
const router = Router();

router.post("/search", pexelsQuery);

export default router;
