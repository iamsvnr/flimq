import { useFetch } from '@/hooks/useFetch';
import { ENDPOINTS } from '@/api/endpoints';
import ContentRow from '../carousels/ContentRow';

export default function PopularSection() {
  const { data, loading } = useFetch(ENDPOINTS.POPULAR_MOVIES);
  return <ContentRow title="Popular Movies" items={data?.results} loading={loading} mediaType="movie" link="/movies" />;
}
