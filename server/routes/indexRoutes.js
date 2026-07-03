import { Router } from "express";
import { index } from "../controllers/indexController.js";

const router = Router();

router.get("/", index);

export default router;
