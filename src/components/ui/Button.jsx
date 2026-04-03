import { motion } from 'framer-motion';

export default function Button({ children, variant = 'primary', size = 'md', className = '', onClick, ...props }) {
  const baseStyles = 'inline-flex items-center justify-center gap-2 font-semibold rounded transition-all focus:outline-none active:scale-[0.97]';

  const variants = {
    primary: 'bg-white text-black font-bold hover:bg-white/85',
    secondary: 'bg-white/10 border border-white/[0.08] text-white hover:bg-white/15',
    ghost: 'text-white/50 hover:text-white hover:bg-white/[0.06]',
    danger: 'border border-white/10 text-white/60 hover:bg-white/[0.06]',
  };

  const sizes = {
    sm: 'px-3.5 py-1.5 text-xs',
    md: 'px-5 py-2 text-sm',
    lg: 'px-7 py-2.5 text-sm',
    icon: 'p-2.5',
  };

  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.button>
  );
}
