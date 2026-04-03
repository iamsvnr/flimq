import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import { motion } from 'framer-motion';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { fadeInUp } from '@/utils/animations';
import CastCard from '../cards/CastCard';

import 'swiper/css';
import 'swiper/css/free-mode';

export default function CastCarousel({ cast, title = 'Cast' }) {
  const { ref, isVisible } = useIntersectionObserver();
  const swiperRef = useRef(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  if (!cast || cast.length === 0) return null;

  return (
    <motion.section
      ref={ref}
      variants={fadeInUp}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
    >
      <h2 className="text-xl md:text-2xl font-bold font-heading text-white mb-4">{title}</h2>
      <div className="relative group/nav">
        <Swiper
          modules={[FreeMode]}
          spaceBetween={16}
          slidesPerView={3.5}
          freeMode={{ enabled: true }}
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
            480: { slidesPerView: 4.5 },
            640: { slidesPerView: 5.5 },
            768: { slidesPerView: 6.5 },
            1024: { slidesPerView: 8.5 },
          }}
          className="swiper-no-scrollbar"
        >
          {cast.slice(0, 20).map((person) => (
            <SwiperSlide key={person.id}>
              <CastCard person={person} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Netflix-style Nav Arrows */}
        {!isBeginning && (
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="absolute left-0 top-0 bottom-0 z-10 w-10 flex items-center justify-center bg-black/40 backdrop-blur-md hover:bg-black/70 opacity-0 group-hover/nav:opacity-100 transition-all duration-300 cursor-pointer rounded-r"
          >
            <IoChevronBack size={22} className="text-white" />
          </button>
        )}
        {!isEnd && (
          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="absolute right-0 top-0 bottom-0 z-10 w-10 flex items-center justify-center bg-black/40 backdrop-blur-md hover:bg-black/70 opacity-0 group-hover/nav:opacity-100 transition-all duration-300 cursor-pointer rounded-l"
          >
            <IoChevronForward size={22} className="text-white" />
          </button>
        )}
      </div>
    </motion.section>
  );
}
