import { Router } from "express";
import { overpassQuery } from "../controllers/overpassController";
const router = Router();

router.post("/interpreter", overpassQuery);

export const router;
