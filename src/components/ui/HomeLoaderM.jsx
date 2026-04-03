import { motion } from 'framer-motion';

// Option M: "The Details Card" — Enhanced with reviews, ratings, and more detail.
// A full movie detail page assembles: poster, metadata, ratings, description,
// cast, reviews with avatars and text, score breakdown — then dissolves into FLIMQ.
export default function HomeLoaderM() {
  const descLines = [0.7, 1, 0.9, 0.6];
  const genres = ['Drama', 'Thriller', 'Mystery'];
  const castCount = 5;

  const reviews = [
    { width: '90%', textW: [0.85, 1, 0.6], stars: 4 },
    { width: '85%', textW: [1, 0.75], stars: 5 },
    { width: '80%', textW: [0.9, 1, 0.5], stars: 4 },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-[#060606] overflow-hidden">

      {/* ===== MOVIE DETAIL PAGE — assembles piece by piece ===== */}
      <div className="absolute inset-0 flex items-center justify-center z-[5]">
        <motion.div
          className="relative flex gap-4 md:gap-6"
          style={{ width: 'min(90vw, 600px)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{ duration: 4.2, times: [0, 0.05, 0.82, 1] }}
        >
          {/* === LEFT COLUMN: POSTER + SCORES === */}
          <div className="shrink-0 flex flex-col items-center" style={{ width: 'min(26vw, 130px)' }}>

            {/* Poster */}
            <motion.div
              className="w-full rounded overflow-hidden mb-3"
              style={{ aspectRatio: '2/3' }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="relative w-full h-full bg-white/[0.04] border border-white/[0.06]">
                <motion.div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.04) 50%, transparent 70%)',
                    backgroundSize: '200% 100%',
                  }}
                  animate={{ backgroundPosition: ['-100% 0', '200% 0'] }}
                  transition={{ duration: 1.5, repeat: 3, ease: 'linear', delay: 0.3 }}
                />
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.12 }}
                  transition={{ delay: 0.5 }}
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-white">
                    <rect x="2" y="2" width="20" height="20" rx="2" />
                    <line x1="7" y1="2" x2="7" y2="22" />
                    <line x1="17" y1="2" x2="17" y2="22" />
                    <line x1="2" y1="7" x2="7" y2="7" />
                    <line x1="2" y1="12" x2="7" y2="12" />
                    <line x1="2" y1="17" x2="7" y2="17" />
                    <line x1="17" y1="7" x2="22" y2="7" />
                    <line x1="17" y1="12" x2="22" y2="12" />
                    <line x1="17" y1="17" x2="22" y2="17" />
                  </svg>
                </motion.div>
              </div>
            </motion.div>

            {/* Score circle */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.0, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <svg width="52" height="52" viewBox="0 0 52 52">
                <circle cx="26" cy="26" r="22" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="2.5" />
                <motion.circle
                  cx="26" cy="26" r="22"
                  fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2.5"
                  strokeLinecap="round" strokeDasharray={138}
                  style={{ transform: 'rotate(-90deg)', transformOrigin: '26px 26px' }}
                  initial={{ strokeDashoffset: 138 }}
                  animate={{ strokeDashoffset: 138 * 0.16 }}
                  transition={{ delay: 1.2, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                />
                <motion.text
                  x="26" y="24" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="13" fontWeight="bold"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}
                >
                  84
                </motion.text>
                <motion.text
                  x="26" y="33" textAnchor="middle" fill="rgba(255,255,255,0.12)" fontSize="5"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.0 }}
                >
                  Score
                </motion.text>
              </svg>
            </motion.div>

            {/* Audience / Critic mini scores */}
            <motion.div
              className="flex gap-3 mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.2 }}
            >
              {[{ label: 'Critics', val: '92%' }, { label: 'Users', val: '87%' }].map((s, i) => (
                <motion.div
                  key={i}
                  className="flex flex-col items-center"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.3 + i * 0.15 }}
                >
                  <span className="text-[9px] font-bold text-white/25">{s.val}</span>
                  <span className="text-[5px] tracking-[0.15em] uppercase text-white/10">{s.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* === RIGHT COLUMN: ALL DETAILS === */}
          <div className="flex-1 flex flex-col min-w-0 py-0.5 overflow-hidden">

            {/* Title */}
            <motion.div
              className="h-5 md:h-6 rounded bg-white/[0.08] mb-1.5"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{ width: '70%', transformOrigin: 'left' }}
            />

            {/* Subtitle / original title */}
            <motion.div
              className="h-3 rounded bg-white/[0.04] mb-2"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              style={{ width: '45%', transformOrigin: 'left' }}
            />

            {/* Year · Runtime · Cert row */}
            <motion.div
              className="flex items-center gap-2 mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <div className="h-3 w-7 rounded bg-white/[0.05]" />
              <div className="w-[1px] h-2 bg-white/[0.06]" />
              <div className="h-3 w-9 rounded bg-white/[0.05]" />
              <div className="w-[1px] h-2 bg-white/[0.06]" />
              <div className="px-1.5 py-0.5 border border-white/[0.06] rounded">
                <div className="h-2 w-5 bg-white/[0.04]" />
              </div>
            </motion.div>

            {/* Stars + number */}
            <motion.div
              className="flex items-center gap-1 mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              {Array.from({ length: 5 }).map((_, i) => (
                <motion.svg
                  key={`s-${i}`} width="11" height="11" viewBox="0 0 24 24"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: i < 4 ? 0.5 : 0.12, scale: 1 }}
                  transition={{ delay: 1.0 + i * 0.08, duration: 0.2 }}
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                    fill={i < 4 ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.08)'} />
                </motion.svg>
              ))}
              <motion.span className="text-[8px] text-white/20 ml-1"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}>
                8.4/10
              </motion.span>
              <motion.span className="text-[7px] text-white/10 ml-1"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>
                (24.5K)
              </motion.span>
            </motion.div>

            {/* Genre tags */}
            <motion.div className="flex items-center gap-1 mb-2.5"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
              {genres.map((g, i) => (
                <motion.span key={g}
                  className="text-[6px] md:text-[7px] px-1.5 py-0.5 rounded-full border border-white/[0.07] text-white/20 tracking-wider uppercase"
                  initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.3 + i * 0.08 }}>
                  {g}
                </motion.span>
              ))}
            </motion.div>

            {/* Description lines */}
            <div className="flex flex-col gap-1 mb-2.5">
              {descLines.map((w, i) => (
                <motion.div key={`d-${i}`}
                  className="h-[4px] md:h-[5px] rounded-full bg-white/[0.04]"
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  transition={{ delay: 1.5 + i * 0.08, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  style={{ width: `${w * 100}%`, transformOrigin: 'left' }}
                />
              ))}
            </div>

            {/* Cast section */}
            <motion.div className="flex items-center gap-1.5 mb-2.5"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.9 }}>
              <span className="text-[6px] text-white/12 uppercase tracking-wider mr-0.5">Cast</span>
              {Array.from({ length: castCount }).map((_, i) => (
                <motion.div key={`c-${i}`}
                  className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-white/[0.05] border border-white/[0.04]"
                  initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 2.0 + i * 0.06 }} />
              ))}
              <motion.span className="text-[7px] text-white/10 ml-0.5"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.3 }}>
                +12
              </motion.span>
            </motion.div>

            {/* Divider */}
            <motion.div className="w-full h-[1px] bg-white/[0.04] mb-2"
              initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
              transition={{ delay: 2.3, duration: 0.4 }} style={{ transformOrigin: 'left' }} />

            {/* === REVIEWS SECTION === */}
            <motion.span className="text-[7px] text-white/15 uppercase tracking-[0.2em] mb-1.5"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.4 }}>
              Reviews
            </motion.span>

            {reviews.map((review, ri) => (
              <motion.div key={`rev-${ri}`}
                className="flex items-start gap-2 mb-2"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 2.5 + ri * 0.2, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Reviewer avatar */}
                <div className="w-4 h-4 rounded-full bg-white/[0.06] border border-white/[0.03] shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  {/* Name + stars row */}
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <div className="h-[4px] w-10 rounded bg-white/[0.06]" />
                    <div className="flex gap-[1px]">
                      {Array.from({ length: 5 }).map((_, si) => (
                        <div key={si} className={`w-[4px] h-[4px] rounded-full ${si < review.stars ? 'bg-white/20' : 'bg-white/[0.05]'}`} />
                      ))}
                    </div>
                  </div>
                  {/* Review text lines */}
                  <div className="flex flex-col gap-[3px]">
                    {review.textW.map((w, ti) => (
                      <motion.div key={`rt-${ri}-${ti}`}
                        className="h-[3px] rounded-full bg-white/[0.03]"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 2.6 + ri * 0.2 + ti * 0.06, duration: 0.3 }}
                        style={{ width: `${w * 100}%`, transformOrigin: 'left' }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Thumbs / helpful row */}
            <motion.div className="flex items-center gap-4 mt-0.5"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.2 }}>
              <div className="flex items-center gap-1">
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/15">
                  <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z" />
                </svg>
                <span className="text-[6px] text-white/12 font-mono">2.8K</span>
              </div>
              <div className="flex items-center gap-1">
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/15" style={{ transform: 'rotate(180deg)' }}>
                  <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z" />
                </svg>
                <span className="text-[6px] text-white/12 font-mono">312</span>
              </div>
              <span className="text-[6px] text-white/8 ml-auto">842 reviews</span>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* ===== TRANSITION: Page dissolves, FLIMQ appears ===== */}
      <div className="absolute inset-0 flex items-center justify-center z-[10]">
        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.8, duration: 0.5 }}
        >
          <motion.h1 className="text-5xl md:text-8xl font-black font-heading tracking-[0.25em]">
            {'FLIMQ'.split('').map((char, i) => (
              <motion.span
                key={i}
                className="inline-block text-white"
                initial={{ opacity: 0, y: 10, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{
                  delay: 3.9 + i * 0.1,
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
            transition={{ delay: 4.4, duration: 1, ease: [0.4, 0, 0.2, 1] }}
          />

          <motion.p
            className="mt-2 text-[8px] md:text-[10px] tracking-[0.5em] uppercase text-white/15"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4.3, duration: 0.5 }}
          >
            Explore. Discover. Watch.
          </motion.p>

          <motion.div
            className="w-28 h-[1px] bg-white/[0.05] overflow-hidden rounded-full mt-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4.4 }}
          >
            <motion.div
              className="h-full rounded-full bg-white/20"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ delay: 4.4, duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
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
