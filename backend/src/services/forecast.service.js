// backend/src/services/forecast.service.js
import axios from "axios";
import pool from "../../config/db.js";

/**
 * Stub service - returns mock GEOS-CF-like predictions.
 * Replace with real GEOS-CF / Harmony calls when keys are available.
 */
export const getGeosCfPrediction = async ({ lat, lon, days = 3 }) => {
  // OPTIONAL: attempt to retrieve cached predictions from DB
  // For now return hourly/daily mock for next `days`
  const now = new Date();
  const results = [];
  for (let d = 0; d < days; d++) {
    const date = new Date(now);
    date.setDate(now.getDate() + d);
    results.push({
      date: date.toISOString().slice(0,10),
      NO2: Math.round(Math.random()*120),
      PM25: Math.round(Math.random()*90),
      O3: Math.round(Math.random()*80)
    });
  }
  return { lat, lon, generated_at: now.toISOString(), predictions: results, source: "GEOS-CF-mock" };
};
