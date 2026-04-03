import { motion } from 'framer-motion';
import { pageVariants } from '@/utils/animations';
import HeroSection from '@/components/hero/HeroSection';
import TrendingSection from '@/components/sections/TrendingSection';
import PopularSection from '@/components/sections/PopularSection';
import TopRatedSection from '@/components/sections/TopRatedSection';
import UpcomingSection from '@/components/sections/UpcomingSection';
import GenresSection from '@/components/sections/GenresSection';

export default function HomePage() {
  return (
    <motion.div
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
  );
}
