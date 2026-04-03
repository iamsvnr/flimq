export default function Badge({ children, className = '' }) {
  return (
    <span className={`inline-block px-2 py-0.5 text-[11px] font-medium rounded bg-white/[0.06] text-white/50 border border-white/[0.06] ${className}`}>
      {children}
    </span>
  );
}
