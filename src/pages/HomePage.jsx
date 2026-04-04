import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { pageVariants } from '@/utils/animations';
import tmdb from '@/api/tmdb';
import { ENDPOINTS } from '@/api/endpoints';
import HeroSection from '@/components/hero/HeroSection';
import TrendingSection from '@/components/sections/TrendingSection';
import PopularSection from '@/components/sections/PopularSection';
import TopRatedSection from '@/components/sections/TopRatedSection';
import UpcomingSection from '@/components/sections/UpcomingSection';
import GenresSection from '@/components/sections/GenresSection';
import RecommendedSection from '@/components/sections/RecommendedSection';
import HomeLoader from '@/components/ui/HomeLoaderM';

import { IoWarning, IoRefresh } from 'react-icons/io5';

const MIN_LOADER_MS = 5000;

export default function HomePage() {
  const [ready, setReady] = useState(false);
  const [apiError, setApiError] = useState(false);

  useEffect(() => {
    const start = Date.now();

    // Preload ALL homepage data before showing the page
    Promise.all([
      tmdb.get(ENDPOINTS.TRENDING_ALL),
      tmdb.get(ENDPOINTS.TRENDING_MOVIES),
      tmdb.get(ENDPOINTS.POPULAR_MOVIES),
      tmdb.get(ENDPOINTS.TOP_RATED_MOVIES),
      tmdb.get(ENDPOINTS.UPCOMING_MOVIES),
    ])
      .then((results) => {
        if (results.every((r) => !r?.results?.length)) setApiError(true);
      })
      .catch(() => setApiError(true))
      .finally(() => {
        const elapsed = Date.now() - start;
        const remaining = Math.max(0, MIN_LOADER_MS - elapsed);
        setTimeout(() => setReady(true), remaining);
      });
  }, []);

  return (
    <AnimatePresence mode="wait">
      {!ready ? (
        <motion.div
          key="loader"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[70] bg-[#0a0a0a]"
        >
          <HomeLoader />
        </motion.div>
      ) : apiError ? (
        <motion.div
          key="error"
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4"
        >
          <div className="text-center max-w-md">
            <IoWarning className="mx-auto mb-4 text-white/15" size={64} />
            <h2 className="text-xl font-bold font-heading text-white mb-2">Something went wrong</h2>
            <p className="text-sm text-white/40 mb-6">Unable to load content. Please check your connection and try again.</p>
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-black text-sm font-bold rounded-md hover:bg-white/85 transition-all active:scale-[0.98]"
            >
              <IoRefresh size={16} />
              Try Again
            </button>
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="content"
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="bg-[#0a0a0a]"
        >
          <HeroSection />
          <div className="relative z-10 -mt-20 space-y-8 pb-16">
            <TrendingSection />
            <RecommendedSection />
            <PopularSection />
            <TopRatedSection />
            <UpcomingSection />
            <GenresSection />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
