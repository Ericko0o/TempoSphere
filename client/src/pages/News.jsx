import { useEffect, useState } from 'react';
import axios from 'axios';
const API = import.meta.env.VITE_API_URL || 'http://localhost:5001';

export default function News(){
  const [news, setNews] = useState([]);
  useEffect(()=>{
    axios.get(`${API}/api/news`).then(r=> setNews(r.data.articles || [] )).catch(()=> setNews([{title:'Demo news', summary:'Connect NewsAPI for real data.'}]));
  },[]);

  return (
    <div className="min-h-screen p-8" style={{ background: 'linear-gradient(180deg,#3A506B22,#CFF1FF22)', backgroundImage: "url('/stars-bg.jpg')" }}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-white text-2xl font-semibold mb-4">News</h1>
        {news.map((n,i)=> (
          <article key={i} className="backdrop-blur-md bg-white/6 border border-white/20 rounded-2xl p-4 mb-4 text-white">
            <h3 className="font-semibold">{n.title}</h3>
            <p className="text-sm mt-2">{n.summary || n.description}</p>
            {n.url && <a className="text-xs text-sky-200" href={n.url}>Read more</a>}
          </article>
        ))}
      </div>
    </div>
  );
}