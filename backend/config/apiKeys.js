// backend/config/apiKeys.js
import dotenv from "dotenv";
dotenv.config();

const apiKeys = {
  // 🔹 Base de datos (Railway)
  DATABASE_URL: process.env.DATABASE_URL,

  // 🔹 NASA Earthdata / Harmony / TEMPO
  NASA_USERNAME: process.env.NASA_USERNAME,
  NASA_PASSWORD: process.env.NASA_PASSWORD,
  NASA_TOKEN: process.env.NASA_TOKEN,

  // 🔹 Calidad del aire (OpenAQ)
  OPENAQ_API_KEY: process.env.OPENAQ_API_KEY,

  // 🔹 Clima (WeatherAPI, OpenWeather, etc.)
  WEATHER_API_KEY: process.env.WEATHER_API_KEY,

  // 🔹 Noticias (NewsAPI)
  NEWSAPI_KEY: process.env.NEWSAPI_KEY,

  // 🔹 Puerto del backend
  PORT: process.env.PORT || 5001,
};

export default apiKeys;
