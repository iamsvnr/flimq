import { useState, useEffect } from 'react';
import tmdb from '../api/tmdb';

export function useFetch(endpoint, params = {}, deps = []) {
  // Check cache synchronously to avoid loading flash
  const cached = endpoint ? tmdb.getCached(endpoint, params) : null;
  const [data, setData] = useState(cached);
  const [loading, setLoading] = useState(!cached);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!endpoint) {
      setLoading(false);
      return;
    }
    // If we already have cached data, skip fetching
    if (data && cached) return;

    let cancelled = false;
    setLoading(true);
    setError(null);
    tmdb
      .get(endpoint, { params })
      .then((res) => {
        if (!cancelled) setData(res);
      })
      .catch((err) => {
        if (!cancelled) setError(err);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [endpoint, ...deps]);

  return { data, loading, error };
}
