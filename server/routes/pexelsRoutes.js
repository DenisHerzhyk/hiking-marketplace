import { Router } from "express";
import { pexelsQuery } from "../controllers/pexelsController";
const router = Router();

router.post("/search", pexelsQuery);

export const router;
