import { useState, useEffect } from 'react';
import { supabase } from '@/supabase';
import { useAuth } from '@/context/AuthContext';

export function useUserRating(tmdbId, mediaType) {
  const { user } = useAuth();
  const [rating, setRating] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user || !tmdbId) return;
    supabase
      .from('user_ratings')
      .select('rating')
      .eq('user_id', user.id)
      .eq('tmdb_id', tmdbId)
      .eq('media_type', mediaType)
      .maybeSingle()
      .then(({ data }) => {
        if (data) setRating(data.rating);
      })
      .catch(() => {});
  }, [user, tmdbId, mediaType]);

  const setUserRating = async (newRating) => {
    if (!user) return;
    const prev = rating;
    setRating(newRating);
    setLoading(true);
    try {
      const { error } = await supabase.from('user_ratings').upsert(
        {
          user_id: user.id,
          tmdb_id: tmdbId,
          media_type: mediaType,
          rating: newRating,
        },
        { onConflict: 'user_id,tmdb_id,media_type' }
      );
      if (error) setRating(prev);
    } catch {
      setRating(prev);
    }
    setLoading(false);
  };

  const clearRating = async () => {
    if (!user) return;
    setRating(null);
    try {
      await supabase
        .from('user_ratings')
        .delete()
        .eq('user_id', user.id)
        .eq('tmdb_id', tmdbId)
        .eq('media_type', mediaType);
    } catch {}
  };

  return { rating, setUserRating, clearRating, loading };
}
