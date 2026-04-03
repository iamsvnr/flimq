import { motion } from 'framer-motion';

// Option C: "Kinetic Typography" — Abstract geometric shapes (lines, circles, triangles)
// dance and morph across the screen in a choreographed ballet, then collapse
// into formation to spell FLIMQ. Inspired by Bauhaus/Swiss design art.
export default function HomeLoaderC() {
  // Geometric shapes that dance around
  const shapes = [
    // Circles
    { type: 'circle', x: 20, y: 25, size: 60, delay: 0 },
    { type: 'circle', x: 75, y: 70, size: 40, delay: 0.2 },
    { type: 'circle', x: 50, y: 15, size: 30, delay: 0.3 },
    // Horizontal lines
    { type: 'hline', x: 10, y: 45, size: 120, delay: 0.1 },
    { type: 'hline', x: 55, y: 80, size: 80, delay: 0.25 },
    { type: 'hline', x: 30, y: 30, size: 100, delay: 0.15 },
    // Vertical lines
    { type: 'vline', x: 40, y: 10, size: 90, delay: 0.2 },
    { type: 'vline', x: 70, y: 50, size: 70, delay: 0.35 },
    // Triangles (using CSS borders)
    { type: 'triangle', x: 85, y: 20, size: 30, delay: 0.1 },
    { type: 'triangle', x: 15, y: 75, size: 25, delay: 0.28 },
    // Squares
    { type: 'square', x: 60, y: 40, size: 20, delay: 0.15 },
    { type: 'square', x: 30, y: 60, size: 15, delay: 0.32 },
    // Dots
    { type: 'dot', x: 45, y: 85, size: 8, delay: 0.05 },
    { type: 'dot', x: 80, y: 45, size: 6, delay: 0.22 },
    { type: 'dot', x: 25, y: 50, size: 10, delay: 0.18 },
  ];

  const renderShape = (shape, i) => {
    const common = {
      position: 'absolute',
      left: `${shape.x}%`,
      top: `${shape.y}%`,
    };

    const moveToCenter = {
      x: `${50 - shape.x}vw`,
      y: `${50 - shape.y}vh`,
      opacity: 0,
      scale: 0,
    };

    switch (shape.type) {
      case 'circle':
        return (
          <motion.div
            key={i}
            className="rounded-full border border-white/20"
            style={{ ...common, width: shape.size, height: shape.size }}
            initial={{ opacity: 0, scale: 0, rotate: 0 }}
            animate={[
              { opacity: 0.7, scale: 1, rotate: 180, transition: { delay: shape.delay, duration: 1, ease: [0.16, 1, 0.3, 1] } },
              { ...moveToCenter, transition: { delay: shape.delay + 1.8, duration: 0.8, ease: [0.7, 0, 0.3, 1] } },
            ]}
          />
        );

      case 'hline':
        return (
          <motion.div
            key={i}
            className="bg-white/15"
            style={{ ...common, height: 1 }}
            initial={{ width: 0, opacity: 0 }}
            animate={[
              { width: shape.size, opacity: 0.8, transition: { delay: shape.delay, duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
              { ...moveToCenter, width: 0, transition: { delay: shape.delay + 1.8, duration: 0.8, ease: [0.7, 0, 0.3, 1] } },
            ]}
          />
        );

      case 'vline':
        return (
          <motion.div
            key={i}
            className="bg-white/15"
            style={{ ...common, width: 1 }}
            initial={{ height: 0, opacity: 0 }}
            animate={[
              { height: shape.size, opacity: 0.8, transition: { delay: shape.delay, duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
              { ...moveToCenter, height: 0, transition: { delay: shape.delay + 1.8, duration: 0.8, ease: [0.7, 0, 0.3, 1] } },
            ]}
          />
        );

      case 'triangle':
        return (
          <motion.div
            key={i}
            style={{
              ...common,
              width: 0,
              height: 0,
              borderLeft: `${shape.size / 2}px solid transparent`,
              borderRight: `${shape.size / 2}px solid transparent`,
              borderBottom: `${shape.size}px solid rgba(255,255,255,0.12)`,
            }}
            initial={{ opacity: 0, scale: 0, rotate: 0 }}
            animate={[
              { opacity: 0.8, scale: 1, rotate: 360, transition: { delay: shape.delay, duration: 1.2, ease: [0.16, 1, 0.3, 1] } },
              { ...moveToCenter, transition: { delay: shape.delay + 1.8, duration: 0.8, ease: [0.7, 0, 0.3, 1] } },
            ]}
          />
        );

      case 'square':
        return (
          <motion.div
            key={i}
            className="border border-white/15"
            style={{ ...common, width: shape.size, height: shape.size }}
            initial={{ opacity: 0, scale: 0, rotate: 0 }}
            animate={[
              { opacity: 0.7, scale: 1, rotate: 90, transition: { delay: shape.delay, duration: 1, ease: [0.16, 1, 0.3, 1] } },
              { ...moveToCenter, rotate: 360, transition: { delay: shape.delay + 1.8, duration: 0.8, ease: [0.7, 0, 0.3, 1] } },
            ]}
          />
        );

      case 'dot':
        return (
          <motion.div
            key={i}
            className="rounded-full bg-white/30"
            style={{ ...common, width: shape.size, height: shape.size }}
            initial={{ opacity: 0, scale: 0 }}
            animate={[
              { opacity: 0.8, scale: 1, transition: { delay: shape.delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
              { ...moveToCenter, transition: { delay: shape.delay + 1.8, duration: 0.8, ease: [0.7, 0, 0.3, 1] } },
            ]}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#050505] overflow-hidden">

      {/* Grid lines — subtle background structure */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={`grid-h-${i}`}
          className="absolute left-0 right-0 h-[1px] bg-white/[0.02]"
          style={{ top: `${(i + 1) * 11}%` }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: [0, 1, 1, 0] }}
          transition={{ delay: i * 0.05, duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
        />
      ))}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={`grid-v-${i}`}
          className="absolute top-0 bottom-0 w-[1px] bg-white/[0.02]"
          style={{ left: `${(i + 1) * 11}%` }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: [0, 1, 1, 0] }}
          transition={{ delay: i * 0.05, duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
        />
      ))}

      {/* Geometric shapes */}
      {shapes.map((shape, i) => renderShape(shape, i))}

      {/* ===== FLIMQ LOGO — emerges from collapsed geometry ===== */}
      <div className="absolute inset-0 flex items-center justify-center z-[10]">
        <motion.div className="flex flex-col items-center">
          <motion.h1 className="text-5xl md:text-8xl font-black font-heading tracking-[0.25em]">
            {'FLIMQ'.split('').map((char, i) => (
              <motion.span
                key={i}
                className="inline-block text-white"
                initial={{ opacity: 0, y: 0, scale: 0 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  delay: 2.4 + i * 0.12,
                  duration: 0.7,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {char}
              </motion.span>
            ))}
          </motion.h1>

          {/* Swiss-style underlines */}
          <div className="flex items-center gap-2 mt-5">
            <motion.div
              className="h-[2px] bg-white/40"
              initial={{ width: 0 }}
              animate={{ width: 40 }}
              transition={{ delay: 3.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.div
              className="w-1.5 h-1.5 bg-white/40"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 3.2, duration: 0.3 }}
            />
            <motion.div
              className="h-[2px] bg-white/40"
              initial={{ width: 0 }}
              animate={{ width: 40 }}
              transition={{ delay: 3.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>

          {/* Progress */}
          <motion.div
            className="w-32 h-[1.5px] bg-white/[0.06] overflow-hidden rounded-full mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.3 }}
          >
            <motion.div
              className="h-full rounded-full bg-white/30"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ delay: 3.3, duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Vignette */}
      <div
        className="absolute inset-0 z-[11] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.6) 100%)' }}
      />
    </div>
  );
}
