import { FEATURED_GENRES } from '@/utils/constants';
import GenreRow from '../carousels/GenreRow';

export default function GenresSection() {
  return (
    <div className="space-y-10">
      {FEATURED_GENRES.map((genre) => (
        <GenreRow key={genre.id} genre={genre} />
      ))}
    </div>
  );
}
