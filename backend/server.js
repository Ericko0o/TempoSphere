// backend/server.js
import express from "express";
import cors from "cors";
import axios from "axios";
import pool from "./config/db.js";

// Importar rutas
import forumRoutes from "./src/routes/forum.routes.js";
import forecastRoutes from "./src/routes/forecast.routes.js";
import newsRoutes from "./src/routes/news.routes.js";
import wmsRoutes from "./src/routes/wms.routes.js";

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// ✅ Test de base de datos
app.get("/api/dbtest", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({
      message: "✅ Conexión a la base de datos funcionando",
      time: result.rows[0].now,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "❌ Error en la conexión a la base de datos" });
  }
});

// ✅ Ruta raíz
app.get("/", (req, res) => {
  res.send("✅ Backend de TempoSphere funcionando");
});

// ✅ Ruta básica
app.get("/api/airquality", (req, res) => {
  res.json({ message: "✅ API de calidad del aire activa" });
});

// ✅ Nueva ruta (OpenAQ por ciudad → coordenadas)
app.get("/api/airquality/city/:city", async (req, res) => {
  const { city } = req.params;

  const coordsMap = {
    Lima: "-12.0464,-77.0428",
    Bogota: "4.7110,-74.0721",
    Madrid: "40.4168,-3.7038",
    Delhi: "28.6139,77.2090",
    Mexico: "19.4326,-99.1332",
  };

  const coords = coordsMap[city] || null;

  if (!coords) {
    return res.status(400).json({
      error: `No hay coordenadas definidas para la ciudad: ${city}`,
    });
  }

  try {
    const response = await axios.get(
      `https://api.openaq.org/v2/latest?coordinates=${coords}&radius=10000&limit=10`
    );

    res.json({
      source: "OpenAQ",
      coords,
      city,
      results: response.data.results,
    });
  } catch (error) {
    res.status(500).json({
      error: "Error obteniendo datos desde OpenAQ",
      details: error.message,
    });
  }
});

// ✅ Lista de ciudades (nuevo)
app.get("/api/openaq/cities", async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.openaq.org/v2/locations?limit=50&page=1&sort=asc&order_by=city"
    );

    const cities = response.data.results
      .map((loc) => loc.city)
      .filter((c) => c !== null);

    res.json({
      count: cities.length,
      cities,
    });
  } catch (error) {
    res.status(500).json({
      error: "Error obteniendo ciudades desde OpenAQ (locations)",
      details: error.message,
    });
  }
});

// ✅ Montar rutas externas
app.use("/api/forum", forumRoutes);
app.use("/api/forecast", forecastRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/proxy", wmsRoutes);

// ✅ Inicializar servidor (SOLO UNA VEZ)
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

import airQualityRoutes from "./src/routes/airQuality.routes.js";
app.use("/api/airquality", airQualityRoutes);
