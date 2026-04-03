import { motion } from 'framer-motion';

// Option G: "The Clapperboard" — A classic movie slate draws itself,
// the clapper snaps shut, then the slate info morphs into FLIMQ.
export default function HomeLoaderG() {
  return (
    <div className="fixed inset-0 z-50 bg-[#030303] overflow-hidden">

      {/* Subtle spotlight */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 500px 400px at 50% 45%, rgba(255,255,255,0.03), transparent)',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 1 }}
      />

      {/* ===== CLAPPERBOARD ===== */}
      <div className="absolute inset-0 flex items-center justify-center z-[5]">
        <motion.div
          className="relative"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.svg
            width="280"
            height="220"
            viewBox="0 0 280 220"
            className="relative"
          >
            {/* ===== SLATE BODY ===== */}
            <motion.rect
              x="20"
              y="70"
              width="240"
              height="140"
              rx="4"
              fill="rgba(255,255,255,0.03)"
              stroke="rgba(255,255,255,0.15)"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* Slate horizontal lines */}
            {[105, 135, 165].map((y, i) => (
              <motion.line
                key={`line-${i}`}
                x1="35"
                y1={y}
                x2="245"
                y2={y}
                stroke="rgba(255,255,255,0.06)"
                strokeWidth="0.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.8 + i * 0.1, duration: 0.5 }}
              />
            ))}

            {/* Slate text labels */}
            <motion.text
              x="40" y="98" fill="rgba(255,255,255,0.2)" fontSize="8"
              fontFamily="monospace"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0 }}
            >
              PRODUCTION
            </motion.text>
            <motion.text
              x="40" y="128" fill="rgba(255,255,255,0.2)" fontSize="8"
              fontFamily="monospace"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
            >
              DIRECTOR
            </motion.text>
            <motion.text
              x="40" y="158" fill="rgba(255,255,255,0.2)" fontSize="8"
              fontFamily="monospace"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              SCENE
            </motion.text>
            <motion.text
              x="180" y="158" fill="rgba(255,255,255,0.2)" fontSize="8"
              fontFamily="monospace"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 }}
            >
              TAKE
            </motion.text>
            <motion.text
              x="40" y="198" fill="rgba(255,255,255,0.15)" fontSize="8"
              fontFamily="monospace"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
            >
              DATE
            </motion.text>

            {/* Slate text values */}
            <motion.text
              x="120" y="98" fill="rgba(255,255,255,0.35)" fontSize="9"
              fontFamily="monospace" fontWeight="bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 1, 0] }}
              transition={{ delay: 1.2, duration: 1.5 }}
            >
              FLIMQ PICTURES
            </motion.text>
            <motion.text
              x="120" y="128" fill="rgba(255,255,255,0.35)" fontSize="9"
              fontFamily="monospace" fontWeight="bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 1, 0] }}
              transition={{ delay: 1.3, duration: 1.5 }}
            >
              YOUR NAME
            </motion.text>
            <motion.text
              x="80" y="158" fill="rgba(255,255,255,0.35)" fontSize="9"
              fontFamily="monospace" fontWeight="bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 1, 0] }}
              transition={{ delay: 1.4, duration: 1.5 }}
            >
              001
            </motion.text>
            <motion.text
              x="210" y="158" fill="rgba(255,255,255,0.35)" fontSize="9"
              fontFamily="monospace" fontWeight="bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 1, 0] }}
              transition={{ delay: 1.5, duration: 1.5 }}
            >
              01
            </motion.text>

            {/* ===== CLAPPER (top stick) — bottom part ===== */}
            <motion.rect
              x="20"
              y="55"
              width="240"
              height="18"
              rx="2"
              fill="rgba(255,255,255,0.05)"
              stroke="rgba(255,255,255,0.15)"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            />

            {/* Diagonal stripes on bottom clapper */}
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.line
                key={`stripe-b-${i}`}
                x1={30 + i * 30}
                y1={55}
                x2={42 + i * 30}
                y2={73}
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 + i * 0.03 }}
              />
            ))}

            {/* ===== CLAPPER (top stick) — the swinging part ===== */}
            <motion.g
              style={{ transformOrigin: '20px 55px' }}
              initial={{ rotate: -30 }}
              animate={{ rotate: [-30, -30, 0] }}
              transition={{ delay: 0.8, duration: 0.4, ease: [0.7, 0, 0.3, 1], times: [0, 0.3, 1] }}
            >
              <rect
                x="20"
                y="37"
                width="240"
                height="18"
                rx="2"
                fill="rgba(255,255,255,0.08)"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="1"
              />
              {/* Diagonal stripes on top clapper */}
              {Array.from({ length: 8 }).map((_, i) => (
                <line
                  key={`stripe-t-${i}`}
                  x1={30 + i * 30}
                  y1={37}
                  x2={42 + i * 30}
                  y2={55}
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="8"
                />
              ))}
            </motion.g>

            {/* Pivot circle */}
            <motion.circle
              cx="25"
              cy="55"
              r="4"
              fill="rgba(255,255,255,0.1)"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="0.5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            />
          </motion.svg>

          {/* Clap flash */}
          <motion.div
            className="absolute inset-0 bg-white rounded"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.15, 0] }}
            transition={{ delay: 1.15, duration: 0.15 }}
          />
        </motion.div>
      </div>

      {/* ===== SLATE FADES, FLIMQ EMERGES ===== */}
      <div className="absolute inset-0 flex items-center justify-center z-[10]">
        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 0.6 }}
        >
          <motion.h1 className="text-5xl md:text-8xl font-black font-heading tracking-[0.25em]">
            {'FLIMQ'.split('').map((char, i) => (
              <motion.span
                key={i}
                className="inline-block text-white"
                initial={{ opacity: 0, scale: 1.5, filter: 'blur(8px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                transition={{
                  delay: 2.6 + i * 0.1,
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
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.1) 50%, transparent 60%)',
              backgroundSize: '200% 100%',
            }}
            initial={{ backgroundPosition: '-100% 0' }}
            animate={{ backgroundPosition: '200% 0' }}
            transition={{ delay: 3.2, duration: 1, ease: [0.4, 0, 0.2, 1] }}
          />

          <div className="flex items-center gap-2 mt-4">
            <motion.div
              className="h-[1px] bg-gradient-to-r from-transparent to-white/15"
              initial={{ width: 0 }}
              animate={{ width: 40 }}
              transition={{ delay: 3.2, duration: 0.5 }}
            />
            <motion.div
              className="w-1 h-1 rounded-full bg-white/20"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 3.4, duration: 0.3 }}
            />
            <motion.div
              className="h-[1px] bg-gradient-to-l from-transparent to-white/15"
              initial={{ width: 0 }}
              animate={{ width: 40 }}
              transition={{ delay: 3.2, duration: 0.5 }}
            />
          </div>

          {/* Progress */}
          <motion.div
            className="w-28 h-[1px] bg-white/[0.05] overflow-hidden rounded-full mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.4 }}
          >
            <motion.div
              className="h-full rounded-full bg-white/20"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ delay: 3.4, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Film grain */}
      <motion.div
        className="absolute inset-0 z-[20] pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '128px 128px',
        }}
        animate={{ opacity: [0.03, 0.06, 0.03] }}
        transition={{ duration: 0.2, repeat: Infinity }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0 z-[15] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.6) 100%)' }}
      />
    </div>
  );
}
