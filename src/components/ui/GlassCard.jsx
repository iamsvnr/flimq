import { motion } from 'framer-motion';

export default function GlassCard({ children, className = '', hover = true, ...props }) {
  return (
    <motion.div
      whileHover={hover ? { scale: 1.02, y: -2 } : {}}
      className={`glass p-4 ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}
