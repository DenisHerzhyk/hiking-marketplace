import { Router } from "express";
import { pexelsQuery } from "../controllers/pexelsController.js";
const router = Router();

router.get("/search", pexelsQuery);

export default router;
