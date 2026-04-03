import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { IoFilter } from 'react-icons/io5';
import tmdb from '@/api/tmdb';
import { ENDPOINTS } from '@/api/endpoints';
import { pageVariants, staggerContainer, fadeInUp } from '@/utils/animations';
import MovieCard from '@/components/cards/MovieCard';
import MovieCardSkeleton from '@/components/cards/MovieCardSkeleton';
import Button from '@/components/ui/Button';

const SORT_OPTIONS = [
  { value: 'popularity.desc', label: 'Most Popular' },
  { value: 'vote_average.desc', label: 'Top Rated' },
  { value: 'first_air_date.desc', label: 'Newest' },
];

export default function TvShowsPage() {
  const [shows, setShows] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [sortBy, setSortBy] = useState('popularity.desc');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    tmdb.get(ENDPOINTS.TV_GENRES).then((res) => setGenres(res.genres || []));
  }, []);

  const fetchShows = useCallback((pageNum, reset = false) => {
    const setter = pageNum === 1 ? setLoading : setLoadingMore;
    setter(true);
    const params = {
      sort_by: sortBy,
      page: pageNum,
      'vote_count.gte': sortBy === 'vote_average.desc' ? 200 : undefined,
    };
    if (selectedGenre) params.with_genres = selectedGenre;

    tmdb.get(ENDPOINTS.DISCOVER_TV, { params })
      .then((res) => {
        setShows((prev) => reset ? res.results : [...prev, ...res.results]);
        setTotalPages(res.total_pages);
      })
      .catch(console.error)
      .finally(() => setter(false));
  }, [sortBy, selectedGenre]);

  useEffect(() => {
    setPage(1);
    fetchShows(1, true);
  }, [fetchShows]);

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchShows(nextPage);
  };

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="pt-24 pb-16 px-4 md:px-8 max-w-7xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-extrabold font-heading text-white mb-6">TV Shows</h1>

      <div className="flex flex-wrap items-center gap-3 mb-8">
        <div className="flex items-center gap-2 text-white/50">
          <IoFilter size={18} />
          <span className="text-sm">Filter:</span>
        </div>
        <select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          className="px-3 py-2 rounded-lg bg-black text-sm text-white border border-white/10 focus:outline-none focus:border-white/30 cursor-pointer"
        >
          <option value="">All Genres</option>
          {genres.map((g) => (
            <option key={g.id} value={g.id}>{g.name}</option>
          ))}
        </select>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-3 py-2 rounded-lg bg-black text-sm text-white border border-white/10 focus:outline-none focus:border-white/30 cursor-pointer"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {Array.from({ length: 20 }).map((_, i) => (
            <MovieCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
          >
            {shows.map((show, index) => (
              <motion.div key={`${show.id}-${index}`} variants={fadeInUp}>
                <MovieCard item={show} mediaType="tv" />
              </motion.div>
            ))}
          </motion.div>

          {page < totalPages && (
            <div className="flex justify-center mt-10">
              <Button variant="secondary" size="lg" onClick={loadMore} disabled={loadingMore}>
                {loadingMore ? 'Loading...' : 'Load More'}
              </Button>
            </div>
          )}
        </>
      )}
    </motion.div>
  );
}
