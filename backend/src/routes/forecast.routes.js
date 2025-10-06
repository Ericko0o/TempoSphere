// backend/src/routes/forecast.routes.js
import express from "express";
import { getForecast } from "../controllers/forecast.controller.js";
const router = express.Router();

router.get("/predict", getForecast); // /api/forecast/predict?lat=...&lon=...&days=3

export default router;
