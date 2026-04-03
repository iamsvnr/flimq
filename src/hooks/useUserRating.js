import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/supabase';
import { useAuth } from '@/context/AuthContext';

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
      const res = await fetch(`/.netlify/functions/ratings?tmdb_id=${tmdbId}&media_type=${mediaType}`);
      const data = await res.json();
      let ratings = Array.isArray(data) ? data : [];
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
      const token = await getAccessToken();
      const res = await fetch('/.netlify/functions/ratings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ tmdb_id: tmdbId, media_type: mediaType, rating: newRating }),
      });
      if (!res.ok) {
        setRating(prev);
      } else {
        fetchAllRatings();
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
      const token = await getAccessToken();
      await fetch('/.netlify/functions/ratings', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ tmdb_id: tmdbId, media_type: mediaType }),
      });
    } catch {}
  };

  return { rating, setUserRating, clearRating, loading, allRatings, avgRating, totalRatings: allRatings.length };
}
