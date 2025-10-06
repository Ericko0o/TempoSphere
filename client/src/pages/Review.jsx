import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import { useEffect, useState } from 'react';
import axios from 'axios';
const API = import.meta.env.VITE_API_URL || 'http://localhost:5001';

export default function Review(){
  const [obs, setObs] = useState([]);
  useEffect(()=>{
    axios.get(`${API}/api/airquality/global`).then(r=> setObs((r.data.top || []).map((c,i)=> ({ city:c.city, aqi:c.aqi, lat: c.lat|| -12 + Math.random(), lon: c.lon|| -77 + Math.random() }))))
      .catch(()=> setObs([{city:'Demo', aqi:120, lat:-12, lon:-77}]));
  },[]);

  return (
    <div className="min-h-screen p-8" style={{ background: 'linear-gradient(180deg,#3A506B22,#CFF1FF22)', backgroundImage: "url('/stars-bg.jpg')" }}>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-white text-2xl mb-4">Interactive Map</h1>
        <div className="bg-white/6 backdrop-blur-md rounded-2xl p-4 border border-white/20">
          <MapContainer center={[0,0]} zoom={2} style={{height: '60vh'}}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {obs.map((o,i)=> (
              <CircleMarker key={i} center={[o.lat,o.lon]} radius={12} pathOptions={{color: o.aqi>150? '#e74c3c': o.aqi>100? '#e67e22':'#2ecc71' }}>
                <Popup><div><strong>{o.city}</strong><div>AQI {o.aqi}</div></div></Popup>
              </CircleMarker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
}
