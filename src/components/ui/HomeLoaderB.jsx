import { motion } from 'framer-motion';

// Option B: "Film Strip" — A 35mm film strip unwinds across the screen,
// sprocket holes flickering, frames counting down, then reveals FLIMQ.
export default function HomeLoaderB() {
  const sprocketCount = 20;
  const frameCount = 5; // countdown frames

  return (
    <div className="fixed inset-0 z-50 bg-[#050505] overflow-hidden">

      {/* ===== FILM STRIP — sweeps diagonally across screen ===== */}
      <motion.div
        className="absolute z-[5]"
        style={{
          left: '50%',
          top: '50%',
          width: 140,
          transform: 'translate(-50%, -50%)',
        }}
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: '140vh', opacity: 1 }}
        transition={{ delay: 0.2, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Film strip body */}
        <div className="relative w-full h-full bg-[#111] border-x border-white/[0.12]">

          {/* Left sprocket holes */}
          <div className="absolute left-1 top-0 bottom-0 w-3 flex flex-col justify-around py-4">
            {Array.from({ length: sprocketCount }).map((_, i) => (
              <motion.div
                key={`ls-${i}`}
                className="w-3 h-2 rounded-[1px] bg-[#050505] border border-white/[0.06]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 + i * 0.04, duration: 0.2 }}
              />
            ))}
          </div>

          {/* Right sprocket holes */}
          <div className="absolute right-1 top-0 bottom-0 w-3 flex flex-col justify-around py-4">
            {Array.from({ length: sprocketCount }).map((_, i) => (
              <motion.div
                key={`rs-${i}`}
                className="w-3 h-2 rounded-[1px] bg-[#050505] border border-white/[0.06]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 + i * 0.04, duration: 0.2 }}
              />
            ))}
          </div>

          {/* Film frames with countdown */}
          <div className="absolute left-5 right-5 top-0 bottom-0 flex flex-col justify-around py-6">
            {Array.from({ length: frameCount }).map((_, i) => (
              <motion.div
                key={`frame-${i}`}
                className="relative mx-auto w-[90px] h-[65px] bg-[#0a0a0a] border border-white/[0.08] flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0.7] }}
                transition={{ delay: 0.8 + i * 0.25, duration: 0.6 }}
              >
                {/* Countdown number */}
                <motion.span
                  className="text-white/50 text-2xl font-heading font-bold"
                  animate={{ opacity: [0.3, 0.8, 0.3] }}
                  transition={{
                    delay: 1 + i * 0.25,
                    duration: 1.5,
                    repeat: Infinity,
                  }}
                >
                  {frameCount - i}
                </motion.span>
                {/* Corner markers */}
                <div className="absolute top-0.5 left-0.5 w-1.5 h-1.5 border-t border-l border-white/20" />
                <div className="absolute top-0.5 right-0.5 w-1.5 h-1.5 border-t border-r border-white/20" />
                <div className="absolute bottom-0.5 left-0.5 w-1.5 h-1.5 border-b border-l border-white/20" />
                <div className="absolute bottom-0.5 right-0.5 w-1.5 h-1.5 border-b border-r border-white/20" />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ===== PROJECTOR LIGHT BEAM ===== */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[800px] z-[3]"
        style={{
          background: 'conic-gradient(from 180deg at 50% 0%, transparent 40%, rgba(255,255,255,0.02) 48%, rgba(255,255,255,0.04) 50%, rgba(255,255,255,0.02) 52%, transparent 60%)',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.8, 0.5, 0.8] }}
        transition={{ delay: 0.5, duration: 3, ease: 'easeInOut' }}
      />

      {/* ===== FILM GRAIN FLICKER ===== */}
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={`flicker-${i}`}
          className="absolute inset-0 z-[6] pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${30 + Math.random() * 40}% ${30 + Math.random() * 40}%, rgba(255,255,255,0.02) 0%, transparent 30%)`,
          }}
          animate={{ opacity: [0, 0.5, 0, 0.3, 0] }}
          transition={{
            delay: 1 + i * 0.3,
            duration: 0.4,
            repeat: 3,
            repeatDelay: 0.5 + Math.random(),
          }}
        />
      ))}

      {/* ===== FILM STRIP FADES — LOGO EMERGES ===== */}
      <motion.div
        className="absolute inset-0 bg-[#050505] z-[7]"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 1] }}
        transition={{ delay: 2.2, duration: 0.8 }}
      />

      {/* ===== FLIMQ LOGO ===== */}
      <div className="absolute inset-0 flex items-center justify-center z-[10]">
        <motion.div className="flex flex-col items-center">
          <motion.h1 className="text-5xl md:text-8xl font-black font-heading tracking-[0.25em]">
            {'FLIMQ'.split('').map((char, i) => (
              <motion.span
                key={i}
                className="inline-block text-white"
                initial={{ opacity: 0, scale: 1.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: 2.6 + i * 0.1,
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {char}
              </motion.span>
            ))}
          </motion.h1>

          {/* Projector shutter line */}
          <motion.div
            className="w-24 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent mt-4"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 3.2, duration: 0.5 }}
          />

          {/* Film reel progress */}
          <motion.div
            className="w-32 h-[1.5px] bg-white/[0.06] overflow-hidden rounded-full mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.3 }}
          >
            <motion.div
              className="h-full rounded-full bg-white/25"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ delay: 3.3, duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Grain overlay */}
      <motion.div
        className="absolute inset-0 z-[15] pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '128px 128px',
        }}
        animate={{ opacity: [0.04, 0.07, 0.04] }}
        transition={{ duration: 0.2, repeat: Infinity }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0 z-[14] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, transparent 25%, rgba(0,0,0,0.7) 100%)' }}
      />
    </div>
  );
}
