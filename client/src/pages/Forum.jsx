import { useEffect, useState } from 'react';
import axios from 'axios';
const API = import.meta.env.VITE_API_URL || 'http://localhost:5001';

export default function Forum(){
  const [threads, setThreads] = useState([]);
  const [title, setTitle] = useState('');
  useEffect(()=> loadThreads(), []);
  const loadThreads = async ()=> { try{ const r=await axios.get(`${API}/api/forum/threads`); setThreads(r.data);}catch(e){setThreads([]);} }
  const create = async ()=>{ if(!title) return; await axios.post(`${API}/api/forum/threads`, { title, created_by: 'anon' }); setTitle(''); loadThreads(); }

  return (
    <div className="min-h-screen p-8" style={{ background: 'linear-gradient(180deg,#3A506B22,#CFF1FF22)', backgroundImage: "url('/stars-bg.jpg')" }}>
      <div className="max-w-5xl mx-auto grid grid-cols-3 gap-6">
        <div className="col-span-1 backdrop-blur-md bg-white/8 rounded-2xl p-4 border border-white/20">
          <h3 className="text-white font-semibold">Create thread</h3>
          <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Thread title" className="w-full p-2 rounded bg-transparent border border-white/10 text-white mt-2" />
          <button onClick={create} className="mt-3 w-full py-2 rounded bg-sky-500 text-white">Create</button>
        </div>
        <div className="col-span-2 backdrop-blur-md bg-white/6 rounded-2xl p-4 border border-white/20">
          <h3 className="text-white font-semibold mb-3">Threads</h3>
          <ul className="text-white/90 space-y-2">
            {threads.map(t=> <li key={t.id} className="p-3 rounded bg-white/8">{t.title}</li>)}
          </ul>
        </div>
      </div>
    </div>
  );
}
