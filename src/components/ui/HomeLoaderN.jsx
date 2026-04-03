import { motion } from 'framer-motion';

// Option N: "The Review" — A movie review/critic page loads.
// Score circle animates, critic avatars appear, review text types out,
// thumbs up/down tally, then transforms into FLIMQ.
export default function HomeLoaderN() {
  const reviewLines = [
    'An extraordinary cinematic',
    'experience that redefines',
    'the art of storytelling...',
  ];

  return (
    <div className="fixed inset-0 z-50 bg-[#060606] overflow-hidden">

      {/* ===== REVIEW PAGE — assembles itself ===== */}
      <div className="absolute inset-0 flex items-center justify-center z-[5]">
        <motion.div
          className="relative flex flex-col items-center"
          style={{ width: 'min(80vw, 400px)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{ duration: 3.5, times: [0, 0.06, 0.78, 1] }}
        >
          {/* === BIG SCORE CIRCLE === */}
          <motion.div
            className="relative mb-6"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <svg width="90" height="90" viewBox="0 0 90 90">
              {/* Background track */}
              <circle cx="45" cy="45" r="38" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="3" />
              {/* Score arc — fills to 84% */}
              <motion.circle
                cx="45"
                cy="45"
                r="38"
                fill="none"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray={239}
                style={{ transform: 'rotate(-90deg)', transformOrigin: '45px 45px' }}
                initial={{ strokeDashoffset: 239 }}
                animate={{ strokeDashoffset: 239 * 0.16 }}
                transition={{ delay: 0.5, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              />
              {/* Score number */}
              <motion.text
                x="45"
                y="42"
                textAnchor="middle"
                fill="rgba(255,255,255,0.5)"
                fontSize="22"
                fontWeight="bold"
                fontFamily="sans-serif"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.4 }}
              >
                84
              </motion.text>
              <motion.text
                x="45"
                y="56"
                textAnchor="middle"
                fill="rgba(255,255,255,0.15)"
                fontSize="8"
                fontFamily="sans-serif"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4, duration: 0.4 }}
              >
                User Score
              </motion.text>
            </svg>
          </motion.div>

          {/* === CRITIC REVIEWS ROW === */}
          <motion.div
            className="flex items-center justify-center gap-4 mb-5 w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0 }}
          >
            {[
              { score: '92%', label: 'Critics' },
              { score: '87%', label: 'Audience' },
              { score: '4.2', label: 'IMDb style' },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="flex flex-col items-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + i * 0.15, duration: 0.4 }}
              >
                <span className="text-sm md:text-base font-bold text-white/30">{item.score}</span>
                <span className="text-[6px] md:text-[8px] tracking-[0.2em] uppercase text-white/10 mt-0.5">{item.label}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Divider */}
          <motion.div
            className="w-full h-[1px] bg-white/[0.04] mb-4"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
          />

          {/* === REVIEW TEXT — typewriter style === */}
          <div className="w-full mb-4">
            {/* Critic avatar + name */}
            <motion.div
              className="flex items-center gap-2 mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6 }}
            >
              <div className="w-5 h-5 rounded-full bg-white/[0.06] border border-white/[0.04]" />
              <div className="h-[6px] w-16 rounded bg-white/[0.06]" />
              <div className="flex gap-0.5 ml-auto">
                {Array.from({ length: 5 }).map((_, i) => (
                  <motion.svg
                    key={`rs-${i}`}
                    width="8"
                    height="8"
                    viewBox="0 0 24 24"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: i < 4 ? 0.4 : 0.1 }}
                    transition={{ delay: 1.8 + i * 0.06 }}
                  >
                    <path
                      d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                      fill="currentColor"
                      className="text-white"
                    />
                  </motion.svg>
                ))}
              </div>
            </motion.div>

            {/* Review text lines — appear with typing effect */}
            {reviewLines.map((line, i) => (
              <motion.p
                key={`rev-${i}`}
                className="text-[10px] md:text-xs text-white/15 italic leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.0 + i * 0.25, duration: 0.3 }}
              >
                {i === 0 && <span className="text-white/20">&ldquo;</span>}
                {line}
                {i === reviewLines.length - 1 && <span className="text-white/20">&rdquo;</span>}
              </motion.p>
            ))}
          </div>

          {/* === THUMBS ROW === */}
          <motion.div
            className="flex items-center justify-center gap-6 mb-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.6 }}
          >
            <motion.div
              className="flex items-center gap-1.5"
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 0.3, x: 0 }}
              transition={{ delay: 2.7, duration: 0.3 }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white">
                <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z" />
                <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
              </svg>
              <span className="text-[9px] text-white/20 font-mono">2,847</span>
            </motion.div>
            <motion.div
              className="flex items-center gap-1.5"
              initial={{ opacity: 0, x: 5 }}
              animate={{ opacity: 0.3, x: 0 }}
              transition={{ delay: 2.8, duration: 0.3 }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white" style={{ transform: 'rotate(180deg)' }}>
                <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z" />
                <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
              </svg>
              <span className="text-[9px] text-white/20 font-mono">312</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* ===== FLIMQ — emerges after review fades ===== */}
      <div className="absolute inset-0 flex items-center justify-center z-[10]">
        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.2, duration: 0.5 }}
        >
          <motion.h1 className="text-5xl md:text-8xl font-black font-heading tracking-[0.25em]">
            {'FLIMQ'.split('').map((char, i) => (
              <motion.span
                key={i}
                className="inline-block text-white"
                initial={{ opacity: 0, y: 10, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{
                  delay: 3.3 + i * 0.1,
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {char}
              </motion.span>
            ))}
          </motion.h1>

          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.08) 50%, transparent 60%)',
              backgroundSize: '200% 100%',
            }}
            initial={{ backgroundPosition: '-100% 0' }}
            animate={{ backgroundPosition: '200% 0' }}
            transition={{ delay: 3.8, duration: 1, ease: [0.4, 0, 0.2, 1] }}
          />

          <motion.p
            className="mt-2 text-[8px] md:text-[10px] tracking-[0.5em] uppercase text-white/15"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.7, duration: 0.5 }}
          >
            Reviews. Ratings. Stories.
          </motion.p>

          <motion.div
            className="w-28 h-[1px] bg-white/[0.05] overflow-hidden rounded-full mt-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.8 }}
          >
            <motion.div
              className="h-full rounded-full bg-white/20"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ delay: 3.8, duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Vignette */}
      <div
        className="absolute inset-0 z-[15] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.5) 100%)' }}
      />
    </div>
  );
}
