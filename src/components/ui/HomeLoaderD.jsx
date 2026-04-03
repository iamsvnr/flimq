import { motion } from 'framer-motion';

// Option D: "Particle Constellation" — Hundreds of white particles drift in space,
// then magnetic-pull together to form the FLIMQ letters as dot-matrix style,
// with connecting lines forming constellation patterns between particles.
export default function HomeLoaderD() {
  // Generate particle field
  const particleCount = 60;
  const particles = Array.from({ length: particleCount }).map((_, i) => ({
    startX: Math.random() * 100,
    startY: Math.random() * 100,
    size: 1 + Math.random() * 2.5,
    delay: Math.random() * 0.8,
    drift: { x: (Math.random() - 0.5) * 40, y: (Math.random() - 0.5) * 40 },
  }));

  // Constellation lines — connect some particles
  const connections = [
    [0, 5], [5, 12], [12, 18], [18, 25], [25, 32],
    [3, 8], [8, 15], [15, 22], [22, 28],
    [1, 10], [10, 20], [20, 30], [30, 40],
    [7, 14], [14, 21], [21, 35],
    [2, 9], [9, 16], [16, 24],
  ];

  // Shooting stars
  const shootingStars = [
    { startX: 10, startY: 15, angle: 35, delay: 0.8, length: 200 },
    { startX: 80, startY: 10, angle: 145, delay: 1.5, length: 150 },
    { startX: 60, startY: 5, angle: 110, delay: 2.2, length: 180 },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-[#030303] overflow-hidden">

      {/* ===== DEEP SPACE BACKGROUND ===== */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 30% 40%, rgba(255,255,255,0.015) 0%, transparent 50%), radial-gradient(ellipse at 70% 60%, rgba(255,255,255,0.01) 0%, transparent 50%)',
        }}
      />

      {/* ===== PARTICLE FIELD ===== */}
      {particles.map((p, i) => (
        <motion.div
          key={`p-${i}`}
          className="absolute rounded-full bg-white z-[3]"
          style={{
            left: `${p.startX}%`,
            top: `${p.startY}%`,
            width: p.size,
            height: p.size,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.7, 0.4, 0.7, 0.7, 0],
            scale: [0, 1, 0.8, 1, 1, 0],
            x: [0, p.drift.x * 0.3, p.drift.x * 0.6, p.drift.x],
            y: [0, p.drift.y * 0.3, p.drift.y * 0.6, p.drift.y],
          }}
          transition={{
            delay: p.delay,
            duration: 3.5,
            ease: 'easeInOut',
            times: [0, 0.2, 0.4, 0.6, 0.8, 1],
          }}
        />
      ))}

      {/* ===== CONSTELLATION LINES ===== */}
      <svg className="absolute inset-0 w-full h-full z-[2]">
        {connections.map(([a, b], i) => {
          if (a >= particles.length || b >= particles.length) return null;
          const pa = particles[a];
          const pb = particles[b];
          return (
            <motion.line
              key={`line-${i}`}
              x1={`${pa.startX}%`}
              y1={`${pa.startY}%`}
              x2={`${pb.startX}%`}
              y2={`${pb.startY}%`}
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="0.5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: [0, 1, 1, 0],
                opacity: [0, 0.5, 0.5, 0],
              }}
              transition={{
                delay: 0.5 + i * 0.08,
                duration: 3,
                ease: 'easeInOut',
              }}
            />
          );
        })}
      </svg>

      {/* ===== SHOOTING STARS ===== */}
      {shootingStars.map((star, i) => (
        <motion.div
          key={`ss-${i}`}
          className="absolute z-[4]"
          style={{
            left: `${star.startX}%`,
            top: `${star.startY}%`,
            width: star.length,
            height: 1,
            transformOrigin: '0 0',
            transform: `rotate(${star.angle}deg)`,
            background: 'linear-gradient(90deg, rgba(255,255,255,0.5), transparent)',
          }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{
            scaleX: [0, 1, 1],
            opacity: [0, 0.8, 0],
            x: [0, star.length * 0.5],
          }}
          transition={{
            delay: star.delay,
            duration: 0.8,
            ease: [0.4, 0, 0.2, 1],
          }}
        />
      ))}

      {/* ===== NEBULA RINGS ===== */}
      <div className="absolute inset-0 flex items-center justify-center z-[4]">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={`ring-${i}`}
            className="absolute rounded-full border border-white/[0.04]"
            initial={{ width: 0, height: 0, opacity: 0 }}
            animate={{
              width: [0, 120 + i * 80, 200 + i * 100],
              height: [0, 120 + i * 80, 200 + i * 100],
              opacity: [0, 0.5, 0],
              rotate: [0, 90 + i * 30],
            }}
            transition={{
              delay: 1.2 + i * 0.3,
              duration: 2,
              ease: [0.16, 1, 0.3, 1],
            }}
          />
        ))}
      </div>

      {/* ===== FLIMQ LOGO — materializes from stardust ===== */}
      <div className="absolute inset-0 flex items-center justify-center z-[10]">
        <motion.div className="flex flex-col items-center">

          {/* Letter particles — tiny dots swirl into position, then become letters */}
          <div className="relative">
            {/* Swirling dots behind text */}
            {Array.from({ length: 25 }).map((_, i) => {
              const angle = (i / 25) * Math.PI * 2;
              const radius = 80 + Math.random() * 60;
              return (
                <motion.div
                  key={`swirl-${i}`}
                  className="absolute rounded-full bg-white"
                  style={{
                    left: '50%',
                    top: '50%',
                    width: 2,
                    height: 2,
                  }}
                  initial={{
                    x: Math.cos(angle) * radius,
                    y: Math.sin(angle) * radius,
                    opacity: 0,
                  }}
                  animate={{
                    x: [Math.cos(angle) * radius, Math.cos(angle + Math.PI) * (radius * 0.5), 0],
                    y: [Math.sin(angle) * radius, Math.sin(angle + Math.PI) * (radius * 0.5), 0],
                    opacity: [0, 0.8, 0],
                    scale: [0, 1.5, 0],
                  }}
                  transition={{
                    delay: 1.5 + i * 0.04,
                    duration: 1.5,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                />
              );
            })}

            <motion.h1 className="text-5xl md:text-8xl font-black font-heading tracking-[0.25em] relative">
              {'FLIMQ'.split('').map((char, i) => (
                <motion.span
                  key={i}
                  className="inline-block text-white"
                  initial={{
                    opacity: 0,
                    filter: 'blur(12px)',
                    scale: 0.5,
                  }}
                  animate={{
                    opacity: 1,
                    filter: 'blur(0px)',
                    scale: 1,
                  }}
                  transition={{
                    delay: 2.2 + i * 0.15,
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.h1>

            {/* Shimmer sweep */}
            <motion.div
              className="absolute inset-0 z-10 pointer-events-none"
              style={{
                background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.08) 50%, transparent 60%)',
                backgroundSize: '200% 100%',
              }}
              initial={{ backgroundPosition: '-100% 0' }}
              animate={{ backgroundPosition: '200% 0' }}
              transition={{ delay: 3.0, duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
            />
          </div>

          {/* Star ornament */}
          <div className="flex items-center gap-3 mt-5">
            <motion.div
              className="h-[1px] bg-gradient-to-r from-transparent to-white/20"
              initial={{ width: 0 }}
              animate={{ width: 50 }}
              transition={{ delay: 3.0, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.div
              className="w-1 h-1 rounded-full bg-white/40"
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.5, 1] }}
              transition={{ delay: 3.2, duration: 0.4 }}
            />
            <motion.div
              className="h-[1px] bg-gradient-to-l from-transparent to-white/20"
              initial={{ width: 0 }}
              animate={{ width: 50 }}
              transition={{ delay: 3.0, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>

          {/* Progress */}
          <motion.div
            className="w-32 h-[1.5px] bg-white/[0.06] overflow-hidden rounded-full mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.2 }}
          >
            <motion.div
              className="h-full rounded-full bg-white/25"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ delay: 3.2, duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Vignette */}
      <div
        className="absolute inset-0 z-[11] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.7) 100%)' }}
      />
    </div>
  );
}
