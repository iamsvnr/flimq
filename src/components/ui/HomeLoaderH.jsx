import { motion } from 'framer-motion';

// Option H: "Cinema Countdown" — The classic film leader countdown
// 5...4...3...2...1 with the rotating crosshair, scratchy film grain,
// sprocket holes scrolling, then FLIMQ title card appears.
export default function HomeLoaderH() {
  const numbers = [5, 4, 3, 2, 1];

  return (
    <div className="fixed inset-0 z-50 bg-[#030303] overflow-hidden">

      {/* ===== SPROCKET HOLES — left side ===== */}
      <motion.div
        className="absolute left-2 md:left-6 top-0 bottom-0 w-4 z-[3] overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          animate={{ y: [0, -48] }}
          transition={{ duration: 0.5, repeat: Infinity, ease: 'linear' }}
        >
          {Array.from({ length: 40 }).map((_, i) => (
            <div
              key={`l-${i}`}
              className="w-3 h-4 rounded-sm border border-white/30 mb-2"
            />
          ))}
        </motion.div>
      </motion.div>

      {/* ===== SPROCKET HOLES — right side ===== */}
      <motion.div
        className="absolute right-2 md:right-6 top-0 bottom-0 w-4 z-[3] overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          animate={{ y: [0, -48] }}
          transition={{ duration: 0.5, repeat: Infinity, ease: 'linear' }}
        >
          {Array.from({ length: 40 }).map((_, i) => (
            <div
              key={`r-${i}`}
              className="w-3 h-4 rounded-sm border border-white/30 mb-2"
            />
          ))}
        </motion.div>
      </motion.div>

      {/* ===== FILM FRAME BORDER ===== */}
      <motion.div
        className="absolute inset-8 md:inset-16 border border-white/[0.06] rounded z-[2]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      />

      {/* ===== COUNTDOWN CIRCLE AND NUMBERS ===== */}
      <div className="absolute inset-0 flex items-center justify-center z-[10]">

        {/* Crosshair lines */}
        <motion.div
          className="absolute w-[1px] h-40 md:h-60 bg-white/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.3, 0.3, 0] }}
          transition={{ duration: 3.2 }}
        />
        <motion.div
          className="absolute w-40 md:w-60 h-[1px] bg-white/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.3, 0.3, 0] }}
          transition={{ duration: 3.2 }}
        />

        {/* Outer circle */}
        <svg className="absolute w-48 h-48 md:w-64 md:h-64" viewBox="0 0 200 200">
          <motion.circle
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: [0, 1, 1, 0] }}
            transition={{ duration: 3.2, times: [0, 0.15, 0.9, 1] }}
          />
          {/* Rotating countdown wiper — sweeps around for each number */}
          <motion.circle
            cx="100"
            cy="100"
            r="80"
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="2"
            strokeDasharray="502"
            initial={{ strokeDashoffset: 502, rotate: -90 }}
            animate={{
              strokeDashoffset: [502, 0, 502, 0, 502, 0, 502, 0, 502, 0],
              rotate: -90,
            }}
            style={{ transformOrigin: '100px 100px' }}
            transition={{
              duration: 3,
              ease: 'linear',
              times: [0, 0.19, 0.2, 0.39, 0.4, 0.59, 0.6, 0.79, 0.8, 1],
            }}
          />
          {/* Inner circle */}
          <motion.circle
            cx="100"
            cy="100"
            r="6"
            fill="rgba(255,255,255,0.1)"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{ duration: 3.2, times: [0, 0.05, 0.9, 1] }}
          />
        </svg>

        {/* Countdown numbers */}
        {numbers.map((num, i) => (
          <motion.span
            key={num}
            className="absolute text-7xl md:text-9xl font-black font-heading text-white/60"
            style={{ fontVariantNumeric: 'tabular-nums' }}
            initial={{ opacity: 0, scale: 1.3 }}
            animate={{
              opacity: [0, 0.8, 0.8, 0],
              scale: [1.3, 1, 1, 0.95],
            }}
            transition={{
              delay: i * 0.6,
              duration: 0.6,
              ease: 'easeOut',
              times: [0, 0.15, 0.8, 1],
            }}
          >
            {num}
          </motion.span>
        ))}
      </div>

      {/* ===== FLIMQ TITLE CARD — after countdown ===== */}
      <div className="absolute inset-0 flex items-center justify-center z-[15]">
        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.2, duration: 0.3 }}
        >
          <motion.h1 className="text-5xl md:text-8xl font-black font-heading tracking-[0.25em]">
            {'FLIMQ'.split('').map((char, i) => (
              <motion.span
                key={i}
                className="inline-block text-white"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 3.2 + i * 0.08,
                  duration: 0.4,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {char}
              </motion.span>
            ))}
          </motion.h1>

          {/* Shimmer sweep */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.1) 50%, transparent 60%)',
              backgroundSize: '200% 100%',
            }}
            initial={{ backgroundPosition: '-100% 0' }}
            animate={{ backgroundPosition: '200% 0' }}
            transition={{ delay: 3.6, duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          />

          <div className="flex items-center gap-2 mt-3">
            <motion.div
              className="h-[1px] bg-gradient-to-r from-transparent to-white/15"
              initial={{ width: 0 }}
              animate={{ width: 35 }}
              transition={{ delay: 3.5, duration: 0.4 }}
            />
            <motion.div
              className="w-1 h-1 rounded-full bg-white/20"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 3.6 }}
            />
            <motion.div
              className="h-[1px] bg-gradient-to-l from-transparent to-white/15"
              initial={{ width: 0 }}
              animate={{ width: 35 }}
              transition={{ delay: 3.5, duration: 0.4 }}
            />
          </div>

          {/* Progress */}
          <motion.div
            className="w-28 h-[1px] bg-white/[0.05] overflow-hidden rounded-full mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.6 }}
          >
            <motion.div
              className="h-full rounded-full bg-white/20"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ delay: 3.6, duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* ===== FILM SCRATCHES — vertical lines flicker ===== */}
      {Array.from({ length: 4 }).map((_, i) => (
        <motion.div
          key={`scratch-${i}`}
          className="absolute top-0 bottom-0 w-[1px] bg-white z-[18] pointer-events-none"
          style={{ left: `${20 + i * 20 + Math.random() * 10}%` }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.04, 0, 0, 0.03, 0],
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: i * 0.3,
            repeatDelay: 1 + Math.random() * 2,
          }}
        />
      ))}

      {/* Film grain */}
      <motion.div
        className="absolute inset-0 z-[20] pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '128px 128px',
        }}
        animate={{ opacity: [0.05, 0.08, 0.05] }}
        transition={{ duration: 0.12, repeat: Infinity }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0 z-[19] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, transparent 25%, rgba(0,0,0,0.6) 100%)' }}
      />
    </div>
  );
}
