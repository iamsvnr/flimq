import { motion } from 'framer-motion';

export default function Loader({ fullScreen = true }) {
  return (
    <div className={`relative flex flex-col items-center justify-center ${fullScreen ? 'min-h-screen' : 'min-h-[50vh]'} bg-black overflow-hidden`}>

      {/* Cinematic letterbox bars */}
      <motion.div
        className="absolute top-0 left-0 right-0 bg-black z-20"
        initial={{ height: '50%' }}
        animate={{ height: '8%' }}
        transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.div
        className="absolute bottom-0 left-0 right-0 bg-black z-20"
        initial={{ height: '50%' }}
        animate={{ height: '8%' }}
        transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Ambient light sweep */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          background: 'radial-gradient(ellipse 600px 300px at 50% 50%, rgba(255,255,255,0.03), transparent)',
        }}
        animate={{
          opacity: [0.5, 1, 0.5],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Film reel */}
      <div className="relative w-44 h-44 mb-6 z-10">
        {/* Outer spinning reel */}
        <motion.svg
          viewBox="0 0 200 200"
          className="absolute inset-0 w-full h-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        >
          {/* Reel body */}
          <circle cx="100" cy="100" r="90" fill="none" stroke="white" strokeWidth="1" opacity="0.15" />
          <circle cx="100" cy="100" r="88" fill="none" stroke="white" strokeWidth="0.3" opacity="0.1" />

          {/* Sprocket holes - outer ring */}
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 30 * Math.PI) / 180;
            const cx = 100 + 75 * Math.cos(angle);
            const cy = 100 + 75 * Math.sin(angle);
            return (
              <circle key={`outer-${i}`} cx={cx} cy={cy} r="8" fill="none" stroke="white"
                strokeWidth="1" opacity="0.2" />
            );
          })}

          {/* Inner sprocket holes */}
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = ((i * 45 + 22.5) * Math.PI) / 180;
            const cx = 100 + 50 * Math.cos(angle);
            const cy = 100 + 50 * Math.sin(angle);
            return (
              <circle key={`inner-${i}`} cx={cx} cy={cy} r="5" fill="none" stroke="white"
                strokeWidth="0.8" opacity="0.15" />
            );
          })}

          {/* Spokes */}
          {Array.from({ length: 6 }).map((_, i) => {
            const angle = (i * 30 * Math.PI) / 180;
            return (
              <line key={`spoke-${i}`}
                x1={100 + 25 * Math.cos(angle)} y1={100 + 25 * Math.sin(angle)}
                x2={100 + 65 * Math.cos(angle)} y2={100 + 65 * Math.sin(angle)}
                stroke="white" strokeWidth="0.5" opacity="0.1"
              />
            );
          })}

          {/* Center hub */}
          <circle cx="100" cy="100" r="22" fill="none" stroke="white" strokeWidth="1.5" opacity="0.25" />
          <circle cx="100" cy="100" r="4" fill="white" opacity="0.3" />
        </motion.svg>

        {/* Counter-rotating inner ring for depth */}
        <motion.svg
          viewBox="0 0 200 200"
          className="absolute inset-0 w-full h-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
        >
          <circle cx="100" cy="100" r="35" fill="none" stroke="white" strokeWidth="0.5" opacity="0.1"
            strokeDasharray="4 8" />
        </motion.svg>

        {/* Pulsing center glow */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.8, 1],
            opacity: [0.5, 0.2, 0.5],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Film strip running horizontally */}
      <div className="relative w-64 h-10 mb-8 overflow-hidden z-10">
        <motion.div
          className="flex gap-0 absolute top-0 left-0 h-full"
          animate={{ x: [0, -384] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        >
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className="flex-shrink-0 w-12 h-full relative border-x border-white/10">
              {/* Sprocket holes top & bottom */}
              <div className="absolute top-0.5 left-1/2 -translate-x-1/2 w-3 h-1.5 rounded-sm border border-white/20" />
              <div className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-3 h-1.5 rounded-sm border border-white/20" />
              {/* Frame */}
              <div className="absolute top-2.5 bottom-2.5 left-1.5 right-1.5 border border-white/[0.07] rounded-[1px]"
                style={{ background: `rgba(255,255,255,${0.01 + (i % 3) * 0.008})` }}
              />
            </div>
          ))}
        </motion.div>
        {/* Fade edges */}
        <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-black to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-black to-transparent z-10" />
      </div>

      {/* Clapperboard text reveal */}
      <motion.div className="relative z-10 mb-5">
        {/* Clapper top - slaps down */}
        <motion.div
          className="w-40 h-3 bg-white/10 rounded-t-sm origin-left border-b border-white/20"
          style={{ transformOrigin: 'left center' }}
          animate={{
            rotateZ: [0, -15, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatDelay: 2,
            ease: [0.33, 1, 0.68, 1],
            times: [0, 0.15, 0.3],
          }}
        >
          {/* Diagonal stripes on clapper */}
          <svg className="absolute inset-0 w-full h-full overflow-hidden rounded-t-sm" preserveAspectRatio="none">
            {Array.from({ length: 8 }).map((_, i) => (
              <line key={i}
                x1={i * 24} y1="0" x2={i * 24 - 12} y2="16"
                stroke="white" strokeWidth="2" opacity="0.15"
              />
            ))}
          </svg>
        </motion.div>

        {/* Logo text */}
        <div className="flex items-center justify-center py-2 px-4">
          {'FLIMQ'.split('').map((letter, i) => (
            <motion.span
              key={i}
              className="text-2xl font-black font-heading text-white/90 tracking-[0.25em]"
              initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
              animate={{
                opacity: [0, 1, 1, 0.7],
                y: [20, 0, 0, 0],
                filter: ['blur(8px)', 'blur(0px)', 'blur(0px)', 'blur(0px)'],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: 0.8 + i * 0.12,
                times: [0, 0.15, 0.85, 1],
                ease: 'easeOut',
              }}
            >
              {letter}
            </motion.span>
          ))}
        </div>
      </motion.div>

      {/* Projector light beam scan line */}
      <motion.div
        className="absolute left-0 right-0 h-px z-10"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)',
        }}
        animate={{
          top: ['30%', '70%', '30%'],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Loading progress bar */}
      <div className="w-40 h-[2px] bg-white/[0.06] overflow-hidden rounded-full z-10">
        <motion.div
          className="h-full rounded-full"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)',
          }}
          animate={{ x: ['-100%', '200%'] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: [0.4, 0, 0.2, 1] }}
        />
      </div>

      {/* Corner frame marks - like a viewfinder */}
      {[
        'top-[12%] left-[15%]',
        'top-[12%] right-[15%] rotate-90',
        'bottom-[12%] left-[15%] -rotate-90',
        'bottom-[12%] right-[15%] rotate-180',
      ].map((pos, i) => (
        <motion.div
          key={i}
          className={`absolute ${pos} z-10`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          transition={{ delay: 0.5 + i * 0.1 }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20">
            <path d="M0 8 L0 0 L8 0" fill="none" stroke="white" strokeWidth="1" />
          </svg>
        </motion.div>
      ))}

      {/* Floating film dust particles */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white z-[1]"
          style={{
            width: Math.random() > 0.5 ? '1px' : '2px',
            height: Math.random() > 0.5 ? '1px' : '2px',
            left: `${10 + i * 11}%`,
            top: `${20 + (i % 4) * 18}%`,
          }}
          animate={{
            opacity: [0, 0.3, 0],
            y: [0, -30 - i * 5],
            x: [0, (i % 2 === 0 ? 1 : -1) * 10],
          }}
          transition={{
            duration: 3 + i * 0.3,
            repeat: Infinity,
            delay: i * 0.5,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  );
}
