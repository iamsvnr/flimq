import { useFetch } from '@/hooks/useFetch';
import { ENDPOINTS } from '@/api/endpoints';
import ContentRow from '../carousels/ContentRow';

export default function TopRatedSection() {
  const { data, loading } = useFetch(ENDPOINTS.TOP_RATED_MOVIES);
  return <ContentRow title="Top Rated" items={data?.results} loading={loading} mediaType="movie" />;
}
