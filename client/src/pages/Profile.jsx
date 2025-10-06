export default function Profile(){
  return (
    <div className="min-h-screen p-8" style={{ background: 'linear-gradient(180deg,#3A506B22,#CFF1FF22)', backgroundImage: "url('/stars-bg.jpg')" }}>
      <div className="max-w-3xl mx-auto backdrop-blur-md bg-white/6 p-6 rounded-2xl border border-white/20 text-white">
        <h1 className="text-2xl font-semibold mb-4">Profile</h1>
        <p>Notification preferences and location-based alerts.</p>
      </div>
    </div>
  );
}