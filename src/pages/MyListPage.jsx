import { motion, AnimatePresence } from 'framer-motion';
import { IoBookmark } from 'react-icons/io5';
import { useMyList } from '@/context/MyListContext';
import { useAuth } from '@/context/AuthContext';
import { pageVariants, staggerContainer, fadeInUp } from '@/utils/animations';
import MovieCard from '@/components/cards/MovieCard';
import Button from '@/components/ui/Button';
import { useNavigate, Navigate } from 'react-router-dom';

export default function MyListPage() {
  const { myList } = useMyList();
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) return <Navigate to="/login" replace />;

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="pt-24 pb-16 px-4 md:px-10 max-w-[1400px] mx-auto">
      <h1 className="text-3xl md:text-4xl font-extrabold font-heading text-white mb-6">Watchlist</h1>

      {myList.length > 0 ? (
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
        >
          <AnimatePresence>
            {myList.map((item) => (
              <motion.div
                key={`${item.id}-${item.media_type}`}
                variants={fadeInUp}
                layout
                exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.3 } }}
              >
                <MovieCard item={item} mediaType={item.media_type} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="text-center py-20">
          <IoBookmark className="mx-auto mb-4 text-white/10" size={64} />
          <h3 className="text-xl font-semibold text-white/50 mb-2">Your watchlist is empty</h3>
          <p className="text-white/30 mb-6">Start adding movies and shows to build your watchlist</p>
          <Button variant="primary" size="lg" onClick={() => navigate('/')}>
            Browse Content
          </Button>
        </div>
      )}
    </motion.div>
  );
}
