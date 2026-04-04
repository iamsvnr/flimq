import { useFetch } from '@/hooks/useFetch';
import { ENDPOINTS } from '@/api/endpoints';
import { useAuth } from '@/context/AuthContext';
import ContentRow from './ContentRow';

export default function GenreRow({ genre }) {
  const { preferredLanguage } = useAuth();
  const params = {
    with_genres: genre.id,
    sort_by: 'popularity.desc',
  };
  if (preferredLanguage) params.with_original_language = preferredLanguage;

  const { data, loading } = useFetch(ENDPOINTS.DISCOVER_MOVIE, params, [genre.id, preferredLanguage]);

  return (
    <ContentRow
      title={genre.name}
      items={data?.results}
      loading={loading}
      mediaType="movie"
    />
  );
}
