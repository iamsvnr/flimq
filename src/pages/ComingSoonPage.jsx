import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { IoCalendar } from 'react-icons/io5';
import tmdb from '@/api/tmdb';
import { ENDPOINTS, getPosterUrl } from '@/api/endpoints';
import { pageVariants, fadeInUp } from '@/utils/animations';
import { formatDate } from '@/utils/helpers';
import MovieCard from '@/components/cards/MovieCard';
import MovieCardSkeleton from '@/components/cards/MovieCardSkeleton';
import SEO from '@/components/ui/SEO';
import { useAuth } from '@/context/AuthContext';

export default function ComingSoonPage() {
  const { preferredLanguage } = useAuth();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const params = {
      sort_by: 'primary_release_date.asc',
      'primary_release_date.gte': today,
      'vote_count.gte': 0,
      page: 1,
    };
    if (preferredLanguage) params.with_original_language = preferredLanguage;

    tmdb.get(ENDPOINTS.DISCOVER_MOVIE, { params })
      .then((res) => setMovies(res.results || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [preferredLanguage]);

  // Group by month
  const groups = movies.reduce((acc, movie) => {
    const date = movie.release_date;
    if (!date) return acc;
    const monthKey = date.slice(0, 7); // "2026-04"
    if (!acc[monthKey]) acc[monthKey] = [];
    acc[monthKey].push(movie);
    return acc;
  }, {});

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="pt-24 pb-16 px-4 md:px-8 max-w-7xl mx-auto">
      <SEO title="Coming Soon" description="Upcoming movies coming soon to theaters" />
      <div className="flex items-center gap-3 mb-8">
        <IoCalendar size={28} className="text-white/40" />
        <h1 className="text-3xl md:text-4xl font-extrabold font-heading text-white">Coming Soon</h1>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {Array.from({ length: 20 }).map((_, i) => (
            <MovieCardSkeleton key={i} />
          ))}
        </div>
      ) : Object.keys(groups).length > 0 ? (
        <div className="space-y-10">
          {Object.entries(groups).map(([monthKey, items]) => {
            const [year, month] = monthKey.split('-');
            const monthName = new Date(year, month - 1).toLocaleString('default', { month: 'long', year: 'numeric' });
            return (
              <div key={monthKey}>
                <h2 className="text-lg font-bold text-white/60 mb-4 pb-2 border-b border-white/[0.06]">
                  {monthName}
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {items.map((movie) => (
                    <motion.div key={movie.id} variants={fadeInUp}>
                      <MovieCard item={movie} mediaType="movie" />
                    </motion.div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-20">
          <IoCalendar className="mx-auto mb-4 text-white/10" size={64} />
          <h3 className="text-xl font-semibold text-white/50 mb-2">No upcoming movies found</h3>
          <p className="text-white/30">Check back later for new releases</p>
        </div>
      )}
    </motion.div>
  );
}
