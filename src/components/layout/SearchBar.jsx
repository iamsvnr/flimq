import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { IoSearch, IoClose } from 'react-icons/io5';
import { useDebounce } from '@/hooks/useDebounce';
import tmdb from '@/api/tmdb';
import { ENDPOINTS, getPosterUrl } from '@/api/endpoints';
import { getTitle, getMediaType } from '@/utils/helpers';

export default function SearchBar({ show, onToggle }) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const debouncedQuery = useDebounce(query, 300);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (show && inputRef.current) {
      inputRef.current.focus();
    }
  }, [show]);

  useEffect(() => {
    if (debouncedQuery.length < 2) {
      setSuggestions([]);
      return;
    }
    let cancelled = false;
    tmdb.get(ENDPOINTS.SEARCH_MULTI, { params: { query: debouncedQuery } })
      .then((res) => {
        if (!cancelled) {
          setSuggestions(
            res.results
              .filter((item) => item.media_type !== 'person' && item.poster_path)
              .slice(0, 5)
          );
        }
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, [debouncedQuery]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setQuery('');
      setSuggestions([]);
      onToggle();
    }
  };

  const handleSuggestionClick = (item) => {
    const type = getMediaType(item);
    navigate(`/${type}/${item.id}`);
    setQuery('');
    setSuggestions([]);
    onToggle();
  };

  return (
    <div className="relative">
      <AnimatePresence>
        {show ? (
          <motion.form
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 280, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onSubmit={handleSubmit}
            className="flex items-center overflow-hidden"
          >
            <div className="relative flex items-center w-full glass rounded-full px-3 py-1.5">
              <IoSearch className="text-white/50 shrink-0" size={18} />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search movies & shows..."
                className="w-full bg-transparent text-sm text-white pl-2 pr-6 outline-none placeholder:text-white/30"
              />
              <button type="button" onClick={onToggle} className="absolute right-2 text-white/50 hover:text-white">
                <IoClose size={18} />
              </button>
            </div>
          </motion.form>
        ) : (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onToggle}
            className="p-2 text-white/70 hover:text-white transition-colors"
          >
            <IoSearch size={22} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Suggestions Dropdown */}
      <AnimatePresence>
        {suggestions.length > 0 && show && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full right-0 mt-2 w-80 glass-strong rounded-xl overflow-hidden shadow-2xl"
          >
            {suggestions.map((item) => (
              <button
                key={item.id}
                onClick={() => handleSuggestionClick(item)}
                className="flex items-center gap-3 w-full p-3 hover:bg-white/10 transition-colors text-left"
              >
                <img
                  src={getPosterUrl(item.poster_path, 'w92')}
                  alt={getTitle(item)}
                  className="w-10 h-14 object-cover rounded"
                />
                <div>
                  <p className="text-sm font-medium text-white line-clamp-1">{getTitle(item)}</p>
                  <p className="text-xs text-white/50 capitalize">{getMediaType(item)}</p>
                </div>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
