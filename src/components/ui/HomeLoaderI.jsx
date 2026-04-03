import { motion } from 'framer-motion';

// Option I: "The Premiere" — A cinema theater scene.
// Rows of seats silhouette at the bottom, a big screen in the center,
// projector beam from behind, the screen flickers on, FLIMQ appears
// as the featured movie title card.
export default function HomeLoaderI() {
  // Seat rows
  const seatRows = [
    { y: '88%', count: 14, scale: 1, opacity: 0.12 },
    { y: '83%', count: 12, scale: 0.85, opacity: 0.09 },
    { y: '79%', count: 10, scale: 0.7, opacity: 0.06 },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-[#020202] overflow-hidden">

      {/* ===== THEATER CEILING — dark gradient ===== */}
      <div
        className="absolute top-0 left-0 right-0 h-[30%]"
        style={{
          background: 'linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(5,5,5,0.8) 100%)',
        }}
      />

      {/* ===== PROJECTOR BEAM — from back of theater ===== */}
      <motion.div
        className="absolute z-[2]"
        style={{
          left: '50%',
          bottom: '100%',
          transform: 'translateX(-50%)',
        }}
      >
        <motion.div
          style={{
            width: 800,
            height: 900,
            marginLeft: -400,
            background: 'conic-gradient(from 0deg at 50% 0%, transparent 38%, rgba(255,255,255,0.015) 45%, rgba(255,255,255,0.025) 50%, rgba(255,255,255,0.015) 55%, transparent 62%)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1.5 }}
        />
      </motion.div>

      {/* ===== CINEMA SCREEN ===== */}
      <div className="absolute inset-0 flex items-center justify-center z-[5]" style={{ paddingBottom: '12vh' }}>
        <motion.div
          className="relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          {/* Screen frame */}
          <motion.div
            className="relative border border-white/[0.08] rounded-sm overflow-hidden"
            style={{
              width: 'min(70vw, 480px)',
              height: 'min(40vw, 270px)',
              background: 'rgba(255,255,255,0.01)',
            }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Screen glow */}
            <motion.div
              className="absolute inset-0"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.04), transparent 70%)',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0.6, 1] }}
              transition={{ delay: 1, duration: 2, ease: 'easeInOut' }}
            />

            {/* Screen flicker */}
            <motion.div
              className="absolute inset-0 bg-white"
              animate={{ opacity: [0, 0.03, 0, 0.02, 0, 0] }}
              transition={{ duration: 0.5, repeat: 3, delay: 0.8 }}
            />

            {/* ===== ON-SCREEN CONTENT: Film rating card then FLIMQ ===== */}

            {/* MPAA-style rating card — flashes briefly */}
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.6, 0.6, 0] }}
              transition={{ delay: 1.2, duration: 1.2, times: [0, 0.1, 0.7, 1] }}
            >
              <div className="border border-white/15 px-6 py-3 md:px-10 md:py-5">
                <p className="text-[7px] md:text-[10px] tracking-[0.3em] uppercase text-white/30 text-center">
                  The following preview has been
                </p>
                <p className="text-[7px] md:text-[10px] tracking-[0.3em] uppercase text-white/30 text-center mt-1">
                  approved for all audiences
                </p>
              </div>
            </motion.div>

            {/* FLIMQ title card — the main attraction */}
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.6, duration: 0.5 }}
            >
              <motion.h1 className="text-4xl md:text-7xl font-black font-heading tracking-[0.3em]">
                {'FLIMQ'.split('').map((char, i) => (
                  <motion.span
                    key={i}
                    className="inline-block text-white"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
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

              {/* Shimmer sweep */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.06) 50%, transparent 60%)',
                  backgroundSize: '200% 100%',
                }}
                initial={{ backgroundPosition: '-100% 0' }}
                animate={{ backgroundPosition: '200% 0' }}
                transition={{ delay: 3.3, duration: 1, ease: [0.4, 0, 0.2, 1] }}
              />

              {/* Tagline */}
              <motion.p
                className="mt-2 text-[7px] md:text-[10px] tracking-[0.5em] uppercase text-white/20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3.3, duration: 0.5 }}
              >
                Every story matters
              </motion.p>
            </motion.div>

            {/* Scan lines */}
            <div
              className="absolute inset-0 pointer-events-none z-[4]"
              style={{
                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.04) 2px, rgba(0,0,0,0.04) 4px)',
              }}
            />
          </motion.div>

          {/* Screen edge glow */}
          <motion.div
            className="absolute -inset-4 rounded pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.02), transparent 60%)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
          />
        </motion.div>
      </div>

      {/* ===== Progress bar — below screen ===== */}
      <div className="absolute inset-0 flex items-center justify-center z-[8]" style={{ paddingTop: '28vh' }}>
        <motion.div
          className="w-24 h-[1px] bg-white/[0.05] overflow-hidden rounded-full"
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
      </div>

      {/* ===== THEATER SEATS SILHOUETTE ===== */}
      {seatRows.map((row, ri) => (
        <motion.div
          key={`row-${ri}`}
          className="absolute left-0 right-0 flex justify-center gap-1 z-[6]"
          style={{ top: row.y }}
          initial={{ opacity: 0 }}
          animate={{ opacity: row.opacity }}
          transition={{ delay: 0.2 + ri * 0.15, duration: 0.8 }}
        >
          {Array.from({ length: row.count }).map((_, si) => (
            <div
              key={`seat-${ri}-${si}`}
              className="rounded-t-full bg-white"
              style={{
                width: `${18 * row.scale}px`,
                height: `${14 * row.scale}px`,
              }}
            />
          ))}
        </motion.div>
      ))}

      {/* ===== HEADS silhouettes in front row ===== */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 flex justify-center gap-6 md:gap-10 z-[7]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.08 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        {[
          { w: 28, h: 50, mx: 0 },
          { w: 24, h: 42, mx: 4 },
          { w: 30, h: 55, mx: -2 },
          { w: 22, h: 40, mx: 1 },
          { w: 26, h: 48, mx: -1 },
        ].map((head, i) => (
          <div
            key={`head-${i}`}
            className="flex flex-col items-center"
            style={{ marginLeft: head.mx }}
          >
            {/* Head */}
            <div
              className="rounded-full bg-white"
              style={{ width: head.w * 0.6, height: head.w * 0.6 }}
            />
            {/* Shoulders */}
            <div
              className="rounded-t-full bg-white -mt-1"
              style={{ width: head.w, height: head.h }}
            />
          </div>
        ))}
      </motion.div>

      {/* ===== EXIT SIGNS — tiny red dots on sides ===== */}
      <motion.div
        className="absolute left-4 top-[40%] w-1 h-1 rounded-full bg-white/10 z-[3]"
        animate={{ opacity: [0.05, 0.15, 0.05] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <motion.div
        className="absolute right-4 top-[40%] w-1 h-1 rounded-full bg-white/10 z-[3]"
        animate={{ opacity: [0.05, 0.15, 0.05] }}
        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
      />

      {/* Film grain */}
      <motion.div
        className="absolute inset-0 z-[25] pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '128px 128px',
        }}
        animate={{ opacity: [0.02, 0.04, 0.02] }}
        transition={{ duration: 0.15, repeat: Infinity }}
      />

      {/* Overall vignette */}
      <div
        className="absolute inset-0 z-[20] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center 40%, transparent 20%, rgba(0,0,0,0.7) 100%)' }}
      />
    </div>
  );
}
