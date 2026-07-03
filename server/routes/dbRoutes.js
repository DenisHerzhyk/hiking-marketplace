import { Router } from "express";
import { database } from "../controllers/dbController.js";

const router = Router();

router.get("/", database);

export default router;
