import { NavLink, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { IoClose } from 'react-icons/io5';
import { mobileMenuVariants, overlayVariants } from '@/utils/animations';

export default function MobileMenu({ isOpen, onClose, links, user }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-50 bg-black/60"
            onClick={onClose}
          />
          <motion.div
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-black p-6 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-10">
              <span className="text-xl font-extrabold font-heading text-white uppercase tracking-[0.15em]">FLIMQ</span>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-1 text-white/40 hover:text-white"
              >
                <IoClose size={24} />
              </motion.button>
            </div>
            <nav className="flex flex-col gap-4">
              {links.map((link, index) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                >
                  <NavLink
                    to={link.to}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `block text-lg font-medium py-2 px-3 rounded-lg transition-colors ${
                        isActive
                          ? 'text-white bg-white/5'
                          : 'text-white/40 hover:text-white hover:bg-white/5'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </motion.div>
              ))}
            </nav>
            {user && (
              <div className="mt-8 pt-4 border-t border-white/[0.06]">
                <Link
                  to="/profile"
                  onClick={onClose}
                  className="block text-lg font-medium py-2 px-3 rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition-colors"
                >
                  Profile
                </Link>
              </div>
            )}
            {!user && (
              <div className="mt-8 pt-4 border-t border-white/[0.06] flex flex-col gap-2">
                <Link
                  to="/login"
                  onClick={onClose}
                  className="block text-lg font-medium py-2 px-3 rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  onClick={onClose}
                  className="block text-lg font-medium py-2 px-3 rounded-lg text-white bg-white/[0.08] hover:bg-white/[0.12] transition-colors text-center"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
