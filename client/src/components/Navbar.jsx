import { Link } from 'react-router-dom';
export default function Navbar(){
  return (
    <header className="fixed left-1/2 transform -translate-x-1/2 top-6 z-50">
      <div className="flex items-center gap-4 px-4 py-2 rounded-full backdrop-blur-md bg-[#ADAEB3] p-2 border border-white/30">
        <img src="/logo.svg" alt="logo" className="h-10" />
        <div className="hidden md:block text-white font-semibold">TEMPOSPHERE</div>
        <nav className="ml-6 hidden md:flex gap-4">
          <Link to="/" className="text-white">Home</Link>
          <Link to="/discover" className="text-white">Discover</Link>
          <Link to="/news" className="text-white">News</Link>
          <Link to="/forum" className="text-white">Forum</Link>
        </nav>
      </div>
    </header>
  );
}