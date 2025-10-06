import express from "express";
import axios from "axios";

const router = express.Router();

router.get("/proxy/wms", async (req, res) => {
  const { layer, width=1024, height=512, time="2025-10-01" } = req.query;
  try {
    const url = `https://gibs.earthdata.nasa.gov/wms/epsg4326/best/wms.cgi?service=WMS&request=GetMap&layers=${layer}&styles=&format=image/png&transparent=true&version=1.3.0&width=${width}&height=${height}&crs=EPSG:4326&bbox=-180,-90,180,90&time=${time}`;
    const response = await axios.get(url, { responseType: "arraybuffer" });
    res.set("Content-Type", "image/png");
    res.send(response.data);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Error al obtener datos de NASA GIBS" });
  }
});

export default router;
