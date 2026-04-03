import { motion } from 'framer-motion';

export default function HomeLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#050505] overflow-hidden">

      {/* Projector light cone from top */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 z-0"
        style={{
          width: 0,
          height: 0,
          borderLeft: '300px solid transparent',
          borderRight: '300px solid transparent',
          borderTop: '100vh solid rgba(255,255,255,0.008)',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0.6] }}
        transition={{ duration: 2, ease: 'easeOut' }}
      />

      {/* Camera aperture blades - opens up */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute z-20"
          style={{
            width: '100vmax',
            height: '100vmax',
            background: '#050505',
            transformOrigin: 'center center',
            rotate: `${i * 45}deg`,
          }}
          initial={{ x: 0, y: 0 }}
          animate={{
            x: Math.cos((i * 45 * Math.PI) / 180) * (typeof window !== 'undefined' ? window.innerWidth : 1000),
            y: Math.sin((i * 45 * Math.PI) / 180) * (typeof window !== 'undefined' ? window.innerHeight : 800),
            opacity: [1, 1, 0],
          }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.4, 0, 0, 1] }}
        />
      ))}

      {/* Film countdown circle */}
      <motion.div
        className="absolute z-10"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ delay: 1.8, duration: 0.3 }}
      >
        <motion.svg viewBox="0 0 200 200" className="w-36 h-36 md:w-44 md:h-44">
          {/* Outer countdown ring */}
          <circle cx="100" cy="100" r="90" fill="none" stroke="white" strokeWidth="0.5" opacity="0.1" />
          <motion.circle
            cx="100" cy="100" r="90" fill="none" stroke="white" strokeWidth="1.5" opacity="0.3"
            strokeDasharray={565}
            initial={{ strokeDashoffset: 565 }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 1.5, delay: 0.3, ease: 'linear' }}
            style={{ transformOrigin: 'center', rotate: '-90deg' }}
          />
          {/* Crosshair */}
          <line x1="100" y1="20" x2="100" y2="50" stroke="white" strokeWidth="0.5" opacity="0.15" />
          <line x1="100" y1="150" x2="100" y2="180" stroke="white" strokeWidth="0.5" opacity="0.15" />
          <line x1="20" y1="100" x2="50" y2="100" stroke="white" strokeWidth="0.5" opacity="0.15" />
          <line x1="150" y1="100" x2="180" y2="100" stroke="white" strokeWidth="0.5" opacity="0.15" />
          {/* Tick marks */}
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 30 * Math.PI) / 180;
            return (
              <line key={i}
                x1={100 + 82 * Math.cos(angle)} y1={100 + 82 * Math.sin(angle)}
                x2={100 + 90 * Math.cos(angle)} y2={100 + 90 * Math.sin(angle)}
                stroke="white" strokeWidth="0.8" opacity="0.12"
              />
            );
          })}
          {/* Sweeping hand */}
          <motion.line
            x1="100" y1="100" x2="100" y2="30"
            stroke="white" strokeWidth="1" opacity="0.2"
            style={{ transformOrigin: '100px 100px' }}
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, delay: 0.3, ease: 'linear' }}
          />
          <circle cx="100" cy="100" r="3" fill="white" opacity="0.25" />
        </motion.svg>
      </motion.div>

      {/* Main content - appears after countdown */}
      <motion.div
        className="relative z-10 flex flex-col items-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* FLIMQ logo with stagger */}
        <div className="relative mb-5">
          <motion.h1 className="text-5xl md:text-8xl font-black font-heading tracking-[0.2em] text-white">
            {'FLIMQ'.split('').map((char, i) => (
              <motion.span
                key={i}
                className="inline-block"
                initial={{ opacity: 0, y: 40, rotateX: -90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  delay: 2 + i * 0.12,
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {char}
              </motion.span>
            ))}
          </motion.h1>

          {/* Horizontal lines flanking logo */}
          <motion.div
            className="absolute top-1/2 -left-16 md:-left-24 w-12 md:w-20 h-[1px] bg-gradient-to-r from-transparent to-white/20"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 2.6, duration: 0.5 }}
            style={{ transformOrigin: 'right' }}
          />
          <motion.div
            className="absolute top-1/2 -right-16 md:-right-24 w-12 md:w-20 h-[1px] bg-gradient-to-l from-transparent to-white/20"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 2.6, duration: 0.5 }}
            style={{ transformOrigin: 'left' }}
          />
        </div>

        {/* Category icons row */}
        <motion.div
          className="flex items-center gap-6 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.8, duration: 0.5 }}
        >
          {/* Film icon */}
          <div className="flex items-center gap-2">
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="white" strokeWidth="1.5" opacity="0.3">
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
            <span className="text-[10px] text-white/20 tracking-[0.2em] uppercase">Films</span>
          </div>

          <div className="w-px h-3 bg-white/10" />

          {/* TV icon */}
          <div className="flex items-center gap-2">
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="white" strokeWidth="1.5" opacity="0.3">
              <rect x="2" y="4" width="20" height="14" rx="2" />
              <line x1="8" y1="21" x2="16" y2="21" />
              <line x1="12" y1="18" x2="12" y2="21" />
            </svg>
            <span className="text-[10px] text-white/20 tracking-[0.2em] uppercase">Series</span>
          </div>

          <div className="w-px h-3 bg-white/10" />

          {/* Person icon */}
          <div className="flex items-center gap-2">
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="white" strokeWidth="1.5" opacity="0.3">
              <circle cx="12" cy="8" r="5" />
              <path d="M3 21 Q3 15 12 15 Q21 15 21 21" />
            </svg>
            <span className="text-[10px] text-white/20 tracking-[0.2em] uppercase">People</span>
          </div>
        </motion.div>

        {/* Progress bar that fills over the full duration */}
        <motion.div
          className="w-48 h-[2px] bg-white/[0.06] overflow-hidden rounded-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
        >
          <motion.div
            className="h-full rounded-full bg-white/30"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ delay: 3, duration: 1, ease: [0.4, 0, 0.2, 1] }}
          />
        </motion.div>
      </motion.div>

      {/* Floating dust particles */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-px h-px rounded-full bg-white z-[1]"
          style={{
            left: `${10 + i * 11}%`,
            top: `${20 + (i % 4) * 18}%`,
          }}
          animate={{
            opacity: [0, 0.2, 0],
            y: [0, -30 - i * 5],
            x: [0, (i % 2 ? 10 : -10)],
          }}
          transition={{
            duration: 4 + i * 0.3,
            repeat: Infinity,
            delay: 1.5 + i * 0.4,
            ease: 'easeOut',
          }}
        />
      ))}

      {/* Vignette overlay */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.4) 100%)',
        }}
      />

      {/* Film grain noise */}
      <motion.div
        className="absolute inset-0 z-[3] pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
        animate={{ opacity: [0.015, 0.03, 0.015] }}
        transition={{ duration: 0.3, repeat: Infinity }}
      />
    </div>
  );
}
