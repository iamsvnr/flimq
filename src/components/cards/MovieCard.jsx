import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoPlay, IoAdd, IoCheckmark, IoStar } from 'react-icons/io5';
import { getPosterUrl, ENDPOINTS } from '@/api/endpoints';
import { getTitle, formatYear, getReleaseDate, getMediaType } from '@/utils/helpers';
import { useMyList } from '@/context/MyListContext';
import { useAuth } from '@/context/AuthContext';
import tmdb from '@/api/tmdb';
import LazyImage from '../ui/LazyImage';
import Modal from '../ui/Modal';

export default function MovieCard({ item, mediaType }) {
  const navigate = useNavigate();
  const { addToList, removeFromList, isInList } = useMyList();
  const { user } = useAuth();
  const type = mediaType || getMediaType(item);
  const title = getTitle(item);
  const year = formatYear(getReleaseDate(item));
  const inList = isInList(item.id, type);

  const [trailerKey, setTrailerKey] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const [loadingTrailer, setLoadingTrailer] = useState(false);

  const handleClick = () => {
    navigate(`/${type}/${item.id}`);
  };

  const handleListToggle = (e) => {
    e.stopPropagation();
    if (inList) {
      removeFromList(item.id, type);
    } else {
      addToList({ ...item, media_type: type });
    }
  };

  const handleTrailer = useCallback(async (e) => {
    e.stopPropagation();
    setLoadingTrailer(true);
    const endpoint = type === 'movie'
      ? ENDPOINTS.MOVIE_VIDEOS(item.id)
      : ENDPOINTS.TV_VIDEOS(item.id);
    try {
      const res = await tmdb.get(endpoint);
      const trailer = res.results?.find(
        (v) => v.type === 'Trailer' && v.site === 'YouTube'
      ) || res.results?.find((v) => v.site === 'YouTube');
      if (trailer) {
        setTrailerKey(trailer.key);
        setShowTrailer(true);
      } else {
        // No trailer found, navigate to detail page instead
        navigate(`/${type}/${item.id}`);
      }
    } catch {
      navigate(`/${type}/${item.id}`);
    }
    setLoadingTrailer(false);
  }, [item.id, type, navigate]);

  return (
    <>
      <div
        className="relative group/card cursor-pointer flex-shrink-0"
        onClick={handleClick}
      >
        <div className="relative rounded-md overflow-hidden transition-shadow duration-300 group-hover/card:shadow-[0_4px_30px_rgba(0,0,0,0.6)]">
          <LazyImage
            src={getPosterUrl(item.poster_path)}
            alt={title}
            className="w-full aspect-[2/3] transition-transform duration-500 group-hover/card:scale-105"
          />

          {/* Rating badge - top left */}
          <div className="absolute top-2 left-2 flex items-center gap-1 px-1.5 py-0.5 bg-black/70 backdrop-blur-sm rounded text-[11px] text-white/80 font-medium">
            <IoStar size={10} className="text-white/60" />
            {item.vote_average?.toFixed(1)}
          </div>

          {/* Add to list - top right (only when signed in) */}
          {user && (
            <button
              onClick={handleListToggle}
              className={`absolute top-2 right-2 p-1.5 rounded-full transition-all opacity-0 group-hover/card:opacity-100 ${
                inList
                  ? 'bg-white text-black'
                  : 'bg-black/50 backdrop-blur-sm text-white border border-white/20 hover:border-white/40'
              }`}
            >
              {inList ? <IoCheckmark size={13} /> : <IoAdd size={13} />}
            </button>
          )}

          {/* Hover overlay with info */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
            {/* Play trailer button - center */}
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={handleTrailer}
                className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-lg transition-transform duration-300 group-hover/card:scale-100 scale-75 hover:bg-white"
              >
                {loadingTrailer ? (
                  <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                ) : (
                  <IoPlay size={18} className="text-black ml-0.5" />
                )}
              </button>
            </div>

            {/* Info at bottom */}
            <h3 className="text-[13px] font-semibold text-white line-clamp-1 mb-0.5">{title}</h3>
            <div className="flex items-center gap-2 text-[11px] text-white/50">
              {year && <span>{year}</span>}
              <span className="px-1 py-px text-[9px] border border-white/20 rounded-sm uppercase">
                {type}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Trailer Modal */}
      <Modal isOpen={showTrailer} onClose={() => setShowTrailer(false)} title={title}>
        <div className="aspect-video">
          {trailerKey && (
            <iframe
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
              allow="autoplay; encrypted-media"
              allowFullScreen
              className="w-full h-full rounded-lg"
            />
          )}
        </div>
      </Modal>
    </>
  );
}
