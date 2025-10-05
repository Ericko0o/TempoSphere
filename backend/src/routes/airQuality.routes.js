import { Router } from 'express';
import { getAirQuality } from '../controllers/airQuality.controller.js';

const router = Router();

router.get('/', getAirQuality);

export default router;
