import { useNavigate } from 'react-router-dom';
import { IoPlay, IoAdd, IoCheckmark, IoStar } from 'react-icons/io5';
import { getPosterUrl } from '@/api/endpoints';
import { getTitle, formatYear, getReleaseDate, getMediaType } from '@/utils/helpers';
import { useMyList } from '@/context/MyListContext';
import { useAuth } from '@/context/AuthContext';
import LazyImage from '../ui/LazyImage';

export default function MovieCard({ item, mediaType }) {
  const navigate = useNavigate();
  const { addToList, removeFromList, isInList } = useMyList();
  const { user } = useAuth();
  const type = mediaType || getMediaType(item);
  const title = getTitle(item);
  const year = formatYear(getReleaseDate(item));
  const inList = isInList(item.id, type);

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

  return (
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
          {/* Play button - center */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-lg transition-transform duration-300 group-hover/card:scale-100 scale-75">
              <IoPlay size={18} className="text-black ml-0.5" />
            </div>
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
  );
}
