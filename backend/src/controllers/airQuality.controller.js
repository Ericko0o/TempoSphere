import { getTempoData } from "../services/nasa.service.js";

export const getAirQuality = async (req, res) => {
  try {
    const { lat, lon } = req.query;

    if (!lat || !lon) {
      return res.status(400).json({ error: "Faltan coordenadas (lat, lon)" });
    }

    const tempoData = await getTempoData(lat, lon);

    res.json({
      source: "NASA TEMPO",
      coordinates: { lat, lon },
      data: tempoData,
    });
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor NASA TEMPO" });
  }
};
