import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/supabase';
import { useAuth } from '@/context/AuthContext';

export function useUserRating(tmdbId, mediaType) {
  const { user } = useAuth();
  const [rating, setRating] = useState(null);
  const [allRatings, setAllRatings] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAllRatings = useCallback(async () => {
    if (!tmdbId) return;
    const { data } = await supabase
      .from('user_ratings')
      .select('*')
      .eq('tmdb_id', tmdbId)
      .eq('media_type', mediaType);
    let ratings = data || [];
    if (user) {
      const userName = user.name || user.email?.split('@')[0] || 'User';
      const userAvatar = user.avatarUrl || '';
      ratings = ratings.map((r) =>
        r.user_id === user.id
          ? { ...r, author_name: r.author_name || userName, avatar_url: r.avatar_url || userAvatar }
          : r
      );
      const mine = ratings.find((r) => r.user_id === user.id);
      if (mine) setRating(mine.rating);
    }
    setAllRatings(ratings);
  }, [user, tmdbId, mediaType]);

  // Initial fetch
  useEffect(() => {
    fetchAllRatings();
  }, [fetchAllRatings]);

  // Real-time subscription
  useEffect(() => {
    if (!tmdbId) return;
    const channel = supabase
      .channel(`ratings:${tmdbId}:${mediaType}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'user_ratings',
          filter: `tmdb_id=eq.${tmdbId}`,
        },
        (payload) => {
          if (payload.new?.media_type !== mediaType && payload.old?.media_type !== mediaType) return;
          fetchAllRatings();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [tmdbId, mediaType, fetchAllRatings]);

  const avgRating = allRatings.length > 0
    ? (allRatings.reduce((sum, r) => sum + r.rating, 0) / allRatings.length).toFixed(1)
    : null;

  const setUserRating = async (newRating) => {
    if (!user) return;
    if (!newRating) { await clearRating(); return; }
    const prev = rating;
    setRating(newRating);
    setLoading(true);
    try {
      const authorName = user.name || user.email?.split('@')[0] || 'User';
      const avatarUrl = user.avatarUrl || '';
      const { error } = await supabase.from('user_ratings').upsert(
        {
          user_id: user.id,
          tmdb_id: tmdbId,
          media_type: mediaType,
          rating: newRating,
          author_name: authorName,
          avatar_url: avatarUrl,
        },
        { onConflict: 'user_id,tmdb_id,media_type' }
      );
      if (error) setRating(prev);
      else {
        setAllRatings((prev) => {
          const filtered = prev.filter((r) => r.user_id !== user.id);
          return [...filtered, { user_id: user.id, tmdb_id: tmdbId, media_type: mediaType, rating: newRating, author_name: authorName, avatar_url: avatarUrl }];
        });
      }
    } catch {
      setRating(prev);
    }
    setLoading(false);
  };

  const clearRating = async () => {
    if (!user) return;
    setRating(null);
    setAllRatings((prev) => prev.filter((r) => r.user_id !== user.id));
    try {
      await supabase
        .from('user_ratings')
        .delete()
        .eq('user_id', user.id)
        .eq('tmdb_id', tmdbId)
        .eq('media_type', mediaType);
    } catch {}
  };

  return { rating, setUserRating, clearRating, loading, allRatings, avgRating, totalRatings: allRatings.length };
}
