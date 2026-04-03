import { motion } from 'framer-motion';

// Option L: "The Movie Poster" — A cinematic movie poster builds up.
// Star rating fills in, a credits block scrolls up at the bottom,
// critic quotes fade in, then FLIMQ stands as the title of a blockbuster.
export default function HomeLoaderL() {
  const stars = 5;

  return (
    <div className="fixed inset-0 z-50 bg-[#030303] overflow-hidden">

      {/* ===== POSTER FRAME ===== */}
      <div className="absolute inset-0 flex items-center justify-center z-[5]">
        <motion.div
          className="relative flex flex-col items-center"
          style={{ width: 'min(80vw, 380px)' }}
        >
          {/* Subtle poster border */}
          <motion.div
            className="absolute -inset-6 border border-white/[0.04] rounded"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          />

          {/* ===== TOP: Laurel wreath / festival award ===== */}
          <motion.div
            className="flex items-center gap-3 mb-8"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            {/* Left laurel */}
            <motion.svg width="24" height="40" viewBox="0 0 24 40">
              {[0, 1, 2, 3, 4].map((i) => (
                <motion.ellipse
                  key={`ll-${i}`}
                  cx={16}
                  cy={6 + i * 7}
                  rx="7"
                  ry="3"
                  fill="none"
                  stroke="rgba(255,255,255,0.12)"
                  strokeWidth="0.6"
                  transform={`rotate(-30, 16, ${6 + i * 7})`}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.6 + i * 0.08, duration: 0.4 }}
                />
              ))}
            </motion.svg>

            <motion.p
              className="text-[7px] md:text-[8px] tracking-[0.4em] uppercase text-white/25 text-center leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0, duration: 0.5 }}
            >
              Official
              <br />
              Selection
            </motion.p>

            {/* Right laurel */}
            <motion.svg width="24" height="40" viewBox="0 0 24 40">
              {[0, 1, 2, 3, 4].map((i) => (
                <motion.ellipse
                  key={`rl-${i}`}
                  cx={8}
                  cy={6 + i * 7}
                  rx="7"
                  ry="3"
                  fill="none"
                  stroke="rgba(255,255,255,0.12)"
                  strokeWidth="0.6"
                  transform={`rotate(30, 8, ${6 + i * 7})`}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.6 + i * 0.08, duration: 0.4 }}
                />
              ))}
            </motion.svg>
          </motion.div>

          {/* ===== CRITIC QUOTE ===== */}
          <motion.p
            className="text-[9px] md:text-[11px] italic text-white/20 text-center mb-6 max-w-[260px] leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{ delay: 1.2, duration: 1.5, times: [0, 0.2, 0.7, 1] }}
          >
            &ldquo;A masterpiece of modern cinema...
            <br />
            unlike anything we&apos;ve seen before.&rdquo;
          </motion.p>

          {/* ===== STAR RATING ===== */}
          <motion.div
            className="flex items-center gap-1.5 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
          >
            {Array.from({ length: stars }).map((_, i) => (
              <motion.svg
                key={`star-${i}`}
                width="14"
                height="14"
                viewBox="0 0 24 24"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 0.5, scale: 1 }}
                transition={{
                  delay: 1.6 + i * 0.15,
                  duration: 0.3,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <path
                  d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                  fill="rgba(255,255,255,0.25)"
                  stroke="rgba(255,255,255,0.15)"
                  strokeWidth="0.5"
                />
              </motion.svg>
            ))}
          </motion.div>

          {/* ===== FLIMQ — the movie title ===== */}
          <motion.h1 className="text-5xl md:text-8xl font-black font-heading tracking-[0.25em] mb-3">
            {'FLIMQ'.split('').map((char, i) => (
              <motion.span
                key={i}
                className="inline-block text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 2.0 + i * 0.12,
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {char}
              </motion.span>
            ))}
          </motion.h1>

          {/* Shimmer */}
          <motion.div
            className="absolute inset-0 pointer-events-none z-[2]"
            style={{
              background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.06) 50%, transparent 60%)',
              backgroundSize: '200% 100%',
            }}
            initial={{ backgroundPosition: '-100% 0' }}
            animate={{ backgroundPosition: '200% 0' }}
            transition={{ delay: 2.8, duration: 1, ease: [0.4, 0, 0.2, 1] }}
          />

          {/* Tagline */}
          <motion.p
            className="text-[8px] md:text-[10px] tracking-[0.5em] uppercase text-white/20 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.8, duration: 0.5 }}
          >
            Discover every story
          </motion.p>

          {/* ===== CREDITS BLOCK — bottom ===== */}
          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.0, duration: 0.6 }}
          >
            {/* Divider line */}
            <motion.div
              className="w-full h-[1px] bg-white/[0.06] mb-3"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 3.0, duration: 0.6 }}
            />

            {/* Credits text — movie poster style narrow font */}
            <div className="flex flex-col items-center gap-0.5">
              {[
                'Directed by · Written by · Produced by',
                'Cinematography · Editing · Sound Design',
                'Original Score · Visual Effects',
              ].map((line, i) => (
                <motion.p
                  key={`credit-${i}`}
                  className="text-[5px] md:text-[7px] tracking-[0.2em] uppercase text-white/10 font-light"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 3.2 + i * 0.12, duration: 0.4 }}
                >
                  {line}
                </motion.p>
              ))}
            </div>

            {/* Rating box */}
            <motion.div
              className="flex justify-center mt-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.5, duration: 0.3 }}
            >
              <div className="border border-white/[0.08] px-2 py-0.5">
                <span className="text-[6px] md:text-[8px] tracking-widest uppercase text-white/15">PG-13</span>
              </div>
            </motion.div>
          </motion.div>

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

      {/* Vignette */}
      <div
        className="absolute inset-0 z-[18] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.7) 100%)' }}
      />
    </div>
  );
}
