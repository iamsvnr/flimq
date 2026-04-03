import axios from 'axios';

const isDev = import.meta.env.DEV;

const tmdb = axios.create({
  baseURL: isDev ? import.meta.env.VITE_TMDB_BASE_URL : '/.netlify/functions/tmdb',
  params: isDev ? { api_key: import.meta.env.VITE_TMDB_API_KEY, language: 'en-US' } : {},
});

// In production, rewrite requests to use the proxy endpoint query param
if (!isDev) {
  tmdb.interceptors.request.use((config) => {
    const endpoint = config.url;
    config.url = '';
    config.params = { ...config.params, endpoint };
    return config;
  });
}

tmdb.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error('TMDB API Error:', error.response?.status, error.message);
    return Promise.reject(error);
  }
);

// In-memory cache to prevent re-fetching preloaded data
const cache = new Map();

const cacheKey = (url, params) => url + JSON.stringify(params || {});

const originalGet = tmdb.get.bind(tmdb);
tmdb.get = (url, config) => {
  const key = cacheKey(url, config?.params);
  if (cache.has(key)) {
    return Promise.resolve(cache.get(key));
  }
  return originalGet(url, config).then((data) => {
    cache.set(key, data);
    return data;
  });
};

// Synchronous cache lookup for instant hydration (avoids loading flash)
tmdb.getCached = (url, params) => cache.get(cacheKey(url, params)) || null;

export default tmdb;
