import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoStar, IoStarHalf, IoStarOutline, IoChevronDown, IoChevronUp, IoCreateOutline, IoTrashOutline } from 'react-icons/io5';
import { getImageUrl } from '@/api/endpoints';
import { useAuth } from '@/context/AuthContext';
import { useUserReview } from '@/hooks/useUserReview';

// Render star icons for a given rating (out of 10 → displayed as out of 5)
function StarDisplay({ rating }) {
  if (!rating) return null;
  const stars5 = rating / 2; // convert 10-scale to 5
  return (
    <div className="flex items-center gap-[2px]">
      {Array.from({ length: 5 }).map((_, i) => {
        if (i + 1 <= Math.floor(stars5)) {
          return <IoStar key={i} size={11} className="text-white/50" />;
        }
        if (i < stars5 && stars5 - i >= 0.25) {
          return <IoStarHalf key={i} size={11} className="text-white/50" />;
        }
        return <IoStarOutline key={i} size={11} className="text-white/15" />;
      })}
    </div>
  );
}

// Rating distribution bar
function RatingBar({ label, count, total, delay }) {
  const pct = total > 0 ? (count / total) * 100 : 0;
  return (
    <motion.div
      className="flex items-center gap-2"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.3 }}
    >
      <span className="text-[10px] text-white/30 w-3 text-right">{label}</span>
      <IoStar size={8} className="text-white/20" />
      <div className="flex-1 h-[3px] bg-white/[0.04] rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-white/20"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ delay: delay + 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
      <span className="text-[9px] text-white/15 w-5">{count}</span>
    </motion.div>
  );
}

// Animated collapsible content wrapper
function CollapsibleContent({ expanded, children }) {
  const contentRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, [expanded, children]);

  return (
    <motion.div
      animate={{ height: expanded ? height : 0 }}
      initial={false}
      transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
      style={{ overflow: 'hidden' }}
    >
      <div ref={contentRef}>{children}</div>
    </motion.div>
  );
}

// Expand/collapse for the "show all reviews" section — stays mounted, animates measured height
function ExpandCollapse({ expanded, children }) {
  const ref = useRef(null);
  const [measuredHeight, setMeasuredHeight] = useState(0);

  useEffect(() => {
    if (!ref.current) return;
    const measure = () => {
      if (ref.current) setMeasuredHeight(ref.current.scrollHeight);
    };
    measure();
    // Re-measure if content changes (e.g. images load)
    const observer = new ResizeObserver(measure);
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [children]);

  return (
    <motion.div
      initial={false}
      animate={{
        height: expanded ? measuredHeight : 0,
        opacity: expanded ? 1 : 0,
      }}
      transition={{
        height: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
        opacity: { duration: expanded ? 0.4 : 0.25, delay: expanded ? 0.1 : 0 },
      }}
      style={{ overflow: 'hidden' }}
    >
      <div ref={ref}>{children}</div>
    </motion.div>
  );
}

function ReviewCard({ review, index }) {
  const [expanded, setExpanded] = useState(false);
  const author = review.author_details || {};
  const avatarPath = author.avatar_path;
  const avatarUrl = avatarPath?.startsWith('/https')
    ? avatarPath.slice(1)
    : avatarPath
      ? getImageUrl(avatarPath, 'w45')
      : null;
  const rating = author.rating;
  const content = review.content || '';
  // Strip markdown-style formatting for cleaner display
  const cleanContent = content
    .replace(/\*\*/g, '')
    .replace(/_([^_]+)_/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/<[^>]+>/g, '');
  const isLong = cleanContent.length > 350;
  const shortContent = cleanContent.slice(0, 350);
  const extraContent = cleanContent.slice(350);
  const date = review.created_at
    ? new Date(review.created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : null;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
      transition={{ delay: 0.05 + index * 0.07, duration: 0.35 }}
      className="group relative p-4 md:p-5 rounded-xl border border-white/[0.06] bg-white/[0.015] hover:bg-white/[0.025] hover:border-white/[0.1] transition-all duration-300"
    >
      {/* Subtle left accent bar based on rating */}
      {rating && (
        <div
          className="absolute left-0 top-4 bottom-4 w-[2px] rounded-full transition-opacity duration-300 opacity-30 group-hover:opacity-60"
          style={{
            background: rating >= 7
              ? 'rgba(255,255,255,0.3)'
              : rating >= 5
                ? 'rgba(255,255,255,0.15)'
                : 'rgba(255,255,255,0.08)',
          }}
        />
      )}

      {/* Header */}
      <div className="flex items-start gap-3 mb-3">
        {/* Avatar */}
        <div className="relative shrink-0">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={review.author}
              className="w-10 h-10 rounded-full object-cover ring-1 ring-white/10"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
          ) : null}
          <div
            className={`w-10 h-10 rounded-full bg-gradient-to-br from-white/10 to-white/[0.03] ring-1 ring-white/10 items-center justify-center text-sm font-bold text-white/40 ${avatarUrl ? 'hidden' : 'flex'}`}
          >
            {review.author?.charAt(0)?.toUpperCase() || '?'}
          </div>
        </div>

        {/* Name + date + stars */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-sm font-semibold text-white/80 truncate">{review.author}</p>
            {rating && (
              <div className="flex items-center gap-1.5">
                <StarDisplay rating={rating} />
                <span className="text-[10px] text-white/25">{rating}/10</span>
              </div>
            )}
          </div>
          {date && <p className="text-[11px] text-white/20 mt-0.5">{date}</p>}
        </div>

        {/* Score badge */}
        {rating && (
          <div className="shrink-0 w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center">
            <span className="text-sm font-bold text-white/50">{rating}</span>
          </div>
        )}
      </div>

      {/* Review content with animated expand/collapse */}
      <div className="text-[13px] text-white/45 leading-relaxed break-words pl-[52px]">
        {shortContent}
        {isLong && !expanded && (
          <span className="text-white/20">...</span>
        )}
        {isLong && (
          <CollapsibleContent expanded={expanded}>
            <span className="text-[13px] text-white/45 leading-relaxed">{extraContent}</span>
          </CollapsibleContent>
        )}
      </div>

      {/* Read more / show less with animated icon */}
      {isLong && (
        <motion.button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1 mt-2 ml-[52px] text-xs text-white/25 hover:text-white/50 transition-colors"
          whileTap={{ scale: 0.95 }}
        >
          {expanded ? 'Show less' : 'Read more'}
          <motion.span
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="inline-flex"
          >
            <IoChevronDown size={12} />
          </motion.span>
        </motion.button>
      )}
    </motion.div>
  );
}

function UserReviewCard({ review, index }) {
  const name = review.author_name || 'User';
  const avatarUrl = review.avatar_url;
  const date = review.created_at
    ? new Date(review.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
    : null;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 + index * 0.07, duration: 0.35 }}
      className="group relative p-4 md:p-5 rounded-xl border border-white/[0.06] bg-white/[0.015] hover:bg-white/[0.025] hover:border-white/[0.1] transition-all duration-300"
    >
      <div className="flex items-start gap-3 mb-3">
        <div className="relative shrink-0">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={name}
              className="w-10 h-10 rounded-full object-cover ring-1 ring-white/10"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
          ) : null}
          <div
            className={`w-10 h-10 rounded-full bg-gradient-to-br from-white/10 to-white/[0.03] ring-1 ring-white/10 items-center justify-center text-sm font-bold text-white/40 ${avatarUrl ? 'hidden' : 'flex'}`}
          >
            {name.charAt(0).toUpperCase()}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold text-white/80 truncate">{name}</p>
            <span className="text-[9px] text-white/20 px-1.5 py-0.5 rounded bg-white/[0.04]">FLIMQ</span>
          </div>
          {date && <p className="text-[11px] text-white/20 mt-0.5">{date}</p>}
        </div>
      </div>
      <div className="text-[13px] text-white/45 leading-relaxed break-words pl-[52px]">
        {review.content}
      </div>
    </motion.div>
  );
}

export default function ReviewSection({ reviews, tmdbId, mediaType }) {
  const { user } = useAuth();
  const { myReview, allReviews: userReviews, saveReview, deleteReview } = useUserReview(tmdbId, mediaType);
  const [showAll, setShowAll] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [reviewContent, setReviewContent] = useState('');

  useEffect(() => {
    if (myReview) setReviewContent(myReview.content);
  }, [myReview]);

  const handleSave = async () => {
    if (reviewContent.trim().length < 10) return;
    await saveReview(reviewContent.trim());
    setIsEditing(false);
  };

  const handleDelete = async () => {
    await deleteReview();
    setReviewContent('');
    setIsEditing(false);
  };

  // Other users' reviews (exclude current user's — shown separately)
  const otherUserReviews = user
    ? userReviews.filter((r) => r.user_id !== user.id)
    : userReviews;

  const tmdbReviews = reviews?.results || [];
  const allCombined = [...otherUserReviews, ...tmdbReviews];
  const totalCount = allCombined.length + (myReview ? 1 : 0);
  const firstThree = allCombined.slice(0, 3);
  const remaining = allCombined.slice(3);

  // Calculate rating distribution (for the summary — TMDB reviews only)
  const rated = tmdbReviews.filter((r) => r.author_details?.rating);
  const avgRating = rated.length > 0
    ? (rated.reduce((sum, r) => sum + r.author_details.rating, 0) / rated.length).toFixed(1)
    : null;

  // Distribution buckets: 9-10, 7-8, 5-6, 3-4, 1-2
  const dist = [
    { label: '9+', count: rated.filter((r) => r.author_details.rating >= 9).length },
    { label: '7', count: rated.filter((r) => r.author_details.rating >= 7 && r.author_details.rating < 9).length },
    { label: '5', count: rated.filter((r) => r.author_details.rating >= 5 && r.author_details.rating < 7).length },
    { label: '3', count: rated.filter((r) => r.author_details.rating >= 3 && r.author_details.rating < 5).length },
    { label: '1', count: rated.filter((r) => r.author_details.rating < 3).length },
  ];

  if (!allCombined.length && !user) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="mt-14"
    >
      {/* Section header */}
      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-xl md:text-2xl font-bold font-heading text-white">
          Reviews
        </h2>
        {totalCount > 0 && (
          <span className="text-xs text-white/20 px-2 py-0.5 rounded-full border border-white/[0.06]">
            {totalCount}
          </span>
        )}
      </div>

      {/* User review area */}
      {user && (
        <div className="mb-6">
          <AnimatePresence mode="wait">
            {isEditing ? (
              <motion.div
                key="editing"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02]"
              >
                <textarea
                  value={reviewContent}
                  onChange={(e) => setReviewContent(e.target.value)}
                  placeholder="Share your thoughts... (min 10 characters)"
                  maxLength={2000}
                  rows={4}
                  className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg p-3 text-sm text-white/80 placeholder-white/20 resize-none focus:outline-none focus:border-white/15 transition-colors"
                />
                <div className="flex items-center justify-between mt-3">
                  <span className="text-[11px] text-white/25">{reviewContent.length}/2000</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => { setIsEditing(false); setReviewContent(myReview?.content || ''); }}
                      className="px-4 py-1.5 text-xs text-white/40 hover:text-white/70 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      disabled={reviewContent.trim().length < 10}
                      className="px-4 py-1.5 bg-white/[0.08] hover:bg-white/[0.12] text-white/80 rounded-lg text-xs transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      {myReview ? 'Update' : 'Post'}
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : myReview ? (
              <motion.div
                key="display"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02]"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] text-white/30 uppercase tracking-wider font-medium">Your Review</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setIsEditing(true)}
                      className="p-1.5 text-white/30 hover:text-white/60 transition-colors"
                    >
                      <IoCreateOutline size={15} />
                    </button>
                    <button
                      onClick={handleDelete}
                      className="p-1.5 text-white/30 hover:text-red-400/70 transition-colors"
                    >
                      <IoTrashOutline size={15} />
                    </button>
                  </div>
                </div>
                <p className="text-[13px] text-white/50 leading-relaxed">{myReview.content}</p>
                <span className="text-[10px] text-white/20 mt-2 block">
                  {new Date(myReview.updated_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                </span>
              </motion.div>
            ) : (
              <motion.button
                key="prompt"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsEditing(true)}
                className="w-full p-4 rounded-xl border border-dashed border-white/[0.08] text-sm text-white/30 hover:text-white/50 hover:border-white/15 transition-all"
              >
                Write a Review
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Rating summary card + distribution */}
      {rated.length > 0 && (
        <motion.div
          className="flex flex-col sm:flex-row gap-5 mb-6 p-4 md:p-5 rounded-xl border border-white/[0.06] bg-white/[0.015]"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {/* Average score */}
          <div className="flex items-center gap-4 sm:border-r sm:border-white/[0.06] sm:pr-5">
            <div className="relative">
              <svg width="64" height="64" viewBox="0 0 64 64">
                <circle cx="32" cy="32" r="27" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="3" />
                <circle
                  cx="32" cy="32" r="27"
                  fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray={170}
                  strokeDashoffset={170 * (1 - avgRating / 10)}
                  style={{ transform: 'rotate(-90deg)', transformOrigin: '32px 32px' }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-bold text-white/60">{avgRating}</span>
              </div>
            </div>
            <div>
              <StarDisplay rating={parseFloat(avgRating)} />
              <p className="text-[10px] text-white/15 mt-1">{rated.length} rated review{rated.length !== 1 ? 's' : ''}</p>
            </div>
          </div>

          {/* Distribution bars */}
          <div className="flex-1 flex flex-col gap-1.5 justify-center">
            {dist.map((d, i) => (
              <RatingBar key={d.label} label={d.label} count={d.count} total={rated.length} delay={0.3 + i * 0.05} />
            ))}
          </div>
        </motion.div>
      )}

      {/* Review cards - first 3 always visible */}
      <div className="space-y-3">
        {firstThree.map((review, i) => (
          review.user_id
            ? <UserReviewCard key={review.id || review.user_id} review={review} index={i} />
            : <ReviewCard key={review.id} review={review} index={i} />
        ))}
      </div>

      {/* Remaining reviews with animated expand/collapse */}
      {remaining.length > 0 && (
        <ExpandCollapse expanded={showAll}>
          <div className="space-y-3 pt-3">
            {remaining.map((review, i) => (
              review.user_id
                ? <UserReviewCard key={review.id || review.user_id} review={review} index={i} />
                : <ReviewCard key={review.id} review={review} index={i} />
            ))}
          </div>
        </ExpandCollapse>
      )}

      {/* Show all / collapse button */}
      {allCombined.length > 3 && (
        <motion.button
          onClick={() => setShowAll(!showAll)}
          className="mt-5 flex items-center gap-2 px-5 py-2.5 text-sm text-white/35 hover:text-white/60 border border-white/[0.06] hover:border-white/15 rounded-lg transition-all duration-300"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {showAll ? 'Show fewer reviews' : `Show all ${allCombined.length} reviews`}
          <motion.span
            animate={{ rotate: showAll ? 180 : 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="inline-flex"
          >
            <IoChevronDown size={14} />
          </motion.span>
        </motion.button>
      )}
    </motion.div>
  );
}
