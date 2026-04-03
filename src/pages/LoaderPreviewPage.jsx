import { useParams, Link } from 'react-router-dom';
import HomeLoader from '@/components/ui/HomeLoader';
import HomeLoaderA from '@/components/ui/HomeLoaderA';
import HomeLoaderB from '@/components/ui/HomeLoaderB';
import HomeLoaderC from '@/components/ui/HomeLoaderC';
import HomeLoaderD from '@/components/ui/HomeLoaderD';
import HomeLoaderE from '@/components/ui/HomeLoaderE';
import HomeLoaderF from '@/components/ui/HomeLoaderF';
import HomeLoaderG from '@/components/ui/HomeLoaderG';
import HomeLoaderH from '@/components/ui/HomeLoaderH';
import HomeLoaderI from '@/components/ui/HomeLoaderI';
import HomeLoaderJ from '@/components/ui/HomeLoaderJ';
import HomeLoaderK from '@/components/ui/HomeLoaderK';
import HomeLoaderL from '@/components/ui/HomeLoaderL';
import HomeLoaderM from '@/components/ui/HomeLoaderM';
import HomeLoaderN from '@/components/ui/HomeLoaderN';
import HomeLoaderO from '@/components/ui/HomeLoaderO';
import MovieLoader from '@/components/ui/MovieLoader';
import TvLoader from '@/components/ui/TvLoader';
import PersonLoader from '@/components/ui/PersonLoader';

const loaders = {
  home: HomeLoader,
  'home-a': HomeLoaderA,
  'home-b': HomeLoaderB,
  'home-c': HomeLoaderC,
  'home-d': HomeLoaderD,
  'home-e': HomeLoaderE,
  'home-f': HomeLoaderF,
  'home-g': HomeLoaderG,
  'home-h': HomeLoaderH,
  'home-i': HomeLoaderI,
  'home-j': HomeLoaderJ,
  'home-k': HomeLoaderK,
  'home-l': HomeLoaderL,
  'home-m': HomeLoaderM,
  'home-n': HomeLoaderN,
  'home-o': HomeLoaderO,
  movie: MovieLoader,
  tv: TvLoader,
  person: PersonLoader,
};

const descriptions = {
  home: 'Home — Current (Curtain)',
  'home-a': 'Home A — Ink Bloom',
  'home-b': 'Home B — Film Strip',
  'home-c': 'Home C — Kinetic Geometry',
  'home-d': 'Home D — Particle Constellation',
  'home-e': 'Home E — Director\'s Pen',
  'home-f': 'Home F — Production House',
  'home-g': 'Home G — Clapperboard',
  'home-h': 'Home H — Cinema Countdown',
  'home-i': 'Home I — The Premiere',
  'home-j': 'Home J — Film Reel',
  'home-k': 'Home K — Camera Lens',
  'home-l': 'Home L — Movie Poster',
  'home-m': 'Home M — Details Card',
  'home-n': 'Home N — The Review',
  'home-o': 'Home O — Data Stream',
  movie: 'Movie Loader',
  tv: 'TV Loader',
  person: 'Person Loader',
};

export default function LoaderPreviewPage() {
  const { type } = useParams();
  const Loader = loaders[type];

  if (!Loader) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center gap-6">
        <h1 className="text-2xl font-heading font-bold text-white">Loader Preview</h1>
        <p className="text-white/40 text-sm mb-2">Pick a home loader style to preview</p>
        <div className="flex flex-col gap-3">
          {Object.keys(loaders).map((key) => (
            <Link
              key={key}
              to={`/loader/${key}`}
              className="px-6 py-3 bg-white/[0.06] hover:bg-white/10 border border-white/10 rounded-lg text-white text-sm font-medium transition-colors"
            >
              {descriptions[key] || key}
            </Link>
          ))}
        </div>
      </div>
    );
  }

  return <Loader />;
}
