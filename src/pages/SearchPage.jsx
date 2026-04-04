import { useState, useEffect, useCallback, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { IoSearch } from 'react-icons/io5';
import tmdb from '@/api/tmdb';
import { ENDPOINTS } from '@/api/endpoints';
import { pageVariants, staggerContainer, fadeInUp } from '@/utils/animations';
import { useDebounce } from '@/hooks/useDebounce';
import { useAuth } from '@/context/AuthContext';
import MovieCard from '@/components/cards/MovieCard';
import MovieCardSkeleton from '@/components/cards/MovieCardSkeleton';
import { getMediaType } from '@/utils/helpers';

const TABS = ['All', 'Movies', 'TV Shows'];

export default function SearchPage() {
  const { adultEnabled } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [activeTab, setActiveTab] = useState('All');
  const debouncedQuery = useDebounce(query, 300);
  const loaderRef = useRef(null);

  const fetchResults = useCallback((pageNum, reset = false) => {
    if (!debouncedQuery || debouncedQuery.length < 2) {
      setResults([]);
      return;
    }
    const setter = reset ? setLoading : setLoadingMore;
    setter(true);
    if (reset) setSearchParams({ q: debouncedQuery });

    tmdb.get(ENDPOINTS.SEARCH_MULTI, { params: { query: debouncedQuery, include_adult: adultEnabled, page: pageNum } })
      .then((res) => {
        const filtered = res.results?.filter((r) => r.media_type !== 'person' && (adultEnabled || !r.adult)) || [];
        setResults((prev) => reset ? filtered : [...prev, ...filtered]);
        setTotalPages(res.total_pages || 1);
      })
      .catch(console.error)
      .finally(() => setter(false));
  }, [debouncedQuery, adultEnabled, setSearchParams]);

  // Reset on new query
  useEffect(() => {
    setPage(1);
    fetchResults(1, true);
  }, [fetchResults]);

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
          fetchResults(nextPage);
        }
      },
      { rootMargin: '200px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [loading, loadingMore, page, totalPages, fetchResults]);

  const filtered = results.filter((item) => {
    if (!adultEnabled && item.adult) return false;
    if (activeTab === 'Movies') return getMediaType(item) === 'movie';
    if (activeTab === 'TV Shows') return getMediaType(item) === 'tv';
    return true;
  });

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="pt-24 pb-16 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Search Input */}
      <div className="relative max-w-2xl mx-auto mb-10">
        <IoSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={22} />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for movies and TV shows..."
          className="w-full pl-12 pr-4 py-4 rounded-2xl bg-black/50 text-white text-lg border border-white/10 focus:outline-none focus:border-white/30 transition-colors placeholder:text-white/20"
          autoFocus
        />
      </div>

      {/* Tabs */}
      {results.length > 0 && (
        <div className="flex gap-2 mb-6">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === tab
                  ? 'bg-white text-black'
                  : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      )}

      {/* Results */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <MovieCardSkeleton key={i} />
          ))}
        </div>
      ) : filtered.length > 0 ? (
        <>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
          >
            {filtered.map((item, index) => (
              <motion.div key={`${item.id}-${index}`} variants={fadeInUp}>
                <MovieCard item={item} />
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
      ) : debouncedQuery && !loading ? (
        <div className="text-center py-20">
          <IoSearch className="mx-auto mb-4 text-white/10" size={64} />
          <h3 className="text-xl font-semibold text-white/50 mb-2">No results found</h3>
          <p className="text-white/30">Try a different search term</p>
        </div>
      ) : null}
    </motion.div>
  );
}
