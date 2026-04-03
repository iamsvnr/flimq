export const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const formatYear = (dateString) => {
  if (!dateString) return '';
  return new Date(dateString).getFullYear().toString();
};

export const truncateText = (text, maxLength = 200) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
};

export const formatRuntime = (minutes) => {
  if (!minutes) return '';
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return hrs > 0 ? `${hrs}h ${mins}m` : `${mins}m`;
};

export const formatVoteCount = (count) => {
  if (!count) return '0';
  if (count >= 1000) return `${(count / 1000).toFixed(1)}k`;
  return count.toString();
};

export const getRatingColor = (rating) => {
  if (rating >= 7.5) return '#ffffff';
  if (rating >= 6) return '#aaaaaa';
  if (rating >= 4) return '#777777';
  return '#555555';
};

export const getTitle = (item) =>
  item?.title || item?.name || item?.original_title || item?.original_name || 'Untitled';

export const getMediaType = (item) => {
  if (item?.media_type) return item.media_type;
  if (item?.title) return 'movie';
  if (item?.name) return 'tv';
  return 'movie';
};

export const getReleaseDate = (item) =>
  item?.release_date || item?.first_air_date || '';
