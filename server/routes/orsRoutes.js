import { Router } from "express";
import { orsHikingRoute } from "../controllers/orsController";

const router = Router();

router.post("/hiking-route", orsHikingRoute);

export default router;
