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
  MOVIE_REVIEWS: (id) => `/movie/${id}/reviews`,
  MOVIE_RELEASE_DATES: (id) => `/movie/${id}/release_dates`,
  MOVIE_WATCH_PROVIDERS: (id) => `/movie/${id}/watch/providers`,
  POPULAR_TV: '/tv/popular',
  TOP_RATED_TV: '/tv/top_rated',
  AIRING_TODAY: '/tv/airing_today',
  TV_DETAILS: (id) => `/tv/${id}`,
  TV_CREDITS: (id) => `/tv/${id}/credits`,
  TV_VIDEOS: (id) => `/tv/${id}/videos`,
  TV_SIMILAR: (id) => `/tv/${id}/similar`,
  TV_REVIEWS: (id) => `/tv/${id}/reviews`,
  TV_CONTENT_RATINGS: (id) => `/tv/${id}/content_ratings`,
  TV_WATCH_PROVIDERS: (id) => `/tv/${id}/watch/providers`,
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

const IMAGE_BASE = 'https://image.tmdb.org/t/p';

export const getImageUrl = (path, size = 'w500') =>
  path ? `${IMAGE_BASE}/${size}${path}` : null;

export const getBackdropUrl = (path) => getImageUrl(path, 'w1280');
export const getOriginalUrl = (path) => getImageUrl(path, 'original');
export const getPosterUrl = (path, size = 'w342') => getImageUrl(path, size);
export const getProfileUrl = (path) => getImageUrl(path, 'w185');

// Get user's region code from browser locale (e.g. "en-IN" → "IN", "en-US" → "US")
export const getUserRegion = () => {
  const lang = navigator.language || navigator.userLanguage || 'en-US';
  const parts = lang.split('-');
  return (parts[1] || 'US').toUpperCase();
};

// Extract certification from TMDB release_dates (movies)
export const getMovieCertification = (releaseDates) => {
  if (!releaseDates?.results) return null;
  const region = getUserRegion();
  // Try user's region first, then fallback to US, then any available
  const regionData = releaseDates.results.find((r) => r.iso_3166_1 === region)
    || releaseDates.results.find((r) => r.iso_3166_1 === 'US')
    || releaseDates.results[0];
  if (!regionData) return null;
  const cert = regionData.release_dates?.find((d) => d.certification)?.certification;
  return cert ? { certification: cert, region: regionData.iso_3166_1 } : null;
};

// Extract certification from TMDB content_ratings (TV)
export const getTvCertification = (contentRatings) => {
  if (!contentRatings?.results) return null;
  const region = getUserRegion();
  const regionData = contentRatings.results.find((r) => r.iso_3166_1 === region)
    || contentRatings.results.find((r) => r.iso_3166_1 === 'US')
    || contentRatings.results[0];
  return regionData ? { certification: regionData.rating, region: regionData.iso_3166_1 } : null;
};
