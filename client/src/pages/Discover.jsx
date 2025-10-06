export default function Discover(){
  return (
    <div className="min-h-screen p-8" style={{ background: 'linear-gradient(180deg,#3A506B33,#CFF1FF33)', backgroundImage: "url('/stars-bg.jpg')" }}>
      <div className="max-w-5xl mx-auto grid grid-cols-2 gap-6">
        <div className="backdrop-blur-md bg-white/6 border border-white/20 rounded-2xl p-6 text-white">
          <h2 className="text-2xl font-semibold mb-3">About TEMPO & Data</h2>
          <p>Explanation of TEMPO products (NO₂, HCHO, O₃, AOD) and how our system uses them to forecast and alert.</p>
        </div>
        <div className="backdrop-blur-md bg-white/6 border border-white/20 rounded-2xl p-6 text-white">
          <h2 className="text-2xl font-semibold mb-3">Education — Kids & Adults</h2>
          <div className="grid grid-cols-1 gap-4">
            <button className="p-4 rounded bg-white/10 text-left">Kids: interactive games</button>
            <button className="p-4 rounded bg-white/10 text-left">Adults: guides & mitigation</button>
          </div>
        </div>
      </div>
    </div>
  );
}

