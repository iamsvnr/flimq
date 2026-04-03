import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useFetch } from '@/hooks/useFetch';
import { ENDPOINTS } from '@/api/endpoints';
import HeroSlide from './HeroSlide';
import HeroControls from './HeroControls';
import Loader from '../ui/Loader';

export default function HeroSection() {
  const { data, loading } = useFetch(ENDPOINTS.TRENDING_ALL);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  const slides = data?.results?.filter((item) => item.backdrop_path).slice(0, 6) || [];

  const goToSlide = useCallback((index) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  }, [currentIndex]);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    if (isPaused || slides.length === 0) return;
    const interval = setInterval(nextSlide, 7000);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide, slides.length]);

  if (loading) return <div className="hero-section h-[65vh] md:h-[90vh]"><Loader /></div>;
  if (slides.length === 0) return null;

  return (
    <div
      className="hero-section relative h-[65vh] md:h-[90vh] w-full overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <AnimatePresence mode="wait" custom={direction}>
        <HeroSlide
          key={slides[currentIndex].id}
          item={slides[currentIndex]}
          direction={direction}
        />
      </AnimatePresence>

      <HeroControls
        total={slides.length}
        current={currentIndex}
        onPrev={prevSlide}
        onNext={nextSlide}
        onDotClick={goToSlide}
      />
    </div>
  );
}
