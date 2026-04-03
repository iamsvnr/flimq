import { useFetch } from '@/hooks/useFetch';
import { ENDPOINTS } from '@/api/endpoints';
import ContentRow from './ContentRow';

export default function GenreRow({ genre }) {
  const { data, loading } = useFetch(ENDPOINTS.DISCOVER_MOVIE, {
    with_genres: genre.id,
    sort_by: 'popularity.desc',
  }, [genre.id]);

  return (
    <ContentRow
      title={genre.name}
      items={data?.results}
      loading={loading}
      mediaType="movie"
    />
  );
}
