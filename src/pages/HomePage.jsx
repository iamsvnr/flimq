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
import MovieLoader from '@/components/ui/MovieLoader';

export default function HomePage() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Preload critical data before showing the page
    Promise.all([
      tmdb.get(ENDPOINTS.TRENDING_ALL),
      tmdb.get(ENDPOINTS.TRENDING_MOVIES),
      tmdb.get(ENDPOINTS.POPULAR_MOVIES),
    ])
      .catch(() => {})
      .finally(() => setReady(true));
  }, []);

  return (
    <AnimatePresence mode="wait">
      {!ready ? (
        <motion.div
          key="loader"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <MovieLoader />
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
