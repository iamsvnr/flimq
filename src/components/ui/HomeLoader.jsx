import { motion } from 'framer-motion';

export default function HomeLoader() {
  return (
    <div className="fixed inset-0 z-50 bg-[#050505] overflow-hidden">

      {/* ===== BACKGROUND: Rotating golden nebula ===== */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(212,175,55,0.03) 60deg, transparent 120deg, rgba(212,175,55,0.02) 200deg, transparent 280deg, rgba(212,175,55,0.03) 340deg, transparent 360deg)',
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />

      {/* ===== PAINT STROKES: Sweeping across screen ===== */}

      {/* Stroke 1 — wide golden sweep from left */}
      <motion.div
        className="absolute top-[30%] left-0 h-[2px] z-[3]"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.6), rgba(255,215,0,0.3), transparent)',
        }}
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: '100vw', opacity: [0, 1, 1, 0] }}
        transition={{ delay: 0.3, duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
      />

      {/* Stroke 2 — thin white sweep from right */}
      <motion.div
        className="absolute top-[65%] right-0 h-[1px] z-[3]"
        style={{
          background: 'linear-gradient(270deg, transparent, rgba(255,255,255,0.4), rgba(255,255,255,0.15), transparent)',
        }}
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: '80vw', opacity: [0, 1, 1, 0] }}
        transition={{ delay: 0.6, duration: 1.4, ease: [0.4, 0, 0.2, 1] }}
      />

      {/* Stroke 3 — diagonal golden sweep */}
      <motion.div
        className="absolute top-0 left-[20%] w-[1px] h-0 z-[3]"
        style={{
          background: 'linear-gradient(180deg, transparent, rgba(212,175,55,0.4), transparent)',
        }}
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: '100vh', opacity: [0, 0.8, 0.8, 0] }}
        transition={{ delay: 0.5, duration: 1.6, ease: [0.4, 0, 0.2, 1] }}
      />

      {/* ===== CONSTELLATION: Floating star particles ===== */}
      {Array.from({ length: 30 }).map((_, i) => {
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const size = 1 + Math.random() * 2;
        const delay = 0.8 + Math.random() * 1.5;
        return (
          <motion.div
            key={`star-${i}`}
            className="absolute rounded-full z-[2]"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              width: size,
              height: size,
              background: i % 3 === 0
                ? 'rgba(212,175,55,0.8)'
                : 'rgba(255,255,255,0.5)',
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 0.8, 0.4, 0.8, 0],
              scale: [0, 1, 0.8, 1, 0],
            }}
            transition={{
              delay,
              duration: 3,
              ease: 'easeInOut',
            }}
          />
        );
      })}

      {/* ===== GOLDEN RING: Expanding cinematic circle ===== */}
      <div className="absolute inset-0 flex items-center justify-center z-[4]">
        <motion.div
          className="rounded-full border border-amber-500/20"
          initial={{ width: 0, height: 0, opacity: 0 }}
          animate={{
            width: [0, 200, 280],
            height: [0, 200, 280],
            opacity: [0, 0.6, 0],
            borderWidth: ['1px', '1px', '0.5px'],
          }}
          transition={{ delay: 0.8, duration: 2, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      {/* Second ring — staggered */}
      <div className="absolute inset-0 flex items-center justify-center z-[4]">
        <motion.div
          className="rounded-full border border-white/10"
          initial={{ width: 0, height: 0, opacity: 0 }}
          animate={{
            width: [0, 160, 350],
            height: [0, 160, 350],
            opacity: [0, 0.4, 0],
          }}
          transition={{ delay: 1.2, duration: 2, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      {/* ===== ORBITING FILM DOTS ===== */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={`orbit-${i}`}
          className="absolute z-[5]"
          style={{
            left: '50%',
            top: '50%',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{ delay: 1 + i * 0.08, duration: 2.5 }}
        >
          <motion.div
            className="w-1.5 h-1.5 rounded-full"
            style={{
              background: i % 2 === 0
                ? 'rgba(212,175,55,0.7)'
                : 'rgba(255,255,255,0.4)',
              marginLeft: -3,
              marginTop: -3,
            }}
            animate={{
              x: [
                Math.cos((i / 8) * Math.PI * 2) * 80,
                Math.cos((i / 8) * Math.PI * 2 + Math.PI) * 100,
                Math.cos((i / 8) * Math.PI * 2 + Math.PI * 2) * 80,
              ],
              y: [
                Math.sin((i / 8) * Math.PI * 2) * 80,
                Math.sin((i / 8) * Math.PI * 2 + Math.PI) * 100,
                Math.sin((i / 8) * Math.PI * 2 + Math.PI * 2) * 80,
              ],
            }}
            transition={{ delay: 1 + i * 0.08, duration: 3, ease: 'easeInOut' }}
          />
        </motion.div>
      ))}

      {/* ===== CENTRAL LOGO REVEAL ===== */}
      <div className="absolute inset-0 flex items-center justify-center z-[10]">
        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
        >
          {/* Logo letters with artistic stagger */}
          <div className="relative">
            <motion.h1 className="text-5xl md:text-8xl font-black font-heading tracking-[0.25em] text-transparent relative">
              {'FLIMQ'.split('').map((char, i) => (
                <motion.span
                  key={i}
                  className="inline-block relative"
                  style={{
                    WebkitTextStroke: '1px rgba(212,175,55,0.3)',
                  }}
                  initial={{ opacity: 0, y: 40, rotateX: -90 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{
                    delay: 1.8 + i * 0.15,
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {/* Gold fill sweeps in */}
                  <motion.span
                    className="absolute inset-0"
                    style={{
                      background: 'linear-gradient(135deg, #d4af37, #ffd700, #b8860b, #d4af37)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      delay: 2.2 + i * 0.12,
                      duration: 0.6,
                    }}
                  >
                    {char}
                  </motion.span>
                  {/* Base letter (stroke outline) */}
                  {char}
                </motion.span>
              ))}
            </motion.h1>

            {/* Shimmering highlight across text */}
            <motion.div
              className="absolute inset-0 z-10 pointer-events-none"
              style={{
                background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%)',
                backgroundSize: '200% 100%',
              }}
              initial={{ backgroundPosition: '-100% 0' }}
              animate={{ backgroundPosition: '200% 0' }}
              transition={{ delay: 2.8, duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
            />
          </div>

          {/* Ornamental line — left */}
          <div className="flex items-center gap-3 mt-5">
            <motion.div
              className="h-[1px]"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.5))' }}
              initial={{ width: 0 }}
              animate={{ width: 60 }}
              transition={{ delay: 2.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            />
            {/* Diamond ornament */}
            <motion.div
              className="w-1.5 h-1.5 rotate-45 bg-amber-500/50"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 2.9, duration: 0.4 }}
            />
            {/* Ornamental line — right */}
            <motion.div
              className="h-[1px]"
              style={{ background: 'linear-gradient(270deg, transparent, rgba(212,175,55,0.5))' }}
              initial={{ width: 0 }}
              animate={{ width: 60 }}
              transition={{ delay: 2.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>

          {/* Tagline */}
          <motion.p
            className="mt-4 text-[10px] md:text-xs tracking-[0.5em] uppercase text-white/30 font-light"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.0, duration: 0.8 }}
          >
            Cinema Awaits
          </motion.p>

          {/* Elegant progress — ink filling a line */}
          <motion.div
            className="w-32 h-[1px] mt-8 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.0 }}
          >
            <motion.div
              className="h-full"
              style={{
                background: 'linear-gradient(90deg, rgba(212,175,55,0.6), rgba(255,215,0,0.3), rgba(212,175,55,0.6))',
              }}
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ delay: 3.0, duration: 1, ease: [0.4, 0, 0.2, 1] }}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* ===== AMBIENT GOLDEN GLOW ===== */}
      <motion.div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 600px 400px at 50% 50%, rgba(212,175,55,0.04), transparent)',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0.6, 1] }}
        transition={{ delay: 1.5, duration: 3, ease: 'easeInOut' }}
      />

      {/* ===== VIGNETTE ===== */}
      <div
        className="absolute inset-0 z-[11] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.6) 100%)',
        }}
      />

      {/* ===== FILM GRAIN TEXTURE ===== */}
      <motion.div
        className="absolute inset-0 z-[12] pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: '128px 128px',
        }}
        animate={{ opacity: [0.03, 0.05, 0.03] }}
        transition={{ duration: 0.3, repeat: Infinity }}
      />
    </div>
  );
}
