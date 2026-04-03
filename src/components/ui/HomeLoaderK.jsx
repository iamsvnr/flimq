import { motion } from 'framer-motion';

// Option K: "The Camera Lens" — A camera iris/aperture opens up,
// lens elements stack (concentric rings), auto-focus racks,
// shutter clicks, and FLIMQ is captured in the frame.
export default function HomeLoaderK() {
  const bladeCount = 6;

  return (
    <div className="fixed inset-0 z-50 bg-[#030303] overflow-hidden">

      {/* ===== APERTURE BLADES — iris opening ===== */}
      <div className="absolute inset-0 flex items-center justify-center z-[8]">
        <motion.div
          className="relative w-64 h-64 md:w-80 md:h-80"
          initial={{ opacity: 1 }}
          animate={{ opacity: [1, 1, 0] }}
          transition={{ duration: 2.5, times: [0, 0.7, 1] }}
        >
          {Array.from({ length: bladeCount }).map((_, i) => {
            const angle = (i / bladeCount) * 360;
            return (
              <motion.div
                key={`blade-${i}`}
                className="absolute inset-0"
                style={{
                  transform: `rotate(${angle}deg)`,
                }}
              >
                <motion.div
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[52%] origin-bottom"
                  style={{
                    background: 'linear-gradient(180deg, rgba(15,15,15,1) 0%, rgba(20,20,20,1) 100%)',
                    borderBottom: '1px solid rgba(255,255,255,0.04)',
                    clipPath: 'polygon(15% 0%, 85% 0%, 100% 100%, 0% 100%)',
                  }}
                  initial={{ rotate: 0 }}
                  animate={{ rotate: [0, 0, -60] }}
                  transition={{
                    delay: 0.8,
                    duration: 1.2,
                    ease: [0.16, 1, 0.3, 1],
                    times: [0, 0.1, 1],
                  }}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* ===== LENS ELEMENTS — concentric rings ===== */}
      <div className="absolute inset-0 flex items-center justify-center z-[6]">
        {[
          { r: 140, delay: 0.3, strokeW: 1, opacity: 0.08 },
          { r: 115, delay: 0.5, strokeW: 0.8, opacity: 0.06 },
          { r: 90, delay: 0.7, strokeW: 2, opacity: 0.1 },
          { r: 65, delay: 0.9, strokeW: 0.5, opacity: 0.05 },
          { r: 40, delay: 1.1, strokeW: 1, opacity: 0.08 },
        ].map((ring, i) => (
          <motion.div
            key={`ring-${i}`}
            className="absolute rounded-full border border-white"
            style={{
              width: ring.r * 2,
              height: ring.r * 2,
              borderWidth: ring.strokeW,
              borderColor: `rgba(255,255,255,${ring.opacity})`,
            }}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: ring.delay,
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
            }}
          />
        ))}

        {/* Lens coating reflection — subtle rainbow-ish in white */}
        <motion.div
          className="absolute w-32 h-32 md:w-40 md:h-40 rounded-full"
          style={{
            background: 'conic-gradient(from 45deg, transparent 0%, rgba(255,255,255,0.03) 15%, transparent 30%, rgba(255,255,255,0.02) 50%, transparent 65%, rgba(255,255,255,0.03) 85%, transparent 100%)',
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        />

        {/* Center dot — focus point */}
        <motion.div
          className="absolute w-2 h-2 rounded-full bg-white/20"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.5, 1] }}
          transition={{ delay: 1.3, duration: 0.4 }}
        />
      </div>

      {/* ===== FOCUS RACK — blur in/out effect ===== */}
      <motion.div
        className="absolute inset-0 z-[4] pointer-events-none"
        style={{
          backdropFilter: 'blur(0px)',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ delay: 1.5, duration: 0.8, times: [0, 0.2, 0.6, 1] }}
      />

      {/* ===== VIEWFINDER GRID ===== */}
      <div className="absolute inset-0 flex items-center justify-center z-[5]">
        <motion.div
          className="relative"
          style={{ width: '60vw', maxWidth: 400, aspectRatio: '16/9' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.3, 0.3, 0] }}
          transition={{ delay: 0.5, duration: 2.5, times: [0, 0.15, 0.7, 1] }}
        >
          {/* Rule of thirds — vertical */}
          <div className="absolute top-0 bottom-0 left-1/3 w-[0.5px] bg-white/10" />
          <div className="absolute top-0 bottom-0 left-2/3 w-[0.5px] bg-white/10" />
          {/* Rule of thirds — horizontal */}
          <div className="absolute left-0 right-0 top-1/3 h-[0.5px] bg-white/10" />
          <div className="absolute left-0 right-0 top-2/3 h-[0.5px] bg-white/10" />
          {/* Corner brackets */}
          {[
            { top: -1, left: -1 },
            { top: -1, right: -1 },
            { bottom: -1, left: -1 },
            { bottom: -1, right: -1 },
          ].map((pos, i) => (
            <div
              key={`corner-${i}`}
              className="absolute w-4 h-4"
              style={{
                ...pos,
                borderTop: pos.top !== undefined ? '1px solid rgba(255,255,255,0.15)' : 'none',
                borderBottom: pos.bottom !== undefined ? '1px solid rgba(255,255,255,0.15)' : 'none',
                borderLeft: pos.left !== undefined ? '1px solid rgba(255,255,255,0.15)' : 'none',
                borderRight: pos.right !== undefined ? '1px solid rgba(255,255,255,0.15)' : 'none',
              }}
            />
          ))}

          {/* Center focus square */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-white/15"
            initial={{ width: 60, height: 60 }}
            animate={{
              width: [60, 40, 45],
              height: [60, 40, 45],
              opacity: [0.3, 0.8, 0.5],
            }}
            transition={{ delay: 1.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* REC indicator */}
          <motion.div
            className="absolute top-2 right-2 flex items-center gap-1.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.5] }}
            transition={{ delay: 1.8, duration: 0.3 }}
          >
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-white/60"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1, repeat: Infinity, delay: 2 }}
            />
            <span className="text-[8px] text-white/40 font-mono tracking-wider">REC</span>
          </motion.div>
        </motion.div>
      </div>

      {/* ===== SHUTTER CLICK — black flash ===== */}
      <motion.div
        className="absolute inset-0 bg-black z-[12] pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 1, 0, 0] }}
        transition={{ delay: 2.3, duration: 0.25, times: [0, 0.1, 0.4, 0.6, 1] }}
      />

      {/* ===== FLIMQ — captured in frame ===== */}
      <div className="absolute inset-0 flex items-center justify-center z-[15]">
        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.6, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.h1 className="text-5xl md:text-8xl font-black font-heading tracking-[0.25em]">
            {'FLIMQ'.split('').map((char, i) => (
              <motion.span
                key={i}
                className="inline-block text-white"
                initial={{ opacity: 0, filter: 'blur(10px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                transition={{
                  delay: 2.7 + i * 0.1,
                  duration: 0.5,
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
            transition={{ delay: 3.3, duration: 1, ease: [0.4, 0, 0.2, 1] }}
          />

          <div className="flex items-center gap-2 mt-3">
            <motion.div
              className="h-[1px] bg-gradient-to-r from-transparent to-white/15"
              initial={{ width: 0 }}
              animate={{ width: 40 }}
              transition={{ delay: 3.2, duration: 0.5 }}
            />
            <motion.div
              className="w-1 h-1 rounded-full bg-white/20"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 3.4 }}
            />
            <motion.div
              className="h-[1px] bg-gradient-to-l from-transparent to-white/15"
              initial={{ width: 0 }}
              animate={{ width: 40 }}
              transition={{ delay: 3.2, duration: 0.5 }}
            />
          </div>

          <motion.div
            className="w-28 h-[1px] bg-white/[0.05] overflow-hidden rounded-full mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.4 }}
          >
            <motion.div
              className="h-full rounded-full bg-white/20"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ delay: 3.4, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Vignette */}
      <div
        className="absolute inset-0 z-[18] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.7) 100%)' }}
      />
    </div>
  );
}
