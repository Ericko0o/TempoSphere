import { useEffect, useState } from "react";

export default function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5001/api/airquality")
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error("Error al conectar con backend:", err));
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-sky-900 to-cyan-700 text-white">
      <h1 className="text-5xl font-bold mb-6 drop-shadow-lg">TempoSphere 🌍</h1>

      {data ? (
        <p className="text-xl">{data.message}</p>
      ) : (
        <p className="text-xl text-gray-300">Conectando con backend...</p>
      )}
    </div>
  );
}
