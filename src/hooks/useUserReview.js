import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/supabase';
import { useAuth } from '@/context/AuthContext';

export function useUserReview(tmdbId, mediaType) {
  const { user } = useAuth();
  const [myReview, setMyReview] = useState(null);
  const [allReviews, setAllReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAll = useCallback(async () => {
    if (!tmdbId) { setLoading(false); return; }
    try {
      const { data, error } = await supabase
        .from('user_reviews')
        .select('*')
        .eq('tmdb_id', tmdbId)
        .eq('media_type', mediaType)
        .order('created_at', { ascending: false });
      if (error) { setLoading(false); return; }
      const reviews = data || [];
      setAllReviews(reviews);
      if (user) {
        setMyReview(reviews.find((r) => r.user_id === user.id) || null);
      }
    } catch {}
    setLoading(false);
  }, [user, tmdbId, mediaType]);

  // Initial fetch
  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  // Real-time subscription
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
    const authorName = user.name || user.email?.split('@')[0] || 'User';
    const avatarUrl = user.avatarUrl || '';
    const optimistic = {
      ...myReview,
      user_id: user.id,
      tmdb_id: Number(tmdbId),
      media_type: mediaType,
      content,
      author_name: authorName,
      avatar_url: avatarUrl,
      updated_at: now,
      created_at: myReview?.created_at || now,
    };
    setMyReview(optimistic);
    setAllReviews((prev) => {
      const filtered = prev.filter((r) => r.user_id !== user.id);
      return [optimistic, ...filtered];
    });
    try {
      const { data, error } = await supabase
        .from('user_reviews')
        .upsert(
          {
            user_id: user.id,
            tmdb_id: Number(tmdbId),
            media_type: mediaType,
            content,
            author_name: authorName,
            avatar_url: avatarUrl,
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
      const { error } = await supabase
        .from('user_reviews')
        .delete()
        .eq('user_id', user.id)
        .eq('tmdb_id', Number(tmdbId))
        .eq('media_type', mediaType);
      if (error) { setMyReview(prev); fetchAll(); }
    } catch {
      setMyReview(prev);
      fetchAll();
    }
  };

  return { myReview, allReviews, loading, saveReview, deleteReview };
}
