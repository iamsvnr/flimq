import { useLocation } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { IoMailOutline, IoClose } from 'react-icons/io5';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollToTop from '../ui/ScrollToTop';

function EmailBanner() {
  const { user } = useAuth();
  const [dismissed, setDismissed] = useState(false);

  if (!user || user.emailVerified || dismissed) return null;

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      className="fixed top-0 left-0 right-0 z-[60] bg-amber-500/10 backdrop-blur-md border-b border-amber-500/15"
    >
      <div className="max-w-[1400px] mx-auto px-4 md:px-10 py-2 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <IoMailOutline size={16} className="text-amber-400/80 flex-shrink-0" />
          <p className="text-xs text-amber-400/80 truncate">
            <span className="font-medium">Verify your email</span>
            <span className="hidden sm:inline text-amber-400/50"> — Check your inbox for a verification link to {user.email}</span>
          </p>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="p-1 text-amber-400/40 hover:text-amber-400/80 transition-colors flex-shrink-0"
        >
          <IoClose size={14} />
        </button>
      </div>
    </motion.div>
  );
}

export default function Layout() {
  const { user } = useAuth();
  const location = useLocation();
  const showBanner = user && !user.emailVerified;

  return (
    <div className="min-h-screen flex flex-col">
      <EmailBanner />
      <div style={{ paddingTop: showBanner ? 36 : 0 }} className="transition-[padding] duration-300">
        <Navbar />
        <ScrollToTop />
        <main className="flex-1">
          <AnimatePresence mode="wait">
            <Outlet key={location.pathname} />
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </div>
  );
}
