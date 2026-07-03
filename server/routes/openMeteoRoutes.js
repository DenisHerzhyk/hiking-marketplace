import { Router } from "express";
import {
  elevationOpenMeteo,
  forecastOpenMeteo,
} from "../controllers/openMeteoController";

const router = Router();

router.get("/elevation", elevationOpenMeteo);
router.get("/forecast", forecastOpenMeteo);

export default router;
