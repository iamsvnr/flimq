export const ENDPOINTS = {
  TRENDING_ALL: '/trending/all/week',
  TRENDING_MOVIES: '/trending/movie/week',
  TRENDING_TV: '/trending/tv/week',
  POPULAR_MOVIES: '/movie/popular',
  TOP_RATED_MOVIES: '/movie/top_rated',
  UPCOMING_MOVIES: '/movie/upcoming',
  NOW_PLAYING: '/movie/now_playing',
  MOVIE_DETAILS: (id) => `/movie/${id}`,
  MOVIE_CREDITS: (id) => `/movie/${id}/credits`,
  MOVIE_VIDEOS: (id) => `/movie/${id}/videos`,
  MOVIE_SIMILAR: (id) => `/movie/${id}/similar`,
  POPULAR_TV: '/tv/popular',
  TOP_RATED_TV: '/tv/top_rated',
  AIRING_TODAY: '/tv/airing_today',
  TV_DETAILS: (id) => `/tv/${id}`,
  TV_CREDITS: (id) => `/tv/${id}/credits`,
  TV_VIDEOS: (id) => `/tv/${id}/videos`,
  TV_SIMILAR: (id) => `/tv/${id}/similar`,
  TV_SEASON: (id, season) => `/tv/${id}/season/${season}`,
  SEARCH_MULTI: '/search/multi',
  MOVIE_GENRES: '/genre/movie/list',
  TV_GENRES: '/genre/tv/list',
  DISCOVER_MOVIE: '/discover/movie',
  DISCOVER_TV: '/discover/tv',
  PERSON_DETAILS: (id) => `/person/${id}`,
  PERSON_MOVIE_CREDITS: (id) => `/person/${id}/movie_credits`,
  PERSON_TV_CREDITS: (id) => `/person/${id}/tv_credits`,
  PERSON_IMAGES: (id) => `/person/${id}/images`,
};

export const getImageUrl = (path, size = 'w500') =>
  path ? `${import.meta.env.VITE_TMDB_IMAGE_BASE}/${size}${path}` : null;

export const getBackdropUrl = (path) => getImageUrl(path, 'w1280');
export const getOriginalUrl = (path) => getImageUrl(path, 'original');
export const getPosterUrl = (path, size = 'w342') => getImageUrl(path, size);
export const getProfileUrl = (path) => getImageUrl(path, 'w185');
