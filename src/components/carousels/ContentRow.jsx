import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { fadeInUp } from '@/utils/animations';
import MovieCard from '../cards/MovieCard';
import MovieCardSkeleton from '../cards/MovieCardSkeleton';

import 'swiper/css';
import 'swiper/css/free-mode';

export default function ContentRow({ title, items, loading, mediaType, link }) {
  const { ref, isVisible } = useIntersectionObserver();
  const swiperRef = useRef(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  return (
    <motion.section
      ref={ref}
      variants={fadeInUp}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      className="px-4 md:px-10 max-w-[1400px] mx-auto w-full"
    >
      {/* Title Bar */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base md:text-lg font-semibold font-heading text-white/90">{title}</h2>
        {link && (
          <Link
            to={link}
            className="flex items-center gap-1 text-xs text-white/30 hover:text-white/60 transition-colors font-medium"
          >
            Explore All <IoChevronForward size={14} />
          </Link>
        )}
      </div>

      {/* Carousel */}
      <div className="relative group/nav">
        <Swiper
          modules={[FreeMode]}
          spaceBetween={8}
          slidesPerView={2.3}
          freeMode={{ enabled: true, momentumRatio: 0.5 }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={(swiper) => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
          onReachBeginning={() => setIsBeginning(true)}
          onReachEnd={() => setIsEnd(true)}
          breakpoints={{
            480: { slidesPerView: 2.8, spaceBetween: 8 },
            640: { slidesPerView: 3.5, spaceBetween: 10 },
            768: { slidesPerView: 4.5, spaceBetween: 10 },
            1024: { slidesPerView: 5.5, spaceBetween: 10 },
            1280: { slidesPerView: 6.5, spaceBetween: 10 },
          }}
          className="swiper-no-scrollbar"
        >
          {loading
            ? Array.from({ length: 7 }).map((_, i) => (
                <SwiperSlide key={i}>
                  <MovieCardSkeleton />
                </SwiperSlide>
              ))
            : items?.map((item) => (
                <SwiperSlide key={item.id}>
                  <MovieCard item={item} mediaType={mediaType} />
                </SwiperSlide>
              ))}
        </Swiper>

        {/* Netflix-style Nav Arrows */}
        {!isBeginning && (
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="absolute left-0 top-0 bottom-0 z-10 w-12 flex items-center justify-center bg-black/40 backdrop-blur-md hover:bg-black/70 opacity-0 group-hover/nav:opacity-100 transition-all duration-300 cursor-pointer"
          >
            <IoChevronBack size={28} className="text-white" />
          </button>
        )}
        {!isEnd && (
          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="absolute right-0 top-0 bottom-0 z-10 w-12 flex items-center justify-center bg-black/40 backdrop-blur-md hover:bg-black/70 opacity-0 group-hover/nav:opacity-100 transition-all duration-300 cursor-pointer"
          >
            <IoChevronForward size={28} className="text-white" />
          </button>
        )}
      </div>
    </motion.section>
  );
}
