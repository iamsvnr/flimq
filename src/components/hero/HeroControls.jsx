import { motion } from 'framer-motion';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';

export default function HeroControls({ total, current, onPrev, onNext, onDotClick }) {
  return (
    <>
      {/* Side Arrows - Netflix style, edge-mounted */}
      <button
        onClick={onPrev}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-24 flex items-center justify-center bg-black/30 hover:bg-black/60 opacity-0 hover:opacity-100 transition-all duration-300 text-white hidden md:flex rounded-r"
      >
        <IoChevronBack size={28} />
      </button>
      <button
        onClick={onNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-24 flex items-center justify-center bg-black/30 hover:bg-black/60 opacity-0 hover:opacity-100 transition-all duration-300 text-white hidden md:flex rounded-l"
      >
        <IoChevronForward size={28} />
      </button>

      {/* Progress bar indicators - Hotstar/Prime style */}
      <div className="absolute bottom-[72px] landscape:bottom-8 md:bottom-[88px] right-4 md:right-10 z-10 flex items-center gap-1">
        {Array.from({ length: total }).map((_, index) => (
          <button
            key={index}
            onClick={() => onDotClick(index)}
            className="relative h-[3px] rounded-full overflow-hidden transition-all duration-500"
            style={{ width: index === current ? '28px' : '12px' }}
          >
            <div className="absolute inset-0 bg-white/20 rounded-full" />
            {index === current && (
              <motion.div
                className="absolute inset-y-0 left-0 bg-white rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 7, ease: 'linear' }}
              />
            )}
          </button>
        ))}
      </div>
    </>
  );
}
