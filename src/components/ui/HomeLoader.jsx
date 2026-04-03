import { motion } from 'framer-motion';

export default function HomeLoader() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0a0a0a] overflow-hidden">

      {/* Ambient light */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full blur-[120px]"
        style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* FLIMQ Logo */}
      <div className="relative z-10 mb-10">
        <motion.h1
          className="text-5xl md:text-7xl font-black font-heading tracking-[0.3em] text-white"
          initial={{ opacity: 0, letterSpacing: '0.8em' }}
          animate={{ opacity: 1, letterSpacing: '0.3em' }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {'FLIMQ'.split('').map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.1, duration: 0.6, ease: 'easeOut' }}
              className="inline-block"
            >
              {char}
            </motion.span>
          ))}
        </motion.h1>

        {/* Underline sweep */}
        <motion.div
          className="h-[2px] bg-gradient-to-r from-transparent via-white/40 to-transparent mt-3"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      {/* Content shimmer preview - mimics the page layout */}
      <motion.div
        className="relative z-10 w-full max-w-md px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        {/* Hero placeholder */}
        <div className="w-full h-3 rounded-full bg-white/[0.04] mb-4 overflow-hidden">
          <motion.div
            className="h-full w-1/2 rounded-full"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)' }}
            animate={{ x: ['-100%', '300%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear', delay: 1.2 }}
          />
        </div>
        <div className="w-3/4 h-2 rounded-full bg-white/[0.03] mb-3 overflow-hidden">
          <motion.div
            className="h-full w-1/2 rounded-full"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)' }}
            animate={{ x: ['-100%', '300%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear', delay: 1.4 }}
          />
        </div>

        {/* Row placeholders */}
        <div className="flex gap-2 mt-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.div
              key={i}
              className="flex-1 aspect-[2/3] rounded-md bg-white/[0.03] overflow-hidden"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3 + i * 0.08 }}
            >
              <motion.div
                className="w-full h-full"
                style={{ background: 'linear-gradient(180deg, transparent 40%, rgba(255,255,255,0.03) 100%)' }}
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.15 }}
              />
            </motion.div>
          ))}
        </div>

        {/* Second row */}
        <div className="w-1/3 h-2 rounded-full bg-white/[0.03] mt-6 mb-3" />
        <div className="flex gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.div
              key={i}
              className="flex-1 aspect-[2/3] rounded-md bg-white/[0.02]"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6 + i * 0.08 }}
            />
          ))}
        </div>
      </motion.div>

      {/* Loading indicator */}
      <motion.div
        className="absolute bottom-12 z-10 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        {/* Dot pulse */}
        <div className="flex gap-1.5">
          {Array.from({ length: 3 }).map((_, i) => (
            <motion.div
              key={i}
              className="w-1 h-1 rounded-full bg-white/30"
              animate={{ opacity: [0.2, 0.8, 0.2], scale: [0.8, 1.2, 0.8] }}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </div>
      </motion.div>

      {/* Corner accents */}
      {[
        'top-8 left-8',
        'top-8 right-8 rotate-90',
        'bottom-8 left-8 -rotate-90',
        'bottom-8 right-8 rotate-180',
      ].map((pos, i) => (
        <motion.div
          key={i}
          className={`absolute ${pos} z-10`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.08 }}
          transition={{ delay: 0.5 + i * 0.15 }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20">
            <path d="M0 8 L0 0 L8 0" fill="none" stroke="white" strokeWidth="1" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
