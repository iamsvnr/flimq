import { useFetch } from '@/hooks/useFetch';
import { ENDPOINTS } from '@/api/endpoints';
import ContentRow from '../carousels/ContentRow';

export default function TrendingSection() {
  const { data, loading } = useFetch(ENDPOINTS.TRENDING_MOVIES);
  return <ContentRow title="Trending Now" items={data?.results} loading={loading} mediaType="movie" />;
}
