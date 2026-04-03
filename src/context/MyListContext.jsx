import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/supabase';
import { useAuth } from './AuthContext';

const MyListContext = createContext();

export function MyListProvider({ children }) {
  const { user } = useAuth();
  const [myList, setMyList] = useState([]);

  // Sync watchlist from Supabase when user changes
  useEffect(() => {
    if (!user) {
      setMyList([]);
      return;
    }

    // Fetch initial watchlist
    supabase
      .from('watchlist')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        if (data) setMyList(data.map(rowToItem));
      });

    // Real-time subscription
    const channel = supabase
      .channel('watchlist-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'watchlist', filter: `user_id=eq.${user.id}` },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setMyList((prev) => {
              if (prev.some((i) => i.id === payload.new.tmdb_id && i.media_type === payload.new.media_type)) return prev;
              return [rowToItem(payload.new), ...prev];
            });
          } else if (payload.eventType === 'DELETE') {
            setMyList((prev) => prev.filter((i) => !(i.id === payload.old.tmdb_id && i.media_type === payload.old.media_type)));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const rowToItem = (row) => ({
    id: row.tmdb_id,
    title: row.title,
    poster_path: row.poster_path,
    media_type: row.media_type,
    vote_average: row.vote_average,
    release_date: row.release_date,
    backdrop_path: row.backdrop_path,
  });

  const addToList = async (item) => {
    if (!user) return;
    const mediaType = item.media_type || (item.title ? 'movie' : 'tv');

    // Optimistic update
    const newItem = {
      id: item.id,
      title: item.title || item.name,
      poster_path: item.poster_path,
      media_type: mediaType,
      vote_average: item.vote_average,
      release_date: item.release_date || item.first_air_date,
      backdrop_path: item.backdrop_path,
    };
    setMyList((prev) => {
      if (prev.some((i) => i.id === item.id && i.media_type === mediaType)) return prev;
      return [newItem, ...prev];
    });

    await supabase.from('watchlist').upsert({
      user_id: user.id,
      tmdb_id: item.id,
      media_type: mediaType,
      title: item.title || item.name,
      poster_path: item.poster_path,
      vote_average: item.vote_average,
      release_date: item.release_date || item.first_air_date,
      backdrop_path: item.backdrop_path,
    }, { onConflict: 'user_id,tmdb_id,media_type' });
  };

  const removeFromList = async (id, mediaType) => {
    if (!user) return;
    // Optimistic update
    setMyList((prev) => prev.filter((item) => !(item.id === id && item.media_type === mediaType)));

    await supabase
      .from('watchlist')
      .delete()
      .eq('user_id', user.id)
      .eq('tmdb_id', id)
      .eq('media_type', mediaType);
  };

  const isInList = (id, mediaType) => {
    return myList.some((item) => item.id === id && item.media_type === mediaType);
  };

  return (
    <MyListContext.Provider value={{ myList, addToList, removeFromList, isInList }}>
      {children}
    </MyListContext.Provider>
  );
}

export function useMyList() {
  const context = useContext(MyListContext);
  if (!context) throw new Error('useMyList must be used within MyListProvider');
  return context;
}
