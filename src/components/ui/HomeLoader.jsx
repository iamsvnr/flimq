import { motion } from 'framer-motion';

export default function HomeLoader() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0a0a0a] overflow-hidden">

      {/* Ambient glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[150px]"
        style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Center stage */}
      <div className="relative z-10 flex flex-col items-center">

        {/* Icon trio - Movie, TV, Person */}
        <div className="flex items-center gap-8 md:gap-12 mb-10">
          {/* Film reel - Movies */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <motion.svg
              viewBox="0 0 80 80"
              className="w-14 h-14 md:w-16 md:h-16"
              animate={{ rotate: 360 }}
              transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
            >
              <circle cx="40" cy="40" r="36" fill="none" stroke="white" strokeWidth="1" opacity="0.15" />
              <circle cx="40" cy="40" r="28" fill="none" stroke="white" strokeWidth="0.5" opacity="0.08" />
              {Array.from({ length: 6 }).map((_, i) => {
                const angle = (i * 60 * Math.PI) / 180;
                const cx = 40 + 24 * Math.cos(angle);
                const cy = 40 + 24 * Math.sin(angle);
                return <circle key={i} cx={cx} cy={cy} r="5" fill="none" stroke="white" strokeWidth="0.8" opacity="0.2" />;
              })}
              {Array.from({ length: 6 }).map((_, i) => {
                const angle = (i * 60 * Math.PI) / 180;
                return (
                  <line key={`s${i}`}
                    x1={40 + 8 * Math.cos(angle)} y1={40 + 8 * Math.sin(angle)}
                    x2={40 + 18 * Math.cos(angle)} y2={40 + 18 * Math.sin(angle)}
                    stroke="white" strokeWidth="0.4" opacity="0.1"
                  />
                );
              })}
              <circle cx="40" cy="40" r="6" fill="none" stroke="white" strokeWidth="1.5" opacity="0.2" />
              <circle cx="40" cy="40" r="2" fill="white" opacity="0.3" />
            </motion.svg>
            <motion.p
              className="text-[10px] text-white/20 text-center mt-2 tracking-widest uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >Movies</motion.p>
          </motion.div>

          {/* TV / Antenna - Series */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <motion.svg
              viewBox="0 0 80 80"
              className="w-14 h-14 md:w-16 md:h-16"
            >
              {/* TV frame */}
              <rect x="12" y="22" width="56" height="40" rx="3" fill="none" stroke="white" strokeWidth="1" opacity="0.15" />
              <rect x="16" y="26" width="48" height="32" rx="1" fill="none" stroke="white" strokeWidth="0.5" opacity="0.08" />
              {/* Screen scanline */}
              <motion.rect
                x="16" y="26" width="48" height="2" rx="1" fill="white" opacity="0.06"
                animate={{ y: [26, 56, 26] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              />
              {/* Antenna */}
              <line x1="40" y1="22" x2="28" y2="8" stroke="white" strokeWidth="0.8" opacity="0.15" />
              <line x1="40" y1="22" x2="52" y2="8" stroke="white" strokeWidth="0.8" opacity="0.15" />
              <circle cx="28" cy="8" r="2" fill="white" opacity="0.15" />
              <circle cx="52" cy="8" r="2" fill="white" opacity="0.15" />
              {/* Signal waves */}
              {[14, 20, 26].map((r, i) => (
                <motion.path
                  key={i}
                  d={`M ${52 + r * 0.3} ${8 - r * 0.3} A ${r} ${r} 0 0 1 ${52 + r * 0.3} ${8 + r * 0.3}`}
                  fill="none" stroke="white" strokeWidth="0.5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.15, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                />
              ))}
              {/* Stand */}
              <line x1="32" y1="62" x2="48" y2="62" stroke="white" strokeWidth="0.8" opacity="0.1" />
              <line x1="40" y1="62" x2="40" y2="66" stroke="white" strokeWidth="0.8" opacity="0.1" />
              <line x1="30" y1="66" x2="50" y2="66" stroke="white" strokeWidth="1" opacity="0.12" />
            </motion.svg>
            <motion.p
              className="text-[10px] text-white/20 text-center mt-2 tracking-widest uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >Series</motion.p>
          </motion.div>

          {/* Person silhouette */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <motion.svg
              viewBox="0 0 80 80"
              className="w-14 h-14 md:w-16 md:h-16"
            >
              {/* Head */}
              <circle cx="40" cy="24" r="12" fill="none" stroke="white" strokeWidth="1" opacity="0.15" />
              {/* Body */}
              <path d="M20 65 Q20 42 40 42 Q60 42 60 65" fill="none" stroke="white" strokeWidth="1" opacity="0.15" />
              {/* Scanning line */}
              <motion.line
                x1="18" y1="20" x2="62" y2="20"
                stroke="white" strokeWidth="0.5" opacity="0.12"
                animate={{ y1: [10, 68, 10], y2: [10, 68, 10] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
              />
              {/* Focus ring */}
              <motion.circle
                cx="40" cy="40" r="32" fill="none" stroke="white" strokeWidth="0.5"
                animate={{ opacity: [0.05, 0.12, 0.05], r: [30, 34, 30] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.svg>
            <motion.p
              className="text-[10px] text-white/20 text-center mt-2 tracking-widest uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >People</motion.p>
          </motion.div>
        </div>

        {/* FLIMQ Logo */}
        <motion.h1
          className="text-4xl md:text-6xl font-black font-heading tracking-[0.25em] text-white mb-3"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {'FLIMQ'.split('').map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 + i * 0.08, duration: 0.5, ease: 'easeOut' }}
              className="inline-block"
            >
              {char}
            </motion.span>
          ))}
        </motion.h1>

        {/* Tagline */}
        <motion.p
          className="text-xs text-white/20 tracking-[0.3em] uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.6 }}
        >
          Movies · Series · People
        </motion.p>

        {/* Underline */}
        <motion.div
          className="w-24 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent mt-4"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.8, duration: 0.6 }}
        />

        {/* Progress bar */}
        <motion.div
          className="w-40 h-[2px] bg-white/[0.06] overflow-hidden rounded-full mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <motion.div
            className="h-full rounded-full bg-white/25"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ delay: 2, duration: 2, ease: [0.4, 0, 0.2, 1] }}
          />
        </motion.div>
      </div>

      {/* Corner frames */}
      {[
        'top-6 left-6',
        'top-6 right-6 rotate-90',
        'bottom-6 left-6 -rotate-90',
        'bottom-6 right-6 rotate-180',
      ].map((pos, i) => (
        <motion.div
          key={i}
          className={`absolute ${pos} z-10`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.06 }}
          transition={{ delay: 0.3 + i * 0.1 }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path d="M0 10 L0 0 L10 0" fill="none" stroke="white" strokeWidth="1" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
