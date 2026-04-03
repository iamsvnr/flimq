import { useParams, Link } from 'react-router-dom';
import HomeLoader from '@/components/ui/HomeLoader';
import MovieLoader from '@/components/ui/MovieLoader';
import TvLoader from '@/components/ui/TvLoader';
import PersonLoader from '@/components/ui/PersonLoader';

const loaders = {
  home: HomeLoader,
  movie: MovieLoader,
  tv: TvLoader,
  person: PersonLoader,
};

export default function LoaderPreviewPage() {
  const { type } = useParams();
  const Loader = loaders[type];

  if (!Loader) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center gap-6">
        <h1 className="text-2xl font-heading font-bold text-white">Loader Preview</h1>
        <div className="flex flex-col gap-3">
          {Object.keys(loaders).map((key) => (
            <Link
              key={key}
              to={`/loader/${key}`}
              className="px-6 py-3 bg-white/[0.06] hover:bg-white/10 border border-white/10 rounded-lg text-white text-sm font-medium transition-colors capitalize"
            >
              {key} Loader
            </Link>
          ))}
        </div>
      </div>
    );
  }

  return <Loader />;
}
