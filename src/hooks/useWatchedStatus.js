import { useState, useEffect } from 'react';
import { supabase } from '@/supabase';
import { useAuth } from '@/context/AuthContext';

export function useWatchedStatus(tmdbId, mediaType) {
  const { user } = useAuth();
  const [watched, setWatched] = useState(false);

  useEffect(() => {
    if (!user || !tmdbId) return;
    supabase
      .from('watch_history')
      .select('id')
      .eq('user_id', user.id)
      .eq('tmdb_id', tmdbId)
      .eq('media_type', mediaType)
      .maybeSingle()
      .then(({ data }) => {
        setWatched(!!data);
      })
      .catch(() => {});
  }, [user, tmdbId, mediaType]);

  const toggleWatched = async () => {
    if (!user) return;
    const newVal = !watched;
    setWatched(newVal);
    try {
      if (newVal) {
        await supabase.from('watch_history').upsert(
          { user_id: user.id, tmdb_id: tmdbId, media_type: mediaType },
          { onConflict: 'user_id,tmdb_id,media_type' }
        );
      } else {
        await supabase
          .from('watch_history')
          .delete()
          .eq('user_id', user.id)
          .eq('tmdb_id', tmdbId)
          .eq('media_type', mediaType);
      }
    } catch {}
  };

  return { watched, toggleWatched };
}
