import { motion } from 'framer-motion';

export default function TvLoader() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-black overflow-hidden">

      {/* Static noise scanlines overlay */}
      <div className="absolute inset-0 z-[2] pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)',
        }}
      />

      {/* CRT screen glow */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          background: 'radial-gradient(ellipse 500px 400px at 50% 45%, rgba(255,255,255,0.04), transparent)',
        }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Retro TV set frame */}
      <motion.div
        className="relative z-10 mb-6"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="relative w-52 h-40 border-2 border-white/15 rounded-lg overflow-hidden"
          style={{ background: 'rgba(255,255,255,0.02)' }}
        >
          {/* Screen inner bevel */}
          <div className="absolute inset-1 rounded border border-white/[0.06]" />

          {/* Horizontal scan line moving down */}
          <motion.div
            className="absolute left-0 right-0 h-[1px] z-10"
            style={{
              background: 'linear-gradient(90deg, transparent 5%, rgba(255,255,255,0.12) 30%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.12) 70%, transparent 95%)',
            }}
            animate={{ top: ['-5%', '105%'] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
          />

          {/* Second faster scanline */}
          <motion.div
            className="absolute left-0 right-0 h-px z-10"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)',
            }}
            animate={{ top: ['105%', '-5%'] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'linear', delay: 0.5 }}
          />

          {/* Signal bars - animated broadcast signal */}
          <div className="absolute inset-0 flex items-end justify-center gap-[3px] px-6 pb-6 pt-8">
            {[0.3, 0.5, 0.65, 0.8, 0.9, 1, 0.85, 0.7].map((h, i) => (
              <motion.div
                key={i}
                className="flex-1 rounded-t-[1px] origin-bottom"
                style={{
                  background: `linear-gradient(to top, rgba(255,255,255,${0.08 + i * 0.02}), rgba(255,255,255,${0.02 + i * 0.01}))`,
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderBottom: 'none',
                }}
                initial={{ scaleY: 0 }}
                animate={{
                  scaleY: [0, h, h * 0.6, h * 0.9, h * 0.7, h],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: 0.5 + i * 0.08,
                  ease: 'easeOut',
                  times: [0, 0.3, 0.5, 0.7, 0.85, 1],
                }}
              />
            ))}
          </div>

          {/* Channel static flicker */}
          <motion.div
            className="absolute inset-0"
            style={{ background: 'rgba(255,255,255,0.02)' }}
            animate={{ opacity: [0, 0.5, 0, 0.3, 0] }}
            transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 2 }}
          />

          {/* Power LED dot */}
          <motion.div
            className="absolute bottom-1.5 right-2 w-1.5 h-1.5 rounded-full"
            style={{ background: 'rgba(255,255,255,0.4)' }}
            animate={{
              opacity: [0.3, 0.8, 0.3],
              boxShadow: [
                '0 0 3px rgba(255,255,255,0.1)',
                '0 0 8px rgba(255,255,255,0.3)',
                '0 0 3px rgba(255,255,255,0.1)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        {/* TV stand legs */}
        <div className="flex justify-center gap-20 -mt-px">
          <div className="w-px h-4 bg-white/15 rotate-[-15deg] origin-top" />
          <div className="w-px h-4 bg-white/15 rotate-[15deg] origin-top" />
        </div>

        {/* Antenna */}
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex items-end gap-0">
          <motion.div
            className="w-px h-9 bg-white/15 origin-bottom"
            style={{ transform: 'rotate(-25deg)' }}
            animate={{ rotate: [-25, -20, -25] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="w-px h-9 bg-white/15 origin-bottom"
            style={{ transform: 'rotate(25deg)' }}
            animate={{ rotate: [25, 20, 25] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
          />
          {/* Signal waves from antenna */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute -top-2 left-1/2 -translate-x-1/2 rounded-full border border-white/10"
              style={{
                width: `${12 + i * 14}px`,
                height: `${8 + i * 10}px`,
                borderBottomColor: 'transparent',
                borderLeftColor: 'transparent',
                borderRightColor: 'transparent',
              }}
              animate={{
                opacity: [0, 0.3, 0],
                scale: [0.8, 1.2],
                y: [0, -4],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.3,
                ease: 'easeOut',
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* "ON AIR" badge */}
      <motion.div
        className="z-10 mb-5 flex items-center gap-2.5"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <motion.div
          className="w-1.5 h-1.5 rounded-full bg-white"
          animate={{
            opacity: [0.3, 1, 0.3],
            boxShadow: [
              '0 0 2px rgba(255,255,255,0.2)',
              '0 0 8px rgba(255,255,255,0.5)',
              '0 0 2px rgba(255,255,255,0.2)',
            ],
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/40">ON AIR</span>
      </motion.div>

      {/* Channel number flicker */}
      <motion.div className="z-10 mb-6 flex items-center gap-3">
        <div className="text-[10px] font-mono text-white/15 tracking-widest">CH</div>
        <div className="flex gap-[2px]">
          {['0', '0', '1'].map((digit, i) => (
            <motion.div
              key={i}
              className="w-5 h-7 border border-white/10 rounded-[2px] flex items-center justify-center"
              style={{ background: 'rgba(255,255,255,0.02)' }}
            >
              <motion.span
                className="text-sm font-mono text-white/50 tabular-nums"
                animate={{
                  opacity: [0, 1, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: 0.8 + i * 0.15,
                  times: [0, 0.2, 0.8, 1],
                }}
              >
                {digit}
              </motion.span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* FLIMQ text with TV tuning effect */}
      <motion.div className="z-10 mb-6 flex items-center gap-px">
        {'FLIMQ'.split('').map((letter, i) => (
          <motion.span
            key={i}
            className="text-2xl font-black font-heading text-white/80 tracking-[0.2em]"
            initial={{ opacity: 0, x: -10 }}
            animate={{
              opacity: [0, 0.4, 1, 1, 0.7],
              x: [- 10, 2, 0, 0, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: 0.6 + i * 0.1,
              times: [0, 0.1, 0.15, 0.85, 1],
              ease: 'easeOut',
            }}
          >
            {letter}
          </motion.span>
        ))}
      </motion.div>

      {/* Progress bar */}
      <div className="w-36 h-[1.5px] bg-white/[0.06] overflow-hidden rounded-full z-10">
        <motion.div
          className="h-full rounded-full"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)' }}
          animate={{ x: ['-100%', '200%'] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: [0.4, 0, 0.2, 1] }}
        />
      </div>

      {/* VHS tracking line */}
      <motion.div
        className="absolute left-0 right-0 h-[3px] z-[3] pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent 10%, rgba(255,255,255,0.04) 30%, rgba(255,255,255,0.06) 50%, rgba(255,255,255,0.04) 70%, transparent 90%)',
        }}
        animate={{
          top: ['20%', '80%'],
          opacity: [0, 0.8, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </div>
  );
}
