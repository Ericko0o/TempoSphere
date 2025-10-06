export default function Ranking(){
  return (
    <div className="min-h-screen p-8" style={{ background: 'linear-gradient(180deg,#3A506B22,#CFF1FF22)', backgroundImage: "url('/stars-bg.jpg')" }}>
      <div className="max-w-4xl mx-auto backdrop-blur-md bg-white/6 p-6 rounded-2xl border border-white/20 text-white">
        <h1 className="text-2xl font-semibold mb-4">Global Ranking</h1>
        <p>Top polluted cities — data from NASA/OpenAQ integration.</p>
      </div>
    </div>
  );
}