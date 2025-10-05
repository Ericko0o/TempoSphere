export const getAirQuality = async (req, res) => {
  try {
    res.json({
      message: "API de calidad del aire funcionando ✅",
      data: null
    });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error });
  }
};
