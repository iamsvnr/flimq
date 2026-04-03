import { motion } from 'framer-motion';

export default function MovieLoader() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-black overflow-hidden">

      {/* Widescreen letterbox reveal */}
      <motion.div
        className="absolute top-0 left-0 right-0 bg-black z-30"
        initial={{ height: '50%' }}
        animate={{ height: '12%' }}
        transition={{ duration: 1.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.div
        className="absolute bottom-0 left-0 right-0 bg-black z-30"
        initial={{ height: '50%' }}
        animate={{ height: '12%' }}
        transition={{ duration: 1.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Projector spotlight cone */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 z-0"
        style={{
          width: '0',
          height: '0',
          borderLeft: '200px solid transparent',
          borderRight: '200px solid transparent',
          borderTop: '500px solid rgba(255,255,255,0.015)',
        }}
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Film reel - spinning */}
      <div className="relative w-40 h-40 mb-8 z-10">
        <motion.svg
          viewBox="0 0 200 200"
          className="w-full h-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        >
          {/* Outer ring */}
          <circle cx="100" cy="100" r="92" fill="none" stroke="white" strokeWidth="1.5" opacity="0.12" />
          <circle cx="100" cy="100" r="85" fill="none" stroke="white" strokeWidth="0.5" opacity="0.08" />

          {/* Large sprocket holes */}
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i * 45 * Math.PI) / 180;
            const cx = 100 + 72 * Math.cos(angle);
            const cy = 100 + 72 * Math.sin(angle);
            return (
              <g key={i}>
                <circle cx={cx} cy={cy} r="10" fill="rgba(255,255,255,0.03)" stroke="white"
                  strokeWidth="1" opacity="0.2" />
                <circle cx={cx} cy={cy} r="4" fill="none" stroke="white"
                  strokeWidth="0.5" opacity="0.1" />
              </g>
            );
          })}

          {/* Inner ring of smaller holes */}
          {Array.from({ length: 6 }).map((_, i) => {
            const angle = ((i * 60 + 30) * Math.PI) / 180;
            const cx = 100 + 45 * Math.cos(angle);
            const cy = 100 + 45 * Math.sin(angle);
            return (
              <circle key={`sm-${i}`} cx={cx} cy={cy} r="6" fill="rgba(255,255,255,0.02)" stroke="white"
                strokeWidth="0.8" opacity="0.15" />
            );
          })}

          {/* Spokes */}
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i * 45 * Math.PI) / 180;
            return (
              <line key={`sp-${i}`}
                x1={100 + 20 * Math.cos(angle)} y1={100 + 20 * Math.sin(angle)}
                x2={100 + 60 * Math.cos(angle)} y2={100 + 60 * Math.sin(angle)}
                stroke="white" strokeWidth="0.4" opacity="0.08"
              />
            );
          })}

          {/* Hub */}
          <circle cx="100" cy="100" r="18" fill="none" stroke="white" strokeWidth="2" opacity="0.2" />
          <circle cx="100" cy="100" r="5" fill="white" opacity="0.25" />
        </motion.svg>
      </div>

      {/* Clapperboard */}
      <motion.div className="relative z-10 mb-6 w-48">
        {/* Top clapper arm */}
        <motion.div
          className="relative h-5 rounded-t border border-white/15 overflow-hidden"
          style={{
            transformOrigin: 'left bottom',
            background: 'rgba(255,255,255,0.06)',
          }}
          animate={{ rotateZ: [0, -20, 0] }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            repeatDelay: 2.5,
            ease: [0.33, 1, 0.68, 1],
            times: [0, 0.2, 0.4],
          }}
        >
          {/* Diagonal stripes */}
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="absolute top-0 bottom-0 w-[2px] bg-white/15"
              style={{ left: `${i * 22 - 5}px`, transform: 'skewX(-20deg)' }}
            />
          ))}
        </motion.div>

        {/* Board body */}
        <div className="border border-white/10 border-t-0 rounded-b px-3 py-2.5"
          style={{ background: 'rgba(255,255,255,0.03)' }}
        >
          {/* Board text lines */}
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-[9px] tracking-[0.2em] uppercase text-white/20 font-mono">PROD</span>
            <div className="h-px flex-1 mx-2 bg-white/10" />
            <span className="text-[9px] tracking-[0.15em] text-white/30 font-mono">FLIMQ</span>
          </div>
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-[9px] tracking-[0.2em] uppercase text-white/20 font-mono">SCENE</span>
            <div className="h-px flex-1 mx-2 bg-white/10" />
            <motion.span className="text-[9px] text-white/30 font-mono"
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            >LOADING</motion.span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[9px] tracking-[0.2em] uppercase text-white/20 font-mono">TAKE</span>
            <div className="h-px flex-1 mx-2 bg-white/10" />
            <motion.span className="text-[9px] text-white/30 font-mono tabular-nums"
              animate={{ opacity: [0.2, 0.6, 0.2] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
            >001</motion.span>
          </div>
        </div>
      </motion.div>

      {/* Film strip scrolling */}
      <div className="relative w-72 h-8 overflow-hidden z-10 mb-6">
        <motion.div
          className="flex absolute top-0 left-0 h-full"
          animate={{ x: [0, -288] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
        >
          {Array.from({ length: 18 }).map((_, i) => (
            <div key={i} className="flex-shrink-0 w-8 h-full relative">
              <div className="absolute top-[2px] left-1/2 -translate-x-1/2 w-2.5 h-1 rounded-[1px] border border-white/15" />
              <div className="absolute bottom-[2px] left-1/2 -translate-x-1/2 w-2.5 h-1 rounded-[1px] border border-white/15" />
              <div className="absolute top-[6px] bottom-[6px] left-[3px] right-[3px] border border-white/[0.06]"
                style={{ background: i % 4 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent' }}
              />
              <div className="absolute left-0 top-0 bottom-0 w-px bg-white/[0.06]" />
            </div>
          ))}
        </motion.div>
        <div className="absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-black to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-black to-transparent z-10" />
      </div>

      {/* Progress bar */}
      <div className="w-36 h-[1.5px] bg-white/[0.06] overflow-hidden rounded-full z-10">
        <motion.div
          className="h-full rounded-full"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)' }}
          animate={{ x: ['-100%', '200%'] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: [0.4, 0, 0.2, 1] }}
        />
      </div>

      {/* Viewfinder corners */}
      {[
        'top-[14%] left-[12%]',
        'top-[14%] right-[12%] rotate-90',
        'bottom-[14%] left-[12%] -rotate-90',
        'bottom-[14%] right-[12%] rotate-180',
      ].map((pos, i) => (
        <motion.div
          key={i}
          className={`absolute ${pos} z-10`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.12 }}
          transition={{ delay: 0.6 + i * 0.1 }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18">
            <path d="M0 7 L0 0 L7 0" fill="none" stroke="white" strokeWidth="1" />
          </svg>
        </motion.div>
      ))}

      {/* Dust particles */}
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-px h-px rounded-full bg-white z-[1]"
          style={{
            left: `${12 + i * 14}%`,
            top: `${25 + (i % 3) * 22}%`,
          }}
          animate={{
            opacity: [0, 0.25, 0],
            y: [0, -25 - i * 4],
          }}
          transition={{
            duration: 3 + i * 0.4,
            repeat: Infinity,
            delay: i * 0.6,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  );
}
