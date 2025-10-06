import { useState } from 'react';
import axios from 'axios';
const API = import.meta.env.VITE_API_URL || 'http://localhost:5001';

export default function Forecast(){
  const [lat,setLat] = useState('');
  const [lon,setLon] = useState('');
  const [preds,setPreds] = useState(null);
  const get = async ()=>{ if(!lat||!lon) return alert('enter coords'); const r=await axios.get(`${API}/api/forecast/predict?lat=${lat}&lon=${lon}&days=5`); setPreds(r.data); }
  return (
    <div className="min-h-screen p-8" style={{ background: 'linear-gradient(180deg,#3A506B22,#CFF1FF22)', backgroundImage: "url('/stars-bg.jpg')" }}>
      <div className="max-w-3xl mx-auto backdrop-blur-md bg-white/6 p-6 rounded-2xl border border-white/20 text-white">
        <h2 className="text-xl font-semibold mb-4">Forecast</h2>
        <div className="flex gap-2">
          <input placeholder="lat" value={lat} onChange={e=>setLat(e.target.value)} className="p-2 rounded bg-transparent border border-white/10" />
          <input placeholder="lon" value={lon} onChange={e=>setLon(e.target.value)} className="p-2 rounded bg-transparent border border-white/10" />
          <button onClick={get} className="px-4 py-2 rounded bg-sky-500">Predict</button>
        </div>
        {preds && <div className="mt-4 text-white">
          <h3 className="font-semibold">Predictions</h3>
          <ul className="mt-2">
            {preds.predictions.map((p,i)=>(<li key={i} className="p-2 bg-white/8 rounded my-2">{p.date} — NO2 {p.NO2} — PM2.5 {p.PM25}</li>))}
          </ul>
        </div>}
      </div>
    </div>
  );
}