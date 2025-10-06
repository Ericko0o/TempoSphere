// backend/src/services/nasa.service.js
import axios from "axios";
import apiKeys from "../../config/apiKeys.js";

// Harmony endpoint (NASA CMR API - Cloud Access)
// Ejemplo: Descarga de NO₂ de TEMPO
const HARMONY_BASE = "https://harmony.earthdata.nasa.gov/harmony";

export const getTempoData = async (lat, lon) => {
  try {
    // ejemplo: pedir datos de NO₂ (TEMPO L2 product) alrededor de coordenadas
    const response = await axios.get(
      `${HARMONY_BASE}/example/tempo/no2`, // <-- aquí irá el dataset real
      {
        params: {
          latitude: lat,
          longitude: lon,
          format: "application/json",
        },
        headers: {
          Authorization: `Bearer ${apiKeys.NASA_TOKEN}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("❌ Error al obtener datos de TEMPO:", error.message);
    return { error: "No se pudo obtener datos de TEMPO" };
  }
};
