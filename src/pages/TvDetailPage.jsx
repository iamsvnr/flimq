import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { IoPlay, IoAdd, IoCheckmark, IoCalendar, IoTv, IoChevronDown, IoFilm, IoEye, IoEyeOutline } from 'react-icons/io5';
import tmdb from '@/api/tmdb';
import { ENDPOINTS, getBackdropUrl, getPosterUrl, getTvCertification } from '@/api/endpoints';
import { formatDate } from '@/utils/helpers';
import { pageVariants, fadeInUp } from '@/utils/animations';
import { useMyList } from '@/context/MyListContext';
import { useAuth } from '@/context/AuthContext';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Rating from '@/components/ui/Rating';
import LazyImage from '@/components/ui/LazyImage';
import Modal from '@/components/ui/Modal';
import TvLoader from '@/components/ui/TvLoader';
import CastCarousel from '@/components/carousels/CastCarousel';
import ContentRow from '@/components/carousels/ContentRow';
import ReviewSection from '@/components/sections/ReviewSection';
import WatchProviders from '@/components/sections/WatchProviders';
import ShareButtons from '@/components/ui/ShareButtons';
import SEO from '@/components/ui/SEO';
import UserRatingComponent from '@/components/ui/UserRating';
import { useUserRating } from '@/hooks/useUserRating';
import { useWatchedStatus } from '@/hooks/useWatchedStatus';

export default function TvDetailPage() {
  const { id } = useParams();
  const { addToList, removeFromList, isInList } = useMyList();
  const { user } = useAuth();
  const { rating: userRating, setUserRating, avgRating: communityRating, totalRatings, allRatings } = useUserRating(Number(id), 'tv');
  const { watched, toggleWatched } = useWatchedStatus(Number(id), 'tv');
  const [show, setShow] = useState(null);
  const [credits, setCredits] = useState(null);
  const [videos, setVideos] = useState(null);
  const [similar, setSimilar] = useState(null);
  const [reviews, setReviews] = useState(null);
  const [watchProviders, setWatchProviders] = useState(null);
  const [certification, setCertification] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showTrailer, setShowTrailer] = useState(false);
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [seasonData, setSeasonData] = useState(null);
  const [seasonLoading, setSeasonLoading] = useState(false);

  const inList = show ? isInList(show.id, 'tv') : false;

  useEffect(() => {
    setLoading(true);
    Promise.all([
      tmdb.get(ENDPOINTS.TV_DETAILS(id)),
      tmdb.get(ENDPOINTS.TV_CREDITS(id)),
      tmdb.get(ENDPOINTS.TV_VIDEOS(id)),
      tmdb.get(ENDPOINTS.TV_SIMILAR(id)),
      tmdb.get(ENDPOINTS.TV_REVIEWS(id)),
      tmdb.get(ENDPOINTS.TV_CONTENT_RATINGS(id)),
      tmdb.get(ENDPOINTS.TV_WATCH_PROVIDERS(id)),
    ])
      .then(([showData, creditsData, videosData, similarData, reviewsData, contentRatingsData, watchProvidersData]) => {
        setShow(showData);
        setCredits(creditsData);
        setVideos(videosData);
        setSimilar(similarData);
        setReviews(reviewsData);
        setCertification(getTvCertification(contentRatingsData));
        setWatchProviders(watchProvidersData);
        if (showData.number_of_seasons > 0) {
          setSelectedSeason(1);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  // Fetch season details when selected season changes
  useEffect(() => {
    if (!id || !selectedSeason) return;
    setSeasonLoading(true);
    tmdb.get(ENDPOINTS.TV_SEASON(id, selectedSeason))
      .then((data) => setSeasonData(data))
      .catch(console.error)
      .finally(() => setSeasonLoading(false));
  }, [id, selectedSeason]);

  if (loading) return <TvLoader />;
  if (!show) return null;

  const trailer = videos?.results?.find(
    (v) => v.type === 'Trailer' && v.site === 'YouTube'
  ) || videos?.results?.find((v) => v.site === 'YouTube');

  const seasons = show.seasons?.filter((s) => s.season_number > 0) || [];

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="bg-[#0a0a0a]">
      <SEO
        title={show.name}
        description={show.overview}
        image={getBackdropUrl(show.backdrop_path)}
      />
      {/* Backdrop */}
      <div className="detail-backdrop relative h-[70vh] md:h-[80vh]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${getBackdropUrl(show.backdrop_path)})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-[#0a0a0a]/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/90 via-[#0a0a0a]/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 -mt-72 md:-mt-80 px-4 md:px-10 max-w-[1400px] mx-auto pb-16">
        <div className="flex flex-col md:flex-row gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="hidden md:block flex-shrink-0"
          >
            <LazyImage
              src={getPosterUrl(show.poster_path, 'w500')}
              alt={show.name}
              className="w-64 lg:w-72 aspect-[2/3] rounded-2xl shadow-2xl ring-1 ring-white/10"
            />
          </motion.div>

          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="flex-1 space-y-5"
          >
            <div>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold font-heading text-white text-shadow">
                {show.name}
              </h1>
              {show.tagline && (
                <p className="mt-2 text-lg text-white/40 italic">{show.tagline}</p>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Rating value={show.vote_average} size="md" />
              {certification && (
                <span className="px-2 py-0.5 text-xs font-semibold border border-white/20 rounded text-white/70 tracking-wide">
                  {certification.certification}
                </span>
              )}
              <div className="flex items-center gap-1.5 text-sm text-white/60">
                <IoCalendar size={14} />
                {formatDate(show.first_air_date)}
              </div>
              <div className="flex items-center gap-1.5 text-sm text-white/60">
                <IoTv size={14} />
                {show.number_of_seasons} Season{show.number_of_seasons !== 1 ? 's' : ''}
              </div>
              {show.number_of_episodes && (
                <div className="flex items-center gap-1.5 text-sm text-white/60">
                  <IoFilm size={14} />
                  {show.number_of_episodes} Episodes
                </div>
              )}
              <Badge className="bg-white/5 text-white/60">
                {show.status}
              </Badge>
            </div>

            <div className="flex flex-wrap gap-2">
              {show.genres?.map((genre) => (
                <Badge key={genre.id}>
                  {genre.name}
                </Badge>
              ))}
            </div>

            <p className="text-base text-white/70 leading-relaxed max-w-2xl">
              {show.overview}
            </p>

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
                      ? removeFromList(show.id, 'tv')
                      : addToList({ ...show, media_type: 'tv' })
                  }
                >
                  {inList ? <IoCheckmark size={20} /> : <IoAdd size={20} />}
                  {inList ? 'In Watchlist' : 'Add to Watchlist'}
                </Button>
              )}
              {user && (
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={toggleWatched}
                >
                  {watched ? <IoEye size={20} /> : <IoEyeOutline size={20} />}
                  {watched ? 'Watched' : 'Mark Watched'}
                </Button>
              )}
              <ShareButtons title={show.name} mediaType="tv" />
            </div>

            {/* User Rating */}
            <div className="flex items-center gap-3 pt-1 flex-wrap">
              {user && (
                <>
                  <span className="text-xs text-white/30">Rate this:</span>
                  <UserRatingComponent
                    rating={userRating}
                    onRate={(val) => val ? setUserRating(val) : setUserRating(null)}
                  />
                </>
              )}
              {totalRatings > 0 && (
                <div className="flex items-center gap-2">
                  <div className="flex items-center -space-x-1.5">
                    {allRatings.slice(0, 3).map((r, i) => (
                      <div key={r.user_id} className="w-6 h-6 rounded-full bg-white/10 border border-white/[0.08] flex items-center justify-center text-[9px] font-bold text-white/50 overflow-hidden" style={{ zIndex: 3 - i }}>
                        {r.avatar_url ? (
                          <img src={r.avatar_url} alt={r.author_name || 'User'} className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = ''; }} />
                        ) : null}
                        <span style={{ display: r.avatar_url ? 'none' : '' }}>{(r.author_name || 'U').charAt(0).toUpperCase()}</span>
                      </div>
                    ))}
                    {totalRatings > 3 && (
                      <div className="w-6 h-6 rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-[8px] font-medium text-white/40" style={{ zIndex: 0 }}>
                        +{totalRatings - 3}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Seasons & Episodes */}
        {seasons.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-14"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl md:text-2xl font-bold font-heading text-white">
                Seasons & Episodes
              </h2>
              <div className="relative">
                <select
                  value={selectedSeason}
                  onChange={(e) => setSelectedSeason(Number(e.target.value))}
                  className="appearance-none px-4 py-2 pr-8 bg-black border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-white/30 cursor-pointer"
                >
                  {seasons.map((s) => (
                    <option key={s.season_number} value={s.season_number}>
                      Season {s.season_number}
                    </option>
                  ))}
                </select>
                <IoChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" size={14} />
              </div>
            </div>

            {/* Season Overview Card */}
            {seasonData && !seasonLoading && (
              <div className="mb-6 flex gap-4 items-start">
                {seasonData.poster_path && (
                  <LazyImage
                    src={getPosterUrl(seasonData.poster_path, 'w185')}
                    alt={seasonData.name}
                    className="w-24 aspect-[2/3] rounded-lg ring-1 ring-white/10 hidden sm:block flex-shrink-0"
                  />
                )}
                <div>
                  <h3 className="text-lg font-semibold text-white">{seasonData.name}</h3>
                  <p className="text-sm text-white/40 mt-1">
                    {seasonData.episodes?.length || 0} Episodes
                    {seasonData.air_date && ` · ${formatDate(seasonData.air_date)}`}
                  </p>
                  {seasonData.overview && (
                    <p className="text-sm text-white/50 mt-2 max-w-2xl line-clamp-3">{seasonData.overview}</p>
                  )}
                </div>
              </div>
            )}

            {/* Episodes List */}
            {seasonLoading ? (
              <div className="space-y-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="h-24 skeleton rounded-lg" />
                ))}
              </div>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedSeason}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-2"
                >
                  {seasonData?.episodes?.map((ep, index) => (
                    <motion.div
                      key={ep.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.03 }}
                      className="group flex gap-4 p-3 rounded-lg border border-white/[0.04] hover:border-white/10 hover:bg-white/[0.02] transition-all"
                    >
                      {/* Episode Still */}
                      <div className="flex-shrink-0 w-36 md:w-44 aspect-video rounded-md overflow-hidden bg-black">
                        {ep.still_path ? (
                          <LazyImage
                            src={getPosterUrl(ep.still_path, 'w300')}
                            alt={ep.name}
                            className="w-full h-full group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-white/[0.02]">
                            <IoTv className="text-white/10" size={24} />
                          </div>
                        )}
                      </div>

                      {/* Episode Info */}
                      <div className="flex-1 min-w-0 py-0.5">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs text-white/30 font-mono">
                            E{String(ep.episode_number).padStart(2, '0')}
                          </span>
                          {ep.vote_average > 0 && (
                            <span className="text-xs text-white/30">
                              {ep.vote_average.toFixed(1)}
                            </span>
                          )}
                        </div>
                        <h4 className="text-sm font-medium text-white/90 group-hover:text-white transition-colors line-clamp-1">
                          {ep.name}
                        </h4>
                        {ep.overview && (
                          <p className="text-xs text-white/30 mt-1 line-clamp-2 leading-relaxed">
                            {ep.overview}
                          </p>
                        )}
                        <div className="flex items-center gap-3 mt-2">
                          {ep.air_date && (
                            <span className="text-xs text-white/20">{formatDate(ep.air_date)}</span>
                          )}
                          {ep.runtime && (
                            <span className="text-xs text-white/20">{ep.runtime}m</span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            )}
          </motion.div>
        )}

        {/* Cast */}
        <div className="mt-12">
          <CastCarousel cast={credits?.cast} />
        </div>

        {/* Reviews */}
        <ReviewSection reviews={reviews} tmdbId={Number(id)} mediaType="tv" />

        {/* Where to Watch */}
        <WatchProviders watchProviders={watchProviders} />

        {/* Similar Shows */}
        {similar?.results?.length > 0 && (
          <div className="mt-12">
            <ContentRow title="Similar Shows" items={similar.results} mediaType="tv" />
          </div>
        )}
      </div>

      {trailer && (
        <Modal isOpen={showTrailer} onClose={() => setShowTrailer(false)} title="Watch Trailer">
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
