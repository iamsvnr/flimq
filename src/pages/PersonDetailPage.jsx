import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { IoArrowBack, IoCalendar, IoLocation, IoFilm, IoTv } from 'react-icons/io5';
import tmdb from '@/api/tmdb';
import { ENDPOINTS, getProfileUrl, getImageUrl, getPosterUrl } from '@/api/endpoints';
import { formatDate, formatYear } from '@/utils/helpers';
import { pageVariants, fadeInUp, staggerContainer } from '@/utils/animations';
import LazyImage from '@/components/ui/LazyImage';
import PersonLoader from '@/components/ui/PersonLoader';
import ContentRow from '@/components/carousels/ContentRow';

export default function PersonDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [person, setPerson] = useState(null);
  const [movieCredits, setMovieCredits] = useState(null);
  const [tvCredits, setTvCredits] = useState(null);
  const [images, setImages] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showFullBio, setShowFullBio] = useState(false);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      tmdb.get(ENDPOINTS.PERSON_DETAILS(id)),
      tmdb.get(ENDPOINTS.PERSON_MOVIE_CREDITS(id)),
      tmdb.get(ENDPOINTS.PERSON_TV_CREDITS(id)),
      tmdb.get(ENDPOINTS.PERSON_IMAGES(id)),
    ])
      .then(([personData, movieData, tvData, imageData]) => {
        setPerson(personData);
        setMovieCredits(movieData);
        setTvCredits(tvData);
        setImages(imageData);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <PersonLoader />;
  if (!person) return null;

  const age = person.birthday
    ? Math.floor(
        (new Date(person.deathday || Date.now()) - new Date(person.birthday)) /
          (365.25 * 24 * 60 * 60 * 1000)
      )
    : null;

  // Sort movies by popularity
  const topMovies = movieCredits?.cast
    ?.sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
    .filter((m) => m.poster_path)
    || [];

  const topTvShows = tvCredits?.cast
    ?.sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
    .filter((s) => s.poster_path)
    || [];

  const photoGallery = images?.profiles?.slice(0, 10) || [];

  const bioText = person.biography || '';
  const shortBio = bioText.length > 400 ? bioText.slice(0, 400) + '...' : bioText;

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      {/* Top gradient bg */}
      <div className="relative min-h-[40vh] md:min-h-[50vh]">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-surface-900/80 to-surface-900" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--color-white)_0%,_transparent_60%)] opacity-20" />

        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)}
          className="absolute top-20 left-4 md:left-8 z-10 p-2 rounded-full glass text-white hover:bg-white/10 transition-colors"
        >
          <IoArrowBack size={22} />
        </motion.button>
      </div>

      {/* Person Content */}
      <div className="relative z-10 -mt-52 md:-mt-64 px-4 md:px-8 max-w-7xl mx-auto pb-16">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
          {/* Profile Image + Gallery */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex-shrink-0 flex flex-col items-center md:items-start gap-4"
          >
            <div className="relative">
              <LazyImage
                src={getProfileUrl(person.profile_path)}
                alt={person.name}
                className="w-48 h-48 md:w-64 md:h-64 rounded-2xl shadow-2xl ring-2 ring-white/10 object-cover"
              />
              {/* Glow behind image */}
              <div className="absolute -inset-2 rounded-2xl bg-gradient-to-b from-primary-500/20 to-accent-500/20 blur-xl -z-10" />
            </div>

            {/* Photo gallery */}
            {photoGallery.length > 1 && (
              <div className="flex gap-2 flex-wrap justify-center md:justify-start">
                {photoGallery.slice(1, 5).map((img, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="w-14 h-14 rounded-lg overflow-hidden ring-1 ring-white/10 hover:ring-accent-500/50 transition-all cursor-pointer"
                  >
                    <LazyImage
                      src={getImageUrl(img.file_path, 'w185')}
                      alt={`${person.name} photo`}
                      className="w-full h-full"
                    />
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Info */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="flex-1 space-y-6"
          >
            <div>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold font-heading text-white text-shadow">
                {person.name}
              </h1>
              <p className="mt-1 text-lg text-white/40">{person.known_for_department}</p>
            </div>

            {/* Stats row */}
            <div className="flex flex-wrap gap-4">
              {person.birthday && (
                <div className="glass px-4 py-2.5 flex items-center gap-2">
                  <IoCalendar className="text-white/50" size={16} />
                  <div>
                    <p className="text-xs text-white/40">Born</p>
                    <p className="text-sm text-white font-medium">
                      {formatDate(person.birthday)}
                      {age && !person.deathday && <span className="text-white/40"> ({age} yrs)</span>}
                    </p>
                  </div>
                </div>
              )}
              {person.deathday && (
                <div className="glass px-4 py-2.5 flex items-center gap-2">
                  <IoCalendar className="text-white/40" size={16} />
                  <div>
                    <p className="text-xs text-white/40">Died</p>
                    <p className="text-sm text-white font-medium">
                      {formatDate(person.deathday)}
                      {age && <span className="text-white/40"> (age {age})</span>}
                    </p>
                  </div>
                </div>
              )}
              {person.place_of_birth && (
                <div className="glass px-4 py-2.5 flex items-center gap-2">
                  <IoLocation className="text-white/50" size={16} />
                  <div>
                    <p className="text-xs text-white/40">Place of Birth</p>
                    <p className="text-sm text-white font-medium">{person.place_of_birth}</p>
                  </div>
                </div>
              )}
              {topMovies.length > 0 && (
                <div className="glass px-4 py-2.5 flex items-center gap-2">
                  <IoFilm className="text-white/50" size={16} />
                  <div>
                    <p className="text-xs text-white/40">Movies</p>
                    <p className="text-sm text-white font-medium">{topMovies.length}</p>
                  </div>
                </div>
              )}
              {topTvShows.length > 0 && (
                <div className="glass px-4 py-2.5 flex items-center gap-2">
                  <IoTv className="text-white/50" size={16} />
                  <div>
                    <p className="text-xs text-white/40">TV Shows</p>
                    <p className="text-sm text-white font-medium">{topTvShows.length}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Biography */}
            {bioText && (
              <div>
                <h3 className="text-lg font-bold font-heading text-white mb-2">Biography</h3>
                <p className="text-sm text-white/60 leading-relaxed">
                  {showFullBio ? bioText : shortBio}
                </p>
                {bioText.length > 400 && (
                  <button
                    onClick={() => setShowFullBio(!showFullBio)}
                    className="mt-2 text-sm text-white/60 hover:text-white transition-colors font-medium"
                  >
                    {showFullBio ? 'Show Less' : 'Read More'}
                  </button>
                )}
              </div>
            )}
          </motion.div>
        </div>

        {/* Known For - Movies */}
        {topMovies.length > 0 && (
          <div className="mt-14">
            <ContentRow
              title={`Movies featuring ${person.name}`}
              items={topMovies}
              mediaType="movie"
            />
          </div>
        )}

        {/* Known For - TV */}
        {topTvShows.length > 0 && (
          <div className="mt-10">
            <ContentRow
              title={`TV Shows featuring ${person.name}`}
              items={topTvShows}
              mediaType="tv"
            />
          </div>
        )}
      </div>
    </motion.div>
  );
}
