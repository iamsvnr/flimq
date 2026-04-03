import { motion } from 'framer-motion';

// Option F: "The Studio" — A classic production house intro.
// A film projector assembles itself, its reels start spinning,
// a light beam shoots out, and FLIMQ materializes in the beam.
export default function HomeLoaderF() {
  // Projector reel spokes
  const spokeCount = 8;
  const reelRadius = 28;

  return (
    <div className="fixed inset-0 z-50 bg-[#030303] overflow-hidden">

      {/* ===== PROJECTOR — center stage ===== */}
      <div className="absolute inset-0 flex items-center justify-center z-[5]">
        <motion.div
          className="relative"
          style={{ marginTop: '-15vh' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* === PROJECTOR BODY === */}
          <motion.svg
            width="160"
            height="120"
            viewBox="0 0 160 120"
            className="relative z-[2]"
          >
            {/* Main body */}
            <motion.rect
              x="30"
              y="50"
              width="100"
              height="50"
              rx="4"
              fill="none"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.3, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* Lens housing */}
            <motion.rect
              x="120"
              y="60"
              width="30"
              height="25"
              rx="3"
              fill="none"
              stroke="rgba(255,255,255,0.15)"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* Lens circle */}
            <motion.circle
              cx="155"
              cy="72"
              r="8"
              fill="none"
              stroke="rgba(255,255,255,0.25)"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.9, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.circle
              cx="155"
              cy="72"
              r="4"
              fill="rgba(255,255,255,0.1)"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.2, duration: 0.4 }}
            />

            {/* Top reel — left */}
            <motion.circle
              cx="55"
              cy="40"
              r={reelRadius}
              fill="none"
              stroke="rgba(255,255,255,0.15)"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.circle
              cx="55"
              cy="40"
              r="6"
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            />

            {/* Top reel — right */}
            <motion.circle
              cx="105"
              cy="40"
              r={reelRadius}
              fill="none"
              stroke="rgba(255,255,255,0.15)"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.circle
              cx="105"
              cy="40"
              r="6"
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            />

            {/* Film strip connecting reels */}
            <motion.path
              d="M55,12 Q80,8 105,12"
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="3"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 1.0, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* Legs */}
            <motion.line
              x1="45" y1="100" x2="40" y2="115"
              stroke="rgba(255,255,255,0.12)"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.8, duration: 0.4 }}
            />
            <motion.line
              x1="115" y1="100" x2="120" y2="115"
              stroke="rgba(255,255,255,0.12)"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.8, duration: 0.4 }}
            />
          </motion.svg>

          {/* Spinning reel spokes — Left reel */}
          <motion.div
            className="absolute z-[3]"
            style={{ left: 55, top: 40, width: 0, height: 0 }}
            animate={{ rotate: 360 }}
            transition={{ delay: 1.3, duration: 3, repeat: Infinity, ease: 'linear' }}
          >
            {Array.from({ length: spokeCount }).map((_, i) => (
              <motion.div
                key={`ls-${i}`}
                className="absolute bg-white/10"
                style={{
                  width: 1,
                  height: reelRadius - 8,
                  transformOrigin: '0 0',
                  transform: `rotate(${(i / spokeCount) * 360}deg)`,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 + i * 0.03 }}
              />
            ))}
          </motion.div>

          {/* Spinning reel spokes — Right reel */}
          <motion.div
            className="absolute z-[3]"
            style={{ left: 105, top: 40, width: 0, height: 0 }}
            animate={{ rotate: -360 }}
            transition={{ delay: 1.3, duration: 4, repeat: Infinity, ease: 'linear' }}
          >
            {Array.from({ length: spokeCount }).map((_, i) => (
              <motion.div
                key={`rs-${i}`}
                className="absolute bg-white/10"
                style={{
                  width: 1,
                  height: reelRadius - 8,
                  transformOrigin: '0 0',
                  transform: `rotate(${(i / spokeCount) * 360}deg)`,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3 + i * 0.03 }}
              />
            ))}
          </motion.div>

          {/* Lens flare when projector "turns on" */}
          <motion.div
            className="absolute z-[4]"
            style={{ left: 155, top: 72, transform: 'translate(-50%, -50%)' }}
          >
            <motion.div
              className="w-4 h-4 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(255,255,255,0.6), rgba(255,255,255,0.1), transparent)',
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [0, 3, 1.5],
                opacity: [0, 1, 0.6],
              }}
              transition={{ delay: 1.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* ===== LIGHT BEAM — projects from lens downward ===== */}
      <motion.div
        className="absolute z-[3]"
        style={{
          left: '50%',
          top: '35%',
          transform: 'translateX(-50%)',
          width: 0,
          height: 0,
        }}
      >
        <motion.div
          style={{
            width: 500,
            height: 400,
            marginLeft: -250,
            background: 'conic-gradient(from 180deg at 50% 0%, transparent 35%, rgba(255,255,255,0.03) 45%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.03) 55%, transparent 65%)',
          }}
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{ opacity: 1, scaleY: 1 }}
          transition={{ delay: 1.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        />
      </motion.div>

      {/* ===== DUST IN THE BEAM ===== */}
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={`dust-${i}`}
          className="absolute rounded-full bg-white z-[4]"
          style={{
            left: `${42 + Math.random() * 16}%`,
            top: `${50 + Math.random() * 25}%`,
            width: 1,
            height: 1,
          }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.3, 0],
            y: [0, -15 - Math.random() * 20],
            x: [(Math.random() - 0.5) * 10],
          }}
          transition={{
            delay: 2 + i * 0.2,
            duration: 2 + Math.random(),
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />
      ))}

      {/* ===== PROJECTED TITLE — FLIMQ ===== */}
      <div className="absolute inset-0 flex items-center justify-center z-[10]" style={{ paddingTop: '15vh' }}>
        <motion.div className="flex flex-col items-center">

          {/* Circle emblem — like a studio seal */}
          <motion.div
            className="relative w-24 h-24 md:w-32 md:h-32 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.6 }}
          >
            {/* Outer ring */}
            <motion.svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
              <motion.circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="0.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 1.8, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              />
              <motion.circle
                cx="50"
                cy="50"
                r="38"
                fill="none"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="0.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 2.0, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              />
              {/* Star/sparkle at top */}
              <motion.path
                d="M50,8 L52,14 L58,14 L53,18 L55,24 L50,20 L45,24 L47,18 L42,14 L48,14 Z"
                fill="rgba(255,255,255,0.2)"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 2.4, duration: 0.4 }}
              />
            </motion.svg>

            {/* Inner film reel icon */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 2.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <svg width="36" height="36" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="16" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="0.8" />
                <circle cx="18" cy="18" r="4" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" />
                {/* Reel holes */}
                {[0, 60, 120, 180, 240, 300].map((deg, i) => (
                  <circle
                    key={i}
                    cx={18 + Math.cos((deg * Math.PI) / 180) * 10}
                    cy={18 + Math.sin((deg * Math.PI) / 180) * 10}
                    r="2.5"
                    fill="none"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="0.6"
                  />
                ))}
              </svg>
            </motion.div>
          </motion.div>

          {/* FLIMQ text — cinematic title card */}
          <motion.h1 className="text-5xl md:text-8xl font-black font-heading tracking-[0.3em]">
            {'FLIMQ'.split('').map((char, i) => (
              <motion.span
                key={i}
                className="inline-block text-white"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 2.5 + i * 0.12,
                  duration: 0.7,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {char}
              </motion.span>
            ))}
          </motion.h1>

          {/* "STUDIOS" or "PICTURES" subtitle */}
          <motion.p
            className="mt-2 text-[9px] md:text-[11px] tracking-[0.6em] uppercase text-white/25 font-light"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.2, duration: 0.6 }}
          >
            Studios
          </motion.p>

          {/* Ornamental divider */}
          <div className="flex items-center gap-2 mt-4">
            <motion.div
              className="h-[1px] bg-gradient-to-r from-transparent to-white/15"
              initial={{ width: 0 }}
              animate={{ width: 50 }}
              transition={{ delay: 3.3, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.div
              className="w-1 h-1 rounded-full bg-white/20"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 3.5, duration: 0.3 }}
            />
            <motion.div
              className="h-[1px] bg-gradient-to-l from-transparent to-white/15"
              initial={{ width: 0 }}
              animate={{ width: 50 }}
              transition={{ delay: 3.3, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>

          {/* Progress */}
          <motion.div
            className="w-28 h-[1px] bg-white/[0.05] overflow-hidden rounded-full mt-7"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.5 }}
          >
            <motion.div
              className="h-full rounded-full bg-white/20"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ delay: 3.5, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
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
        animate={{ opacity: [0.04, 0.06, 0.04] }}
        transition={{ duration: 0.15, repeat: Infinity }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0 z-[18] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.7) 100%)' }}
      />
    </div>
  );
}
