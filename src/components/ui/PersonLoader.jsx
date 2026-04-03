import { motion } from 'framer-motion';

export default function PersonLoader() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-[50vh] bg-[#0a0a0a] overflow-hidden">

      {/* Ambient spotlight */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          background: 'radial-gradient(ellipse 300px 350px at 50% 40%, rgba(255,255,255,0.03), transparent)',
        }}
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Person silhouette */}
      <div className="relative w-28 h-28 mb-6 z-10">
        {/* Head */}
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full border-2 border-white/15"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {/* Eyes */}
          <motion.div
            className="absolute top-4 left-2.5 w-1.5 h-1.5 rounded-full bg-white/20"
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
          />
          <motion.div
            className="absolute top-4 right-2.5 w-1.5 h-1.5 rounded-full bg-white/20"
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
          />
        </motion.div>

        {/* Body */}
        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-14 rounded-t-[50%] border-2 border-b-0 border-white/15"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
        />

        {/* Scanning line over silhouette */}
        <motion.div
          className="absolute left-0 right-0 h-[1px] z-10"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
          }}
          animate={{ top: ['0%', '100%', '0%'] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Pulsing ring */}
        <motion.div
          className="absolute inset-[-8px] rounded-full border border-white/[0.06]"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.08, 0.3],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Info skeleton lines */}
      <div className="flex flex-col items-center gap-2 z-10 mb-5">
        <motion.div
          className="w-24 h-3 rounded bg-white/[0.06]"
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="w-16 h-2 rounded bg-white/[0.04]"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
        />
      </div>

      {/* Progress bar */}
      <div className="w-28 h-[1.5px] bg-white/[0.06] overflow-hidden rounded-full z-10">
        <motion.div
          className="h-full rounded-full"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)' }}
          animate={{ x: ['-100%', '200%'] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: [0.4, 0, 0.2, 1] }}
        />
      </div>
    </div>
  );
}
