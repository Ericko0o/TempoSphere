// backend/src/routes/wms.routes.js
import express from "express";
import axios from "axios";
const router = express.Router();

const GIBS_WMS_BASE = "https://gibs.earthdata.nasa.gov/wms/epsg4326/best/wms.cgi";

// Ruta proxy: /api/proxy/wms?layer=BlueMarble_ShadedRelief&width=1024&height=512
router.get("/wms", async (req, res) => {
  try {
    const { layer = "BlueMarble_ShadedRelief", width = 1024, height = 512, time } = req.query;

    const bbox = "-90,-180,90,180"; // mundo entero en EPSG:4326

    const params = new URLSearchParams({
      service: "WMS",
      request: "GetMap",
      version: "1.3.0",
      layers: layer,
      format: "image/png",
      transparent: "TRUE",
      height,
      width,
      crs: "EPSG:4326",
      bbox
    });

    if (time) params.append("time", time);

    const url = `${GIBS_WMS_BASE}?${params.toString()}`;

    const response = await axios.get(url, { responseType: "arraybuffer" });
    res.set("Content-Type", "image/png");
    res.send(Buffer.from(response.data));
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Error en proxy WMS" });
  }
});

export default router;
