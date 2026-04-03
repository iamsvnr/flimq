import { motion } from 'framer-motion';

// Option J: "The Film Reel" — A large film reel spins in the center,
// film strip unwinds from it, individual frames flicker,
// then the reel fades and FLIMQ title appears.
export default function HomeLoaderJ() {
  const frameCount = 7;
  const spokeCount = 12;
  const reelR = 80;
  const holeR = 22;
  const holePositions = [0, 60, 120, 180, 240, 300];

  return (
    <div className="fixed inset-0 z-50 bg-[#030303] overflow-hidden">

      {/* ===== FILM REEL — center ===== */}
      <div className="absolute inset-0 flex items-center justify-center z-[5]">
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: [0, 1, 1, 0], scale: [0.6, 1, 1, 0.9] }}
          transition={{ duration: 3.5, times: [0, 0.15, 0.7, 1] }}
        >
          {/* Spinning reel */}
          <motion.svg
            width="200"
            height="200"
            viewBox="0 0 200 200"
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          >
            {/* Outer rim */}
            <circle cx="100" cy="100" r={reelR} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="2" />
            <circle cx="100" cy="100" r={reelR - 4} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />

            {/* Center hub */}
            <circle cx="100" cy="100" r="12" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
            <circle cx="100" cy="100" r="4" fill="rgba(255,255,255,0.15)" />

            {/* Reel holes */}
            {holePositions.map((deg, i) => (
              <circle
                key={`hole-${i}`}
                cx={100 + Math.cos((deg * Math.PI) / 180) * 45}
                cy={100 + Math.sin((deg * Math.PI) / 180) * 45}
                r={holeR}
                fill="none"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="0.8"
              />
            ))}

            {/* Spokes */}
            {Array.from({ length: spokeCount }).map((_, i) => {
              const angle = (i / spokeCount) * Math.PI * 2;
              return (
                <line
                  key={`spoke-${i}`}
                  x1={100 + Math.cos(angle) * 14}
                  y1={100 + Math.sin(angle) * 14}
                  x2={100 + Math.cos(angle) * (reelR - 6)}
                  y2={100 + Math.sin(angle) * (reelR - 6)}
                  stroke="rgba(255,255,255,0.05)"
                  strokeWidth="0.5"
                />
              );
            })}

            {/* Gear teeth on outer edge */}
            {Array.from({ length: 36 }).map((_, i) => {
              const angle = (i / 36) * Math.PI * 2;
              return (
                <line
                  key={`tooth-${i}`}
                  x1={100 + Math.cos(angle) * reelR}
                  y1={100 + Math.sin(angle) * reelR}
                  x2={100 + Math.cos(angle) * (reelR + 3)}
                  y2={100 + Math.sin(angle) * (reelR + 3)}
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth="1"
                />
              );
            })}
          </motion.svg>
        </motion.div>
      </div>

      {/* ===== FILM STRIP — unwinds from reel to right ===== */}
      <motion.div
        className="absolute z-[4] flex"
        style={{ top: '50%', left: '55%', transform: 'translateY(-50%)' }}
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: '50vw', opacity: [0, 0.8, 0.8, 0] }}
        transition={{ delay: 0.5, duration: 3, times: [0, 0.1, 0.7, 1] }}
      >
        <div className="relative h-16 md:h-20 w-full overflow-hidden">
          {/* Strip background */}
          <div className="absolute inset-0 bg-white/[0.03] border-y border-white/[0.08]" />

          {/* Sprocket holes — top */}
          <div className="absolute top-1 left-0 right-0 flex gap-4">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={`st-${i}`}
                className="w-2 h-2 rounded-sm border border-white/10 shrink-0"
              />
            ))}
          </div>

          {/* Sprocket holes — bottom */}
          <div className="absolute bottom-1 left-0 right-0 flex gap-4">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={`sb-${i}`}
                className="w-2 h-2 rounded-sm border border-white/10 shrink-0"
              />
            ))}
          </div>

          {/* Film frames */}
          <div className="absolute inset-y-3 left-0 right-0 flex gap-1 px-1">
            {Array.from({ length: frameCount }).map((_, i) => (
              <motion.div
                key={`frame-${i}`}
                className="shrink-0 border border-white/[0.08] bg-white/[0.02]"
                style={{ width: 42, height: '100%' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.5, 0.8, 0.3] }}
                transition={{
                  delay: 0.8 + i * 0.2,
                  duration: 1.5,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>

          {/* Frame dividers */}
          <div className="absolute inset-y-3 left-0 right-0 flex gap-1 px-1">
            {Array.from({ length: frameCount }).map((_, i) => (
              <div
                key={`div-${i}`}
                className="shrink-0 border-r border-white/[0.04]"
                style={{ width: 42, height: '100%' }}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* ===== Flickering light (projector running) ===== */}
      <motion.div
        className="absolute inset-0 bg-white z-[3] pointer-events-none"
        animate={{ opacity: [0, 0.01, 0, 0.015, 0, 0.01, 0] }}
        transition={{ duration: 0.8, repeat: 4, delay: 0.5 }}
      />

      {/* ===== FLIMQ TITLE — after reel fades ===== */}
      <div className="absolute inset-0 flex items-center justify-center z-[10]">
        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.0, duration: 0.5 }}
        >
          <motion.h1 className="text-5xl md:text-8xl font-black font-heading tracking-[0.25em]">
            {'FLIMQ'.split('').map((char, i) => (
              <motion.span
                key={i}
                className="inline-block text-white"
                initial={{ opacity: 0, rotateY: -90 }}
                animate={{ opacity: 1, rotateY: 0 }}
                transition={{
                  delay: 3.1 + i * 0.12,
                  duration: 0.6,
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

          <div className="flex items-center gap-2 mt-4">
            <motion.div
              className="h-[1px] bg-gradient-to-r from-transparent to-white/15"
              initial={{ width: 0 }}
              animate={{ width: 40 }}
              transition={{ delay: 3.5, duration: 0.5 }}
            />
            <motion.div
              className="w-1 h-1 rounded-full bg-white/20"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 3.7 }}
            />
            <motion.div
              className="h-[1px] bg-gradient-to-l from-transparent to-white/15"
              initial={{ width: 0 }}
              animate={{ width: 40 }}
              transition={{ delay: 3.5, duration: 0.5 }}
            />
          </div>

          <motion.div
            className="w-28 h-[1px] bg-white/[0.05] overflow-hidden rounded-full mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.7 }}
          >
            <motion.div
              className="h-full rounded-full bg-white/20"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ delay: 3.7, duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Film grain */}
      <motion.div
        className="absolute inset-0 z-[20] pointer-events-none opacity-[0.05]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '128px 128px',
        }}
        animate={{ opacity: [0.04, 0.07, 0.04] }}
        transition={{ duration: 0.15, repeat: Infinity }}
      />

      <div
        className="absolute inset-0 z-[18] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.6) 100%)' }}
      />
    </div>
  );
}
