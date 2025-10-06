// backend/src/controllers/forecast.controller.js
import { getGeosCfPrediction } from "../services/forecast.service.js";

export const getForecast = async (req, res) => {
  try {
    const { lat, lon, days } = req.query;
    if (!lat || !lon) return res.status(400).json({ error: "lat & lon required" });
    const daysInt = parseInt(days || "3", 10);
    const preds = await getGeosCfPrediction({ lat: parseFloat(lat), lon: parseFloat(lon), days: daysInt });
    res.json(preds);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
