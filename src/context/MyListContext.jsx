import { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const MyListContext = createContext();

export function MyListProvider({ children }) {
  const [myList, setMyList] = useLocalStorage('flimq-mylist', []);

  const addToList = (item) => {
    setMyList((prev) => {
      if (prev.some((i) => i.id === item.id && i.media_type === item.media_type)) return prev;
      return [...prev, {
        id: item.id,
        title: item.title || item.name,
        poster_path: item.poster_path,
        media_type: item.media_type || (item.title ? 'movie' : 'tv'),
        vote_average: item.vote_average,
        release_date: item.release_date || item.first_air_date,
        backdrop_path: item.backdrop_path,
      }];
    });
  };

  const removeFromList = (id, mediaType) => {
    setMyList((prev) => prev.filter((item) => !(item.id === id && item.media_type === mediaType)));
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
