// client/src/App.jsx
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home.jsx";
import Discover from "./pages/Discover.jsx";
import News from "./pages/News.jsx";
import Forum from "./pages/Forum.jsx";
import Forecast from "./pages/Forecast.jsx";
import Review from "./pages/Review.jsx";
import Ranking from "./pages/Ranking.jsx";
import Profile from "./pages/Profile.jsx";

export default function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5001"}/api/airquality/global`)
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.warn("Warning: backend not reachable — running with mocks", err));
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home data={data} />} />      {/* 👈 ahora Home se renderiza */}
        <Route path="/home" element={<Home data={data} />} />  {/* alias opcional */}
        <Route path="/discover" element={<Discover />} />
        <Route path="/news" element={<News />} />
        <Route path="/review" element={<Review />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/forecast" element={<Forecast />} />
        <Route path="/ranking" element={<Ranking />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}
