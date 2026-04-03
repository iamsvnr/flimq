import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { IoSearch, IoMenu, IoLogOutOutline, IoPersonOutline, IoSettingsOutline } from 'react-icons/io5';
import { useAuth } from '@/context/AuthContext';
import SearchBar from './SearchBar';
import MobileMenu from './MobileMenu';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/movies', label: 'Movies' },
  { to: '/tv-shows', label: 'TV Shows' },
  { to: '/my-list', label: 'Watchlist', authOnly: true },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, adultEnabled, toggleAdult } = useAuth();
  const profileRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setShowSearch(false);
    setShowProfileMenu(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClick = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleLogout = () => {
    logout();
    setShowProfileMenu(false);
    navigate('/');
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          isScrolled
            ? 'py-1.5 bg-[#0a0a0a]/98 backdrop-blur-md shadow-[0_1px_0_rgba(255,255,255,0.03)]'
            : 'py-3 bg-gradient-to-b from-[#0a0a0a]/90 via-[#0a0a0a]/50 to-transparent'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-4 md:px-10 flex items-center gap-8">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group flex-shrink-0">
            <div className="w-8 h-8 bg-white flex items-center justify-center rounded-sm group-hover:bg-white/90 transition-colors">
              <span className="text-black font-black text-base font-heading leading-none">F</span>
            </div>
            <span className="text-lg font-bold font-heading text-white tracking-wider hidden sm:block">
              FLIMQ
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1 flex-1">
            {navLinks.filter((link) => !link.authOnly || user).map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `relative px-3 py-1.5 text-[13px] font-medium transition-all duration-300 rounded-md ${
                    isActive
                      ? 'text-white bg-white/[0.08]'
                      : 'text-white/50 hover:text-white hover:bg-white/[0.04]'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-1.5 ml-auto">
            <SearchBar show={showSearch} onToggle={() => setShowSearch(!showSearch)} />

            {user ? (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="w-8 h-8 rounded-full overflow-hidden ring-1 ring-white/10 hover:ring-white/30 transition-all"
                >
                  <img
                    src={user.avatarUrl}
                    alt={user.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.classList.add('bg-white/10', 'flex', 'items-center', 'justify-center');
                      e.target.parentElement.innerHTML = `<span class="text-sm font-bold text-white/70">${user.avatar}</span>`;
                    }}
                  />
                </button>

                <AnimatePresence>
                  {showProfileMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 5, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 5, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-2 w-52 bg-[#141414] border border-white/[0.08] rounded-lg shadow-2xl overflow-hidden"
                    >
                      <div className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.06]">
                        <img
                          src={user.avatarUrl}
                          alt={user.name}
                          className="w-9 h-9 rounded-full ring-1 ring-white/10 object-cover flex-shrink-0"
                        />
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-white truncate">{user.name}</p>
                          <p className="text-xs text-white/30 truncate">{user.email}</p>
                        </div>
                      </div>
                      <div className="py-1">
                        <Link
                          to="/profile"
                          onClick={() => setShowProfileMenu(false)}
                          className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-white/50 hover:text-white hover:bg-white/[0.04] transition-colors"
                        >
                          <IoSettingsOutline size={15} />
                          Profile
                        </Link>
                        <Link
                          to="/my-list"
                          onClick={() => setShowProfileMenu(false)}
                          className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-white/50 hover:text-white hover:bg-white/[0.04] transition-colors"
                        >
                          <IoPersonOutline size={15} />
                          Watchlist
                        </Link>
                        {user.isAdult && (
                          <button
                            onClick={toggleAdult}
                            className="flex items-center justify-between px-4 py-2.5 text-sm text-white/50 hover:text-white hover:bg-white/[0.04] transition-colors w-full"
                          >
                            <span>18+ Content</span>
                            <div className={`w-8 h-[18px] rounded-full transition-colors relative ${adultEnabled ? 'bg-white/30' : 'bg-white/10'}`}>
                              <div className={`absolute top-[2px] w-[14px] h-[14px] rounded-full transition-all ${adultEnabled ? 'left-[15px] bg-white' : 'left-[2px] bg-white/40'}`} />
                            </div>
                          </button>
                        )}
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-white/50 hover:text-white hover:bg-white/[0.04] transition-colors w-full text-left"
                        >
                          <IoLogOutOutline size={15} />
                          Sign Out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden md:flex items-center px-3.5 py-1.5 text-[13px] font-medium text-white/60 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] rounded-md transition-all border border-white/[0.06]"
              >
                Sign In
              </Link>
            )}

            <button
              onClick={() => setShowMobileMenu(true)}
              className="md:hidden p-2 rounded-md text-white/50 hover:text-white hover:bg-white/[0.04] transition-all"
            >
              <IoMenu size={22} />
            </button>
          </div>
        </div>
      </nav>

      <MobileMenu
        isOpen={showMobileMenu}
        onClose={() => setShowMobileMenu(false)}
        links={navLinks.filter((link) => !link.authOnly || user)}
        user={user}
        adultEnabled={adultEnabled}
        toggleAdult={toggleAdult}
      />
    </>
  );
}
