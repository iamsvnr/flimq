import { getRatingColor } from '@/utils/helpers';

export default function Rating({ value, size = 'md' }) {
  if (!value) return null;
  const rating = Math.round(value * 10) / 10;
  const color = getRatingColor(rating);
  const circumference = 2 * Math.PI * 18;
  const progress = (rating / 10) * circumference;

  const sizes = {
    sm: 'w-10 h-10 text-xs',
    md: 'w-14 h-14 text-sm',
    lg: 'w-18 h-18 text-base',
  };

  return (
    <div className={`relative ${sizes[size]} flex items-center justify-center`}>
      <svg className="absolute inset-0 w-full h-full -rotate-90">
        <circle cx="50%" cy="50%" r="40%" fill="rgba(0,0,0,0.8)" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
        <circle
          cx="50%"
          cy="50%"
          r="40%"
          fill="none"
          stroke={color}
          strokeWidth="2.5"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          strokeLinecap="round"
          className="transition-all duration-1000"
        />
      </svg>
      <span className="font-bold relative z-10" style={{ color }}>{rating}</span>
    </div>
  );
}
