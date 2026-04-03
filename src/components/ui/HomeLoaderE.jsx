import { motion } from 'framer-motion';

// Option E: "The Screenwriter" — A fountain pen writes FLIMQ letter by letter,
// ink trailing behind, like a director signing off on a screenplay.
export default function HomeLoaderE() {
  const letters = 'FLIMQ'.split('');
  const letterDuration = 0.45;
  const penStartDelay = 1.0;

  // Ink splatter dots that trail behind the pen
  const inkSplatters = Array.from({ length: 18 }).map((_, i) => ({
    x: -60 + (i / 18) * 120,
    y: (Math.random() - 0.5) * 30,
    size: 1 + Math.random() * 2.5,
    delay: penStartDelay + (i / 18) * (letterDuration * 5) + Math.random() * 0.2,
  }));

  return (
    <div className="fixed inset-0 z-50 bg-[#050505] overflow-hidden">

      {/* ===== PAPER TEXTURE — subtle warmth ===== */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
        }}
      />

      {/* ===== DESK SPOTLIGHT ===== */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 500px 400px at 50% 48%, rgba(255,255,255,0.04) 0%, transparent 70%)',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      />

      {/* ===== SCREENPLAY LINES — faint ruled paper ===== */}
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={`rule-${i}`}
          className="absolute left-[20%] right-[20%] h-[1px] bg-white/[0.02]"
          style={{ top: `${40 + i * 6}%` }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.3 + i * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        />
      ))}

      {/* ===== PEN ===== */}
      <div className="absolute inset-0 flex items-center justify-center z-[15]">
        <motion.div
          className="absolute"
          style={{ transformOrigin: 'bottom center' }}
          initial={{ opacity: 0, y: -80, rotate: -30 }}
          animate={[
            // Pen descends into frame
            { opacity: 1, y: 0, rotate: -35, transition: { delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
            // Pen moves across while writing (left to right)
            { x: ['-120px', '120px'], y: [0, -2, 0, -1, 0], rotate: [-35, -33, -35, -32, -35], transition: { delay: penStartDelay, duration: letterDuration * 5, ease: 'easeInOut' } },
            // Pen lifts away
            { y: -60, opacity: 0, rotate: -20, transition: { delay: penStartDelay + letterDuration * 5 + 0.2, duration: 0.6, ease: [0.4, 0, 1, 1] } },
          ]}
        >
          {/* Pen SVG — fountain pen nib */}
          <svg width="28" height="70" viewBox="0 0 28 70" className="-translate-x-1/2">
            {/* Nib */}
            <path
              d="M14,0 L10,18 L14,22 L18,18 Z"
              fill="none"
              stroke="rgba(255,255,255,0.7)"
              strokeWidth="0.8"
            />
            {/* Nib slit */}
            <line x1="14" y1="2" x2="14" y2="18" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
            {/* Body */}
            <rect x="11" y="22" width="6" height="38" rx="2" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" />
            {/* Grip section */}
            <rect x="12" y="22" width="4" height="12" rx="1" fill="rgba(255,255,255,0.06)" />
            {/* Clip */}
            <line x1="17" y1="35" x2="19" y2="55" stroke="rgba(255,255,255,0.25)" strokeWidth="0.8" />
            {/* Ink drop at nib tip */}
            <motion.circle
              cx="14"
              cy="1"
              r="1.5"
              fill="rgba(255,255,255,0.5)"
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </svg>
        </motion.div>
      </div>

      {/* ===== FLIMQ — WRITTEN BY PEN ===== */}
      <div className="absolute inset-0 flex items-center justify-center z-[10]">
        <motion.div className="flex flex-col items-center">
          <div className="relative flex">
            {letters.map((char, i) => (
              <div key={i} className="relative overflow-hidden" style={{ marginRight: i < letters.length - 1 ? '0.15em' : 0 }}>
                {/* The letter revealed via clip */}
                <motion.span
                  className="inline-block text-5xl md:text-8xl font-black font-heading tracking-[0.1em] text-white"
                  initial={{ clipPath: 'inset(0 100% 0 0)' }}
                  animate={{ clipPath: 'inset(0 0% 0 0)' }}
                  transition={{
                    delay: penStartDelay + i * letterDuration,
                    duration: letterDuration,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                >
                  {char}
                </motion.span>

                {/* Ink bleeding effect under each letter */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-[2px]"
                  style={{
                    background: 'linear-gradient(90deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05))',
                  }}
                  initial={{ scaleX: 0, transformOrigin: 'left' }}
                  animate={{ scaleX: [0, 1, 0.8] }}
                  transition={{
                    delay: penStartDelay + i * letterDuration + 0.1,
                    duration: letterDuration * 0.8,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                />
              </div>
            ))}
          </div>

          {/* Ink splatters trailing the pen */}
          {inkSplatters.map((s, i) => (
            <motion.div
              key={`splat-${i}`}
              className="absolute rounded-full bg-white/30"
              style={{ width: s.size, height: s.size }}
              initial={{ opacity: 0, scale: 0, x: s.x, y: s.y + 5 }}
              animate={{
                opacity: [0, 0.6, 0],
                scale: [0, 1, 0.5],
              }}
              transition={{
                delay: s.delay,
                duration: 0.8,
                ease: 'easeOut',
              }}
            />
          ))}

          {/* Writer's flourish — signature underline */}
          <motion.svg
            width="200"
            height="20"
            viewBox="0 0 200 20"
            className="mt-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: penStartDelay + letterDuration * 5 + 0.3 }}
          >
            <motion.path
              d="M20,15 Q60,5 100,12 Q140,19 180,8"
              fill="none"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="1"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                delay: penStartDelay + letterDuration * 5 + 0.3,
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
              }}
            />
          </motion.svg>

          {/* "a screenplay by..." feel */}
          <motion.p
            className="mt-5 text-[9px] md:text-[11px] tracking-[0.6em] uppercase text-white/20 font-light"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: penStartDelay + letterDuration * 5 + 0.8, duration: 0.8 }}
          >
            Presents
          </motion.p>

          {/* Progress — ink line fills */}
          <motion.div
            className="w-28 h-[1px] bg-white/[0.05] overflow-hidden rounded-full mt-7"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: penStartDelay + letterDuration * 5 + 1 }}
          >
            <motion.div
              className="h-full rounded-full bg-white/25"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{
                delay: penStartDelay + letterDuration * 5 + 1,
                duration: 0.8,
                ease: [0.4, 0, 0.2, 1],
              }}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Vignette */}
      <div
        className="absolute inset-0 z-[20] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.65) 100%)' }}
      />
    </div>
  );
}
