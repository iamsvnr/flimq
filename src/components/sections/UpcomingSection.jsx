import { useFetch } from '@/hooks/useFetch';
import { ENDPOINTS } from '@/api/endpoints';
import ContentRow from '../carousels/ContentRow';

export default function UpcomingSection() {
  const { data, loading } = useFetch(ENDPOINTS.UPCOMING_MOVIES);
  return <ContentRow title="Coming Soon" items={data?.results} loading={loading} mediaType="movie" />;
}
