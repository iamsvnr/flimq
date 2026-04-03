import { useLocation } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Footer from './Footer';
import ScrollToTop from '../ui/ScrollToTop';

export default function Layout() {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <Outlet key={location.pathname} />
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}
