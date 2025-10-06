import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import { FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
import GlobeGIBS from "../components/GlobeGIBS.jsx";
import Navbar from "../components/Navbar.jsx";

export default function Home({ data }) {
  const [search, setSearch] = useState("");
  const [layer, setLayer] = useState("BlueMarble_ShadedRelief");
  const [collapsed, setCollapsed] = useState(false);
  const [topCities, setTopCities] = useState([]);
  const globeRef = useRef(null);

  useEffect(() => {
    if (data?.top) setTopCities(data.top);
    else setTopCities([{ city: "Delhi", aqi: 220 }, { city: "Beijing", aqi: 190 }, { city: "Lima", aqi: 150 }]);
  }, [data]);

  // scroll effect: when user scrolls down, move globe left and hide it after threshold
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const el = globeRef.current;
      if (!el) return;
      // translate left progressively
      const translateX = Math.min(0, -Math.min(500, y) / 2); // up to -250px
      const opacity = y < 400 ? 1 - y / 400 : 0;
      el.style.transform = `translateX(${translateX}px)`;
      el.style.opacity = opacity;
      setCollapsed(y > 420);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSearch = () => {
    if (!search) return;
    window.location.href = `/review?q=${encodeURIComponent(search)}`;
  };

  return (
    <div className="min-h-screen relative" style={{ backgroundImage: `url('/stars-bg.jpg')`, backgroundSize: 'cover' }}>
      {/* blue gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#3A506B]/60 to-[#CFF1FF]/60" />

      {/* Top navbar centered */}
      <Navbar />

      <main className="relative z-20">
        <section className="pt-28 pb-12 container mx-auto px-6 flex items-start gap-6">
          {/* left nav icons (vertical) */}
          <aside className="w-44 hidden md:block">
            <div className="backdrop-blur-md bg-white/8 border border-white/10 rounded-3xl p-3 sticky top-28">
              <ul className="flex flex-col gap-4">
                <li><Link to="/" className="flex items-center gap-3 text-white hover:text-sky-200">🏠 <span className="ml-2 hidden md:inline">Home</span></Link></li>
                <li><Link to="/discover" className="flex items-center gap-3 text-white hover:text-sky-200">🔎 <span className="ml-2 hidden md:inline">Discover</span></Link></li>
                <li><Link to="/news" className="flex items-center gap-3 text-white hover:text-sky-200">📰 <span className="ml-2 hidden md:inline">News</span></Link></li>
                <li><Link to="/forum" className="flex items-center gap-3 text-white hover:text-sky-200">💬 <span className="ml-2 hidden md:inline">Forum</span></Link></li>
                <li><Link to="/forecast" className="flex items-center gap-3 text-white hover:text-sky-200">📈 <span className="ml-2 hidden md:inline">Forecast</span></Link></li>
              </ul>
            </div>
          </aside>

          {/* center globe area */}
          <div className="flex-1 flex justify-center items-start">
            <div ref={globeRef} className="w-full max-w-3xl h-[68vh] rounded-2xl overflow-hidden drop-shadow-2xl transition-all duration-500">
              <Canvas camera={{ position: [0, 0, 3], fov: 45 }}>
                <ambientLight intensity={0.9} />
                <directionalLight position={[5, 3, 5]} intensity={0.6} />
                <Suspense fallback={<Html center><div className="text-white">Cargando globo...</div></Html>}>
                  <GlobeGIBS baseLayer={layer} overlayLayer={null} time={'default'} />
                </Suspense>
                <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.12} />
              </Canvas>
            </div>
          </div>

          {/* right panels */}
          <aside className="w-96 hidden lg:block">
            <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-4 mb-6">
              <div className="flex items-center gap-2">
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search city or lat,lon" className="flex-1 bg-transparent outline-none text-white placeholder-white/60" />
                <button onClick={handleSearch} className="p-2 rounded bg-white/8"><FiSearch className="text-white" /></button>
              </div>
              <p className="text-xs text-white/70 mt-2">TEMPO · ground stations · forecast</p>
            </div>

            <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-4 mb-6">
              <h3 className="text-white font-semibold mb-3">Top polluted cities</h3>
              <ul className="text-white/90 text-sm space-y-2">
                {topCities.map((c, i) => (<li key={i} className="flex justify-between"><span>{i+1}. {c.city}</span><span>AQI {c.aqi}</span></li>))}
              </ul>
              <Link to="/ranking" className="text-xs text-sky-200 mt-2 inline-block">View full ranking</Link>
            </div>

            <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-4">
              <h3 className="text-white font-semibold mb-2">Latest news</h3>
              <p className="text-white/90 text-sm">Official news and air quality alerts. <Link to="/news" className="text-sky-200 ml-1">Read more</Link></p>
            </div>

            <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-4 mt-6">
              <h3 className="text-white font-semibold mb-2">Layers</h3>
              <div className="flex gap-2 flex-wrap">
                <button onClick={() => setLayer('BlueMarble_ShadedRelief')} className="px-3 py-1 rounded bg-white/20 text-white text-xs">Earth</button>
                <button onClick={() => setLayer('OMI_NO2_Column_Amount_Tropospheric')} className="px-3 py-1 rounded bg-yellow-500/30 text-white text-xs">NO₂</button>
                <button onClick={() => setLayer('MODIS_Terra_Aerosol')} className="px-3 py-1 rounded bg-red-500/30 text-white text-xs">Aerosols</button>
                <button onClick={() => setLayer('MERRA2_PM25')} className="px-3 py-1 rounded bg-green-500/30 text-white text-xs">PM2.5</button>
              </div>
            </div>
          </aside>
        </section>

        {/* scroll section: detailed content (news + ranking) */}
        <section className="container mx-auto px-6 pb-24">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-8 backdrop-blur-md bg-white/6 border border-white/20 rounded-2xl p-6">
              <h2 className="text-white text-2xl font-semibold mb-4">Project & TEMPO overview</h2>
              <p className="text-white/90">TEMPOSPHERE uses TEMPO and other satellite data to inform citizens, predict exposures, and educate. Click Discover to learn more.</p>

              <div className="mt-6">
                <h3 className="text-white font-semibold mb-2">Latest news</h3>
                {/* placeholder list -> link to /news */}
                <ul className="space-y-3 text-white/90">
                  <li>NASA: New TEMPO near real-time NO₂ product released.</li>
                  <li>City X issues air quality advisory after wildfire smoke.</li>
                </ul>
              </div>
            </div>

            <aside className="col-span-4">
              <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-4">
                <h3 className="text-white font-semibold mb-3">Ranking — top cities</h3>
                <ul className="text-white/90">
                  {topCities.map((c,i)=> (<li key={i} className="py-2">{i+1}. {c.city} — AQI {c.aqi}</li>))}
                </ul>
                <Link to="/ranking" className="text-xs text-sky-200 mt-3 inline-block">See more</Link>
              </div>
            </aside>
          </div>
        </section>
      </main>

      {/* sticky analyze button */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
        <Link to="/review" className="px-6 py-3 rounded-full bg-gradient-to-r from-[#00C2FF] to-[#00A6E6] text-white font-semibold">Analyze my location</Link>
      </div>
    </div>
  );
}