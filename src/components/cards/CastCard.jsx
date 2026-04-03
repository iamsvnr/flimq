import { useNavigate } from 'react-router-dom';
import { getProfileUrl } from '@/api/endpoints';
import LazyImage from '../ui/LazyImage';

export default function CastCard({ person }) {
  const navigate = useNavigate();

  return (
    <div
      className="flex-shrink-0 text-center group/cast cursor-pointer py-2"
      onClick={() => navigate(`/person/${person.id}`)}
    >
      {/* Circular avatar */}
      <div className="w-24 h-24 md:w-28 md:h-28 mx-auto relative">
        <div className="relative w-full h-full rounded-full overflow-hidden ring-[1.5px] ring-white/[0.08] transition-all duration-400">
          {/* Image */}
          <LazyImage
            src={getProfileUrl(person.profile_path)}
            alt={person.name}
            className="w-full h-full object-cover group-hover/cast:scale-110 transition-transform duration-500 ease-out"
          />

          {/* Hover gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover/cast:opacity-100 transition-opacity duration-300" />
        </div>
      </div>

      {/* Name */}
      <p className="mt-2 text-sm font-medium text-white/40 group-hover/cast:text-white transition-colors duration-300 line-clamp-1">
        {person.name}
      </p>
      {/* Character */}
      <p className="text-[11px] text-white/15 group-hover/cast:text-white/40 transition-colors duration-300 line-clamp-1 mt-0.5">
        {person.character || person.job}
      </p>
    </div>
  );
}
