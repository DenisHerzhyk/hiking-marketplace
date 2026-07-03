import { Router } from "express";
import { cookieShow } from "../controllers/cookieController.js";
const router = Router();

router.get("/", cookieShow);

export default router;
