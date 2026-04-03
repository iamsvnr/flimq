import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { IoAdd, IoCheckmark } from 'react-icons/io5';
import { getBackdropUrl } from '@/api/endpoints';
import { getTitle, truncateText, formatYear, getReleaseDate, getMediaType } from '@/utils/helpers';
import { heroContentVariants, heroItemVariants } from '@/utils/animations';
import { useMyList } from '@/context/MyListContext';
import { useAuth } from '@/context/AuthContext';
import Rating from '../ui/Rating';

const slideVariants = {
  enter: () => ({
    opacity: 0,
    scale: 1.05,
  }),
  center: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] },
  },
  exit: () => ({
    opacity: 0,
    scale: 0.98,
    transition: { duration: 0.6 },
  }),
};

export default function HeroSlide({ item, direction }) {
  const navigate = useNavigate();
  const { addToList, removeFromList, isInList } = useMyList();
  const { user } = useAuth();
  const mediaType = getMediaType(item);
  const title = getTitle(item);
  const year = formatYear(getReleaseDate(item));
  const inList = isInList(item.id, mediaType);

  return (
    <motion.div
      custom={direction}
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      className="absolute inset-0"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${getBackdropUrl(item.backdrop_path)})` }}
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/90 via-[#0a0a0a]/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0a0a0a] to-transparent" />

      {/* Content */}
      <motion.div
        variants={heroContentVariants}
        initial="hidden"
        animate="visible"
        className="hero-content absolute bottom-0 left-0 right-0 px-4 md:px-10 pb-28 md:pb-36"
      >
        <div className="max-w-[1400px] mx-auto">
          <div className="max-w-xl">
            {/* Type & meta tags */}
            <motion.div variants={heroItemVariants} className="flex items-center gap-2.5 mb-3">
              <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-white text-black rounded-sm">
                {mediaType === 'movie' ? 'Film' : 'Series'}
              </span>
              <span className="text-white/40 text-xs">{year}</span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <Rating value={item.vote_average} size="sm" />
            </motion.div>

            {/* Title */}
            <motion.h1
              variants={heroItemVariants}
              className="hero-title text-3xl md:text-5xl lg:text-6xl font-black font-heading text-white text-shadow leading-[1.05] mb-4"
            >
              {title}
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={heroItemVariants}
              className="hero-desc text-sm md:text-[15px] text-white/55 mb-6 max-w-lg leading-relaxed"
            >
              {truncateText(item.overview, 160)}
            </motion.p>

            {/* Action buttons */}
            <motion.div variants={heroItemVariants} className="flex items-center gap-3">
              <button
                onClick={() => navigate(`/${mediaType}/${item.id}`)}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-white/10 text-white text-sm font-semibold rounded hover:bg-white/15 transition-all border border-white/[0.08] active:scale-[0.97]"
              >
                More Info
              </button>
              {user && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    inList
                      ? removeFromList(item.id, mediaType)
                      : addToList({ ...item, media_type: mediaType });
                  }}
                  className="ml-1 p-2.5 rounded-full border border-white/15 text-white/60 hover:text-white hover:border-white/30 hover:bg-white/[0.06] transition-all active:scale-[0.92]"
                >
                  {inList ? <IoCheckmark size={18} /> : <IoAdd size={18} />}
                </button>
              )}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
