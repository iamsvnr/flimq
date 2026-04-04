import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/supabase';
import { useAuth } from '@/context/AuthContext';

const isDev = import.meta.env.DEV;

async function getAccessToken() {
  const { data: { session } } = await supabase.auth.getSession();
  return session?.access_token || '';
}

export function useUserReview(tmdbId, mediaType) {
  const { user } = useAuth();
  const [myReview, setMyReview] = useState(null);
  const [allReviews, setAllReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAll = useCallback(async () => {
    if (!tmdbId) { setLoading(false); return; }
    try {
      let reviews;
      if (isDev) {
        const { data } = await supabase
          .from('user_reviews')
          .select('*')
          .eq('tmdb_id', Number(tmdbId))
          .eq('media_type', mediaType)
          .order('created_at', { ascending: false });
        reviews = data || [];
      } else {
        const res = await fetch(`/.netlify/functions/reviews?tmdb_id=${tmdbId}&media_type=${mediaType}`);
        const data = await res.json();
        reviews = Array.isArray(data) ? data : [];
      }
      setAllReviews(reviews);
      if (user) {
        setMyReview(reviews.find((r) => r.user_id === user.id) || null);
      }
    } catch {}
    setLoading(false);
  }, [user, tmdbId, mediaType]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  // Real-time subscription (read-only, safe on client)
  useEffect(() => {
    if (!tmdbId) return;
    const channel = supabase
      .channel(`reviews:${tmdbId}:${mediaType}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'user_reviews',
          filter: `tmdb_id=eq.${tmdbId}`,
        },
        (payload) => {
          if (payload.new?.media_type !== mediaType && payload.old?.media_type !== mediaType) return;
          fetchAll();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [tmdbId, mediaType, fetchAll]);

  const saveReview = async (content) => {
    if (!user) return;
    const prev = myReview;
    const now = new Date().toISOString();
    const optimistic = {
      ...myReview,
      user_id: user.id,
      tmdb_id: Number(tmdbId),
      media_type: mediaType,
      content,
      author_name: user.name || user.email?.split('@')[0] || 'User',
      avatar_url: user.avatarUrl || '',
      updated_at: now,
      created_at: myReview?.created_at || now,
    };
    setMyReview(optimistic);
    setAllReviews((prev) => {
      const filtered = prev.filter((r) => r.user_id !== user.id);
      return [optimistic, ...filtered];
    });
    try {
      if (isDev) {
        const { data, error } = await supabase
          .from('user_reviews')
          .upsert(
            {
              user_id: user.id,
              tmdb_id: Number(tmdbId),
              media_type: mediaType,
              content,
              author_name: user.name || user.email?.split('@')[0] || 'User',
              avatar_url: user.avatarUrl || '',
            },
            { onConflict: 'user_id,tmdb_id,media_type' }
          )
          .select()
          .single();
        if (error) {
          console.error('Review save error:', error.message);
          setMyReview(prev);
          fetchAll();
          return;
        }
        setMyReview(data);
        fetchAll();
      } else {
        const token = await getAccessToken();
        const res = await fetch('/.netlify/functions/reviews', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify({ tmdb_id: Number(tmdbId), media_type: mediaType, content }),
        });
        if (!res.ok) {
          console.error('Review save error:', (await res.json()).error);
          setMyReview(prev);
          fetchAll();
          return;
        }
        const data = await res.json();
        setMyReview(data);
        fetchAll();
      }
    } catch (e) {
      console.error('Review save exception:', e);
      setMyReview(prev);
      fetchAll();
    }
  };

  const deleteReview = async () => {
    if (!user || !myReview) return;
    const prev = myReview;
    setMyReview(null);
    setAllReviews((reviews) => reviews.filter((r) => r.user_id !== user.id));
    try {
      if (isDev) {
        const { error } = await supabase
          .from('user_reviews')
          .delete()
          .eq('user_id', user.id)
          .eq('tmdb_id', Number(tmdbId))
          .eq('media_type', mediaType);
        if (error) { setMyReview(prev); fetchAll(); }
      } else {
        const token = await getAccessToken();
        const res = await fetch('/.netlify/functions/reviews', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify({ tmdb_id: Number(tmdbId), media_type: mediaType }),
        });
        if (!res.ok) { setMyReview(prev); fetchAll(); }
      }
    } catch {
      setMyReview(prev);
      fetchAll();
    }
  };

  return { myReview, allReviews, loading, saveReview, deleteReview };
}
