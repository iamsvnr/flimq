import { useState, useEffect } from 'react';
import tmdb from '@/api/tmdb';
import { ENDPOINTS } from '@/api/endpoints';
import { useAuth } from '@/context/AuthContext';
import { useMyList } from '@/context/MyListContext';
import ContentRow from '../carousels/ContentRow';

export default function RecommendedSection() {
  const { user } = useAuth();
  const { myList } = useMyList();
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (!user || myList.length === 0) return;

    // Pick a random item from watchlist and get similar content
    const randomItem = myList[Math.floor(Math.random() * Math.min(myList.length, 5))];
    const mediaType = randomItem.media_type || 'movie';
    const endpoint = mediaType === 'movie'
      ? ENDPOINTS.MOVIE_SIMILAR(randomItem.id)
      : ENDPOINTS.TV_SIMILAR(randomItem.id);

    tmdb.get(endpoint).then((res) => {
      if (res.results?.length) {
        setItems(res.results.slice(0, 20).map((item) => ({
          ...item,
          media_type: mediaType,
        })));
      }
    }).catch(() => {});
  }, [user, myList.length]);

  if (!user || myList.length === 0 || items.length === 0) return null;

  return (
    <ContentRow
      title="Recommended For You"
      items={items}
    />
  );
}
