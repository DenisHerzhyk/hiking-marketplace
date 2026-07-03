import { Router } from "express";
import search from "../controllers/openStreetMapController";
const router = Router();

router.get("/search", search);

export const router;
