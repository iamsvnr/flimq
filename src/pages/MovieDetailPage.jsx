import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { IoPlay, IoAdd, IoCheckmark, IoArrowBack, IoCalendar, IoTime } from 'react-icons/io5';
import tmdb from '@/api/tmdb';
import { ENDPOINTS, getBackdropUrl, getPosterUrl } from '@/api/endpoints';
import { getTitle, formatDate, formatRuntime, truncateText } from '@/utils/helpers';
import { pageVariants, fadeInUp } from '@/utils/animations';
import { useMyList } from '@/context/MyListContext';
import { useAuth } from '@/context/AuthContext';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Rating from '@/components/ui/Rating';
import LazyImage from '@/components/ui/LazyImage';
import Modal from '@/components/ui/Modal';
import MovieLoader from '@/components/ui/MovieLoader';
import CastCarousel from '@/components/carousels/CastCarousel';
import ContentRow from '@/components/carousels/ContentRow';

export default function MovieDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToList, removeFromList, isInList } = useMyList();
  const { user } = useAuth();
  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null);
  const [videos, setVideos] = useState(null);
  const [similar, setSimilar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showTrailer, setShowTrailer] = useState(false);

  const inList = movie ? isInList(movie.id, 'movie') : false;

  useEffect(() => {
    setLoading(true);
    Promise.all([
      tmdb.get(ENDPOINTS.MOVIE_DETAILS(id)),
      tmdb.get(ENDPOINTS.MOVIE_CREDITS(id)),
      tmdb.get(ENDPOINTS.MOVIE_VIDEOS(id)),
      tmdb.get(ENDPOINTS.MOVIE_SIMILAR(id)),
    ])
      .then(([movieData, creditsData, videosData, similarData]) => {
        setMovie(movieData);
        setCredits(creditsData);
        setVideos(videosData);
        setSimilar(similarData);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <MovieLoader />;
  if (!movie) return null;

  const trailer = videos?.results?.find(
    (v) => v.type === 'Trailer' && v.site === 'YouTube'
  ) || videos?.results?.find((v) => v.site === 'YouTube');

  const director = credits?.crew?.find((c) => c.job === 'Director');

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="bg-[#0a0a0a]">
      {/* Backdrop */}
      <div className="relative h-[70vh] landscape:h-[90vh] md:h-[80vh] min-h-[350px]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${getBackdropUrl(movie.backdrop_path)})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-[#0a0a0a]/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/90 via-[#0a0a0a]/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent" />

        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)}
          className="absolute top-20 left-4 md:left-10 z-10 p-2 rounded-md bg-black/40 backdrop-blur-sm text-white hover:bg-black/60 transition-colors"
        >
          <IoArrowBack size={20} />
        </motion.button>
      </div>

      {/* Content */}
      <div className="relative z-10 -mt-72 md:-mt-80 px-4 md:px-10 max-w-[1400px] mx-auto pb-16">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Poster */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="hidden md:block flex-shrink-0"
          >
            <LazyImage
              src={getPosterUrl(movie.poster_path, 'w500')}
              alt={movie.title}
              className="w-64 lg:w-72 aspect-[2/3] rounded-2xl shadow-2xl ring-1 ring-white/10"
            />
          </motion.div>

          {/* Info */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="flex-1 space-y-5"
          >
            <div>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold font-heading text-white text-shadow">
                {movie.title}
              </h1>
              {movie.tagline && (
                <p className="mt-2 text-lg text-white/40 italic">{movie.tagline}</p>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Rating value={movie.vote_average} size="md" />
              <div className="flex items-center gap-1.5 text-sm text-white/60">
                <IoCalendar size={14} />
                {formatDate(movie.release_date)}
              </div>
              {movie.runtime > 0 && (
                <div className="flex items-center gap-1.5 text-sm text-white/60">
                  <IoTime size={14} />
                  {formatRuntime(movie.runtime)}
                </div>
              )}
            </div>

            {/* Genres */}
            <div className="flex flex-wrap gap-2">
              {movie.genres?.map((genre) => (
                <Badge key={genre.id}>
                  {genre.name}
                </Badge>
              ))}
            </div>

            {/* Overview */}
            <p className="text-base text-white/70 leading-relaxed max-w-2xl">
              {movie.overview}
            </p>

            {director && (
              <p className="text-sm text-white/50">
                Director: <span className="text-white/80">{director.name}</span>
              </p>
            )}

            {/* Actions */}
            <div className="flex flex-wrap gap-3 pt-2">
              {trailer && (
                <Button variant="primary" size="lg" onClick={() => setShowTrailer(true)}>
                  <IoPlay size={20} />
                  Watch Trailer
                </Button>
              )}
              {user && (
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() =>
                    inList
                      ? removeFromList(movie.id, 'movie')
                      : addToList({ ...movie, media_type: 'movie' })
                  }
                >
                  {inList ? <IoCheckmark size={20} /> : <IoAdd size={20} />}
                  {inList ? 'In Watchlist' : 'Add to Watchlist'}
                </Button>
              )}
            </div>
          </motion.div>
        </div>

        {/* Cast */}
        <div className="mt-12">
          <CastCarousel cast={credits?.cast} />
        </div>

        {/* Similar Movies */}
        {similar?.results?.length > 0 && (
          <div className="mt-12">
            <ContentRow
              title="More Like This"
              items={similar.results}
              mediaType="movie"
            />
          </div>
        )}
      </div>

      {/* Trailer Modal */}
      {trailer && (
        <Modal
          isOpen={showTrailer}
          onClose={() => setShowTrailer(false)}
          title="Watch Trailer"
        >
          <div className="aspect-video w-full">
            <iframe
              src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1&rel=0&modestbranding=1`}
              title={trailer.name || 'Trailer'}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full rounded-lg"
              style={{ border: 'none' }}
            />
          </div>
        </Modal>
      )}
    </motion.div>
  );
}
