import axios from 'axios';
import { getUserRegion } from './endpoints';

const isDev = import.meta.env.DEV;

// Fetch region from IP, fall back to browser locale
let ipRegion = null;
const ipRegionPromise = fetch('https://ipapi.co/country/')
  .then((res) => res.ok ? res.text() : null)
  .then((code) => { ipRegion = code?.trim() || null; console.log('IP region:', ipRegion); })
  .catch(() => {});

const tmdb = axios.create({
  baseURL: isDev ? import.meta.env.VITE_TMDB_BASE_URL : '/.netlify/functions/tmdb',
  params: isDev ? { api_key: import.meta.env.VITE_TMDB_API_KEY, language: 'en-US' } : {},
});

// Inject region into every request
tmdb.interceptors.request.use(async (config) => {
  await ipRegionPromise;
  const region = ipRegion || getUserRegion();
  config.params = { ...config.params, region };
  if (!isDev) {
    const endpoint = config.url;
    config.url = '';
    config.params = { ...config.params, endpoint };
  }
  return config;
});

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
