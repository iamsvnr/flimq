import { IoStar, IoStarOutline } from 'react-icons/io5';

export default function UserRating({ rating, onRate, disabled }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => onRate(star === rating ? null : star)}
          disabled={disabled}
          className="text-white/30 hover:text-white/80 transition-colors disabled:cursor-not-allowed p-0.5"
        >
          {star <= (rating || 0) ? (
            <IoStar size={18} className="text-amber-400" />
          ) : (
            <IoStarOutline size={18} />
          )}
        </button>
      ))}
      {rating && (
        <span className="text-xs text-white/40 ml-1">Your rating</span>
      )}
    </div>
  );
}
