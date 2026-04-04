import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/supabase';
import { useAuth } from '@/context/AuthContext';

const isDev = import.meta.env.DEV;

async function getAccessToken() {
  const { data: { session } } = await supabase.auth.getSession();
  return session?.access_token || '';
}

export function useUserRating(tmdbId, mediaType) {
  const { user } = useAuth();
  const [rating, setRating] = useState(null);
  const [allRatings, setAllRatings] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAllRatings = useCallback(async () => {
    if (!tmdbId) return;
    try {
      let ratings;
      if (isDev) {
        const { data } = await supabase
          .from('user_ratings')
          .select('*')
          .eq('tmdb_id', Number(tmdbId))
          .eq('media_type', mediaType);
        ratings = data || [];
      } else {
        const res = await fetch(`/.netlify/functions/ratings?tmdb_id=${tmdbId}&media_type=${mediaType}`);
        const data = await res.json();
        ratings = Array.isArray(data) ? data : [];
      }
      if (user) {
        const mine = ratings.find((r) => r.user_id === user.id);
        if (mine) setRating(mine.rating);
      }
      setAllRatings(ratings);
    } catch {}
  }, [user, tmdbId, mediaType]);

  useEffect(() => {
    fetchAllRatings();
  }, [fetchAllRatings]);

  // Real-time subscription (read-only, safe on client)
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
      if (isDev) {
        const { error } = await supabase.from('user_ratings').upsert(
          {
            user_id: user.id,
            tmdb_id: Number(tmdbId),
            media_type: mediaType,
            rating: newRating,
            author_name: user.name || user.email?.split('@')[0] || 'User',
            avatar_url: user.avatarUrl || '',
          },
          { onConflict: 'user_id,tmdb_id,media_type' }
        );
        if (error) setRating(prev);
        else fetchAllRatings();
      } else {
        const token = await getAccessToken();
        const res = await fetch('/.netlify/functions/ratings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify({ tmdb_id: tmdbId, media_type: mediaType, rating: newRating }),
        });
        if (!res.ok) setRating(prev);
        else fetchAllRatings();
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
      if (isDev) {
        await supabase
          .from('user_ratings')
          .delete()
          .eq('user_id', user.id)
          .eq('tmdb_id', Number(tmdbId))
          .eq('media_type', mediaType);
      } else {
        const token = await getAccessToken();
        await fetch('/.netlify/functions/ratings', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify({ tmdb_id: tmdbId, media_type: mediaType }),
        });
      }
    } catch {}
  };

  return { rating, setUserRating, clearRating, loading, allRatings, avgRating, totalRatings: allRatings.length };
}
