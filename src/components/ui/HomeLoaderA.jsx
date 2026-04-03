import { motion } from 'framer-motion';

// Option A: "Ink Bloom" — Abstract ink drops bloom outward like watercolor on wet paper,
// tendrils spread organically, then dissolve to reveal the FLIMQ logo.
export default function HomeLoaderA() {
  // Ink bloom circles — each one expands with organic easing
  const inkDrops = [
    { x: 50, y: 50, delay: 0, size: 500, duration: 2.5 },
    { x: 35, y: 40, delay: 0.3, size: 300, duration: 2 },
    { x: 65, y: 55, delay: 0.5, size: 350, duration: 2.2 },
    { x: 45, y: 65, delay: 0.7, size: 250, duration: 1.8 },
    { x: 58, y: 35, delay: 0.4, size: 280, duration: 2 },
  ];

  // Ink tendrils — thin lines that branch out from center
  const tendrils = Array.from({ length: 12 }).map((_, i) => {
    const angle = (i / 12) * 360;
    const length = 150 + Math.random() * 200;
    return { angle, length, delay: 0.2 + i * 0.08, width: 1 + Math.random() };
  });

  return (
    <div className="fixed inset-0 z-50 bg-[#050505] overflow-hidden">

      {/* Ink bloom drops */}
      {inkDrops.map((drop, i) => (
        <motion.div
          key={`drop-${i}`}
          className="absolute rounded-full"
          style={{
            left: `${drop.x}%`,
            top: `${drop.y}%`,
            transform: 'translate(-50%, -50%)',
            background: `radial-gradient(circle, rgba(255,255,255,${0.03 + i * 0.005}) 0%, rgba(255,255,255,${0.01}) 50%, transparent 70%)`,
          }}
          initial={{ width: 0, height: 0, opacity: 0 }}
          animate={{
            width: drop.size,
            height: drop.size,
            opacity: [0, 0.8, 0.5, 0],
          }}
          transition={{
            delay: drop.delay,
            duration: drop.duration,
            ease: [0.1, 0.8, 0.2, 1],
          }}
        />
      ))}

      {/* Ink splatter particles — tiny dots that fly out during bloom */}
      {Array.from({ length: 40 }).map((_, i) => {
        const angle = Math.random() * Math.PI * 2;
        const dist = 60 + Math.random() * 250;
        const size = 1 + Math.random() * 3;
        return (
          <motion.div
            key={`splatter-${i}`}
            className="absolute rounded-full bg-white"
            style={{
              left: '50%',
              top: '50%',
              width: size,
              height: size,
            }}
            initial={{ x: 0, y: 0, opacity: 0 }}
            animate={{
              x: Math.cos(angle) * dist,
              y: Math.sin(angle) * dist,
              opacity: [0, 0.6, 0],
              scale: [0, 1, 0.3],
            }}
            transition={{
              delay: 0.3 + Math.random() * 0.8,
              duration: 1.5 + Math.random() * 1,
              ease: [0.2, 0.8, 0.3, 1],
            }}
          />
        );
      })}

      {/* Ink tendrils radiating from center */}
      <div className="absolute inset-0 flex items-center justify-center">
        {tendrils.map((t, i) => (
          <motion.div
            key={`tendril-${i}`}
            className="absolute bg-white/[0.08]"
            style={{
              width: t.width,
              transformOrigin: '0 0',
              transform: `rotate(${t.angle}deg)`,
            }}
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: [0, t.length, t.length],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              delay: t.delay,
              duration: 2,
              ease: [0.1, 0.7, 0.3, 1],
            }}
          />
        ))}
      </div>

      {/* Circular ink ring — bleeds outward */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="rounded-full"
          style={{
            border: '1px solid rgba(255,255,255,0.15)',
            boxShadow: '0 0 30px rgba(255,255,255,0.05), inset 0 0 30px rgba(255,255,255,0.02)',
          }}
          initial={{ width: 0, height: 0, opacity: 0 }}
          animate={{
            width: [0, 180, 220],
            height: [0, 180, 220],
            opacity: [0, 0.8, 0],
          }}
          transition={{ delay: 0.6, duration: 2, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="rounded-full border border-white/[0.06]"
          initial={{ width: 0, height: 0, opacity: 0 }}
          animate={{
            width: [0, 130, 300],
            height: [0, 130, 300],
            opacity: [0, 0.5, 0],
          }}
          transition={{ delay: 1.0, duration: 2, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      {/* ===== FLIMQ LOGO ===== */}
      <div className="absolute inset-0 flex items-center justify-center z-[10]">
        <motion.div className="flex flex-col items-center">
          <div className="relative overflow-hidden">
            <motion.h1 className="text-5xl md:text-8xl font-black font-heading tracking-[0.25em]">
              {'FLIMQ'.split('').map((char, i) => (
                <motion.span
                  key={i}
                  className="inline-block text-white"
                  initial={{ opacity: 0, filter: 'blur(20px)', y: 20 }}
                  animate={{
                    opacity: 1,
                    filter: 'blur(0px)',
                    y: 0,
                  }}
                  transition={{
                    delay: 1.6 + i * 0.12,
                    duration: 0.9,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.h1>

            {/* Ink wash sweeps across text */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
              initial={{ x: '-100%' }}
              animate={{ x: '200%' }}
              transition={{ delay: 2.6, duration: 1, ease: [0.4, 0, 0.2, 1] }}
            />
          </div>

          {/* Ink bleed underline */}
          <motion.div
            className="h-[1px] mt-4"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
            }}
            initial={{ width: 0 }}
            animate={{ width: 120 }}
            transition={{ delay: 2.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Loading — ink filling */}
          <motion.div
            className="w-32 h-[1.5px] bg-white/[0.06] overflow-hidden rounded-full mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.8 }}
          >
            <motion.div
              className="h-full rounded-full bg-white/30"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ delay: 2.8, duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Paper texture grain */}
      <motion.div
        className="absolute inset-0 z-[12] pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '128px 128px',
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0 z-[11] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.7) 100%)' }}
      />
    </div>
  );
}
