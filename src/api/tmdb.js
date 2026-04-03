import axios from 'axios';

const isDev = import.meta.env.DEV;

const tmdb = axios.create({
  baseURL: isDev ? import.meta.env.VITE_TMDB_BASE_URL : '/api/tmdb',
  params: isDev ? { api_key: import.meta.env.VITE_TMDB_API_KEY, language: 'en-US' } : {},
});

// In production, rewrite requests to use the proxy endpoint query param
if (!isDev) {
  tmdb.interceptors.request.use((config) => {
    // The baseURL is /api/tmdb, and the endpoint path goes as a query param
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

export default tmdb;
