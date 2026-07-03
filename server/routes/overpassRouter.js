import { Router } from "express";
import { overpassQuery } from "../controllers/overpassController.js";
const router = Router();

router.post("/interpreter", overpassQuery);

export default router;
