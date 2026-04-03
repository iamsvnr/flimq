import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="mt-auto bg-[#0a0a0a]">
      <div className="max-w-[1400px] mx-auto px-4 md:px-10 py-10">
        {/* Links Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 mb-8">
          <div>
            <h4 className="text-[11px] font-semibold text-white/25 uppercase tracking-widest mb-3">Browse</h4>
            <div className="flex flex-col gap-2">
              <Link to="/movies" className="text-[12px] text-white/30 hover:text-white/60 transition-colors">Movies</Link>
              <Link to="/tv-shows" className="text-[12px] text-white/30 hover:text-white/60 transition-colors">TV Shows</Link>
              <Link to="/search" className="text-[12px] text-white/30 hover:text-white/60 transition-colors">Search</Link>
              <Link to="/coming-soon" className="text-[12px] text-white/30 hover:text-white/60 transition-colors">Coming Soon</Link>
            </div>
          </div>
          <div>
            <h4 className="text-[11px] font-semibold text-white/25 uppercase tracking-widest mb-3">Account</h4>
            <div className="flex flex-col gap-2">
              <Link to="/my-list" className="text-[12px] text-white/30 hover:text-white/60 transition-colors">Watchlist</Link>
              <Link to="/profile" className="text-[12px] text-white/30 hover:text-white/60 transition-colors">Profile</Link>
              <Link to="/login" className="text-[12px] text-white/30 hover:text-white/60 transition-colors">Sign In</Link>
            </div>
          </div>
          <div>
            <h4 className="text-[11px] font-semibold text-white/25 uppercase tracking-widest mb-3">Info</h4>
            <div className="flex flex-col gap-2">
              <span className="text-[12px] text-white/20">Powered by TMDB API</span>
              <span className="text-[12px] text-white/20">Avatars by DiceBear</span>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-6 border-t border-white/[0.04] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-white/10 flex items-center justify-center rounded-sm">
              <span className="text-white/40 font-black text-[9px] font-heading">F</span>
            </div>
            <span className="text-[11px] text-white/12 font-medium tracking-wide">FLIMQ</span>
          </div>
          <p className="text-[11px] text-white/12">
            &copy; {new Date().getFullYear()} &middot; Data by TMDB
          </p>
        </div>
      </div>
    </footer>
  );
}
