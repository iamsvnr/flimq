import { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { IoFilter, IoFilm } from 'react-icons/io5';
import tmdb from '@/api/tmdb';
import { ENDPOINTS } from '@/api/endpoints';
import { pageVariants, staggerContainer, fadeInUp } from '@/utils/animations';
import { useAuth } from '@/context/AuthContext';
import MovieCard from '@/components/cards/MovieCard';
import MovieCardSkeleton from '@/components/cards/MovieCardSkeleton';
import SEO from '@/components/ui/SEO';

const SORT_OPTIONS = [
  { value: 'popularity.desc', label: 'Most Popular' },
  { value: 'vote_average.desc', label: 'Top Rated' },
  { value: 'release_date.desc', label: 'Newest' },
  { value: 'revenue.desc', label: 'Highest Revenue' },
];

export default function MoviesPage() {
  const { adultEnabled } = useAuth();
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [sortBy, setSortBy] = useState('popularity.desc');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const loaderRef = useRef(null);

  useEffect(() => {
    tmdb.get(ENDPOINTS.MOVIE_GENRES).then((res) => setGenres(res.genres || []));
  }, []);

  const fetchMovies = useCallback((pageNum, reset = false) => {
    const setter = pageNum === 1 ? setLoading : setLoadingMore;
    setter(true);
    const params = {
      sort_by: sortBy,
      page: pageNum,
      include_adult: adultEnabled,
      'vote_count.gte': sortBy === 'vote_average.desc' ? 200 : undefined,
    };
    if (selectedGenre) params.with_genres = selectedGenre;

    tmdb.get(ENDPOINTS.DISCOVER_MOVIE, { params })
      .then((res) => {
        setMovies((prev) => {
          const results = adultEnabled ? res.results : res.results.filter((m) => !m.adult);
          return reset ? results : [...prev, ...results];
        });
        setTotalPages(res.total_pages);
      })
      .catch(console.error)
      .finally(() => setter(false));
  }, [sortBy, selectedGenre, adultEnabled]);

  useEffect(() => {
    setPage(1);
    fetchMovies(1, true);
  }, [fetchMovies]);

  // Infinite scroll
  useEffect(() => {
    if (loading || loadingMore) return;
    const el = loaderRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && page < totalPages && !loadingMore) {
          const nextPage = page + 1;
          setPage(nextPage);
          fetchMovies(nextPage);
        }
      },
      { rootMargin: '200px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [loading, loadingMore, page, totalPages, fetchMovies]);

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="pt-24 pb-16 px-4 md:px-8 max-w-7xl mx-auto">
      <SEO title="Movies" description="Browse and discover movies on FLIMQ" />
      <h1 className="text-3xl md:text-4xl font-extrabold font-heading text-white mb-6">Movies</h1>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-8">
        <div className="flex items-center gap-2 text-white/50">
          <IoFilter size={18} />
          <span className="text-sm">Filter:</span>
        </div>

        {/* Genre Chips */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedGenre('')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              !selectedGenre
                ? 'bg-white text-black'
                : 'bg-white/[0.05] text-white/50 hover:bg-white/[0.1] hover:text-white/80 border border-white/[0.06]'
            }`}
          >
            All
          </button>
          {genres.map((g) => (
            <button
              key={g.id}
              onClick={() => setSelectedGenre(String(g.id) === selectedGenre ? '' : String(g.id))}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                String(g.id) === selectedGenre
                  ? 'bg-white text-black'
                  : 'bg-white/[0.05] text-white/50 hover:bg-white/[0.1] hover:text-white/80 border border-white/[0.06]'
              }`}
            >
              {g.name}
            </button>
          ))}
        </div>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-3 py-2 rounded-lg bg-black text-sm text-white border border-white/10 focus:outline-none focus:border-white/30 cursor-pointer ml-auto"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {Array.from({ length: 20 }).map((_, i) => (
            <MovieCardSkeleton key={i} />
          ))}
        </div>
      ) : movies.length > 0 ? (
        <>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
          >
            {movies.map((movie, index) => (
              <motion.div key={`${movie.id}-${index}`} variants={fadeInUp}>
                <MovieCard item={movie} mediaType="movie" />
              </motion.div>
            ))}
          </motion.div>

          {/* Infinite scroll trigger */}
          {page < totalPages && (
            <div ref={loaderRef} className="flex justify-center mt-10 py-8">
              {loadingMore && (
                <div className="flex items-center gap-2 text-white/30 text-sm">
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white/60 rounded-full animate-spin" />
                  Loading more...
                </div>
              )}
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-20">
          <IoFilm className="mx-auto mb-4 text-white/10" size={64} />
          <h3 className="text-xl font-semibold text-white/50 mb-2">No movies found</h3>
          <p className="text-white/30">Try a different genre or sort option</p>
        </div>
      )}
    </motion.div>
  );
}
