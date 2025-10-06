import apiKeys from "../../config/apiKeys.js";

export const getNews = async (req, res) => {
  try {
    const apiKey = apiKeys.NEWS_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: "NEWS_API_KEY no configurada" });
    }

    // ejemplo usando fetch o axios con tu key
    // const response = await axios.get(`https://newsapi.org/v2/...&apiKey=${apiKey}`);
    // res.json(response.data);

    res.json({ message: "News endpoint listo, falta conectar a NewsAPI" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener noticias" });
  }
};
