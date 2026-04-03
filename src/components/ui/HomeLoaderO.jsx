import { motion } from 'framer-motion';

// Option O: "The Database" — Movie data streams in like a database loading.
// Multiple movie cards scroll/fly in from different directions,
// data fields populate (title bars, ratings, posters), creating a sense
// of a massive movie database coming alive — then crystallizes into FLIMQ.
export default function HomeLoaderO() {
  // Mini movie cards that fly in from edges
  const cards = [
    { x: -200, y: -100, delay: 0.2, endX: -120, endY: -80, scale: 0.7 },
    { x: 200, y: -60, delay: 0.35, endX: 100, endY: -60, scale: 0.6 },
    { x: -150, y: 60, delay: 0.5, endX: -90, endY: 50, scale: 0.55 },
    { x: 250, y: 80, delay: 0.3, endX: 130, endY: 65, scale: 0.65 },
    { x: 0, y: -200, delay: 0.45, endX: 10, endY: -110, scale: 0.5 },
    { x: -250, y: 0, delay: 0.6, endX: -160, endY: 10, scale: 0.45 },
    { x: 180, y: 120, delay: 0.55, endX: 80, endY: 90, scale: 0.5 },
    { x: 0, y: 200, delay: 0.4, endX: -20, endY: 100, scale: 0.55 },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-[#040404] overflow-hidden">

      {/* ===== GRID BACKGROUND — database feel ===== */}
      <motion.div
        className="absolute inset-0 z-[1]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ duration: 3, times: [0, 0.1, 0.7, 1] }}
      />

      {/* ===== MINI MOVIE CARDS — fly in from edges ===== */}
      <div className="absolute inset-0 flex items-center justify-center z-[3]">
        {cards.map((card, i) => (
          <motion.div
            key={`card-${i}`}
            className="absolute"
            initial={{ x: card.x * 2, y: card.y * 2, opacity: 0, scale: 0.3 }}
            animate={{
              x: [card.x * 2, card.endX, 0],
              y: [card.y * 2, card.endY, 0],
              opacity: [0, 0.8, 0],
              scale: [0.3, card.scale, 0],
            }}
            transition={{
              delay: card.delay,
              duration: 2.8,
              times: [0, 0.35, 1],
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {/* Mini card */}
            <div
              className="border border-white/[0.08] rounded overflow-hidden bg-white/[0.02]"
              style={{ width: 60, height: 85 }}
            >
              {/* Mini poster area */}
              <div className="w-full h-[55%] bg-white/[0.04] relative">
                <motion.div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.04) 50%, transparent 70%)',
                    backgroundSize: '200% 100%',
                  }}
                  animate={{ backgroundPosition: ['-100% 0', '200% 0'] }}
                  transition={{ duration: 1, repeat: 2, ease: 'linear', delay: card.delay + 0.3 }}
                />
              </div>
              {/* Mini title bar */}
              <div className="p-1.5">
                <div className="h-[3px] w-[80%] rounded bg-white/[0.06] mb-1" />
                <div className="h-[3px] w-[50%] rounded bg-white/[0.04] mb-1.5" />
                {/* Mini stars */}
                <div className="flex gap-[2px]">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <div key={j} className="w-[3px] h-[3px] rounded-full bg-white/[0.08]" />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ===== DATA STREAMS — flowing text/numbers ===== */}
      {Array.from({ length: 6 }).map((_, i) => {
        const isLeft = i % 2 === 0;
        const top = 15 + i * 13;
        return (
          <motion.div
            key={`stream-${i}`}
            className="absolute z-[2] flex items-center gap-3"
            style={{
              top: `${top}%`,
              [isLeft ? 'left' : 'right']: 0,
            }}
            initial={{ x: isLeft ? -300 : 300, opacity: 0 }}
            animate={{
              x: [isLeft ? -300 : 300, 0, isLeft ? 300 : -300],
              opacity: [0, 0.15, 0],
            }}
            transition={{
              delay: 0.8 + i * 0.2,
              duration: 2.5,
              ease: 'linear',
            }}
          >
            {['title', '★ 8.4', '2024', 'Drama', '2h 15m', 'EN'].map((text, j) => (
              <span
                key={j}
                className="text-[7px] font-mono text-white/30 whitespace-nowrap"
              >
                {text}
              </span>
            ))}
          </motion.div>
        );
      })}

      {/* ===== CENTER: Loading circle that becomes logo ===== */}
      <div className="absolute inset-0 flex items-center justify-center z-[6]">
        {/* Spinning loading ring */}
        <motion.svg
          width="80"
          height="80"
          viewBox="0 0 80 80"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.5, 0.5, 0] }}
          transition={{ duration: 2.8, times: [0, 0.1, 0.7, 1] }}
        >
          <circle cx="40" cy="40" r="30" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
          <motion.circle
            cx="40"
            cy="40"
            r="30"
            fill="none"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray="50 140"
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            style={{ transformOrigin: '40px 40px' }}
          />
        </motion.svg>
      </div>

      {/* ===== COUNTER — movies loading ===== */}
      <div className="absolute inset-0 flex items-center justify-center z-[7]">
        <motion.div
          className="flex flex-col items-center"
          style={{ marginTop: '120px' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.4, 0.4, 0] }}
          transition={{ delay: 0.8, duration: 2.2, times: [0, 0.1, 0.7, 1] }}
        >
          <motion.span
            className="text-[10px] font-mono text-white/20 tracking-wider"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0 }}
          >
            Loading database
          </motion.span>
          <motion.div className="flex gap-[2px] mt-2">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="text-[10px] text-white/20"
                animate={{ opacity: [0.2, 0.6, 0.2] }}
                transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
              >
                ·
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* ===== FLIMQ — crystallizes from data ===== */}
      <div className="absolute inset-0 flex items-center justify-center z-[10]">
        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.0, duration: 0.4 }}
        >
          {/* Converging data particles before text */}
          {Array.from({ length: 16 }).map((_, i) => {
            const angle = (i / 16) * Math.PI * 2;
            const radius = 100 + Math.random() * 60;
            return (
              <motion.div
                key={`dp-${i}`}
                className="absolute w-[2px] h-[2px] rounded-full bg-white/40"
                initial={{
                  x: Math.cos(angle) * radius,
                  y: Math.sin(angle) * radius,
                  opacity: 0,
                }}
                animate={{
                  x: 0,
                  y: 0,
                  opacity: [0, 0.8, 0],
                }}
                transition={{
                  delay: 2.6 + i * 0.03,
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                }}
              />
            );
          })}

          <motion.h1 className="text-5xl md:text-8xl font-black font-heading tracking-[0.25em]">
            {'FLIMQ'.split('').map((char, i) => (
              <motion.span
                key={i}
                className="inline-block text-white"
                initial={{ opacity: 0, scale: 0.5, filter: 'blur(8px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                transition={{
                  delay: 3.0 + i * 0.1,
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
            transition={{ delay: 3.6, duration: 1, ease: [0.4, 0, 0.2, 1] }}
          />

          <motion.p
            className="mt-2 text-[8px] md:text-[10px] tracking-[0.5em] uppercase text-white/15"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.5, duration: 0.5 }}
          >
            Your movie database
          </motion.p>

          <motion.div
            className="w-28 h-[1px] bg-white/[0.05] overflow-hidden rounded-full mt-5"
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
        className="absolute inset-0 z-[15] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.6) 100%)' }}
      />
    </div>
  );
}
