'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CarouselProps } from '../types';
import FootlockerLogo from './FootlockerLogo';
import OptiSignsLogo from './OptiSignsLogo';
import { interactiveMessages } from '../data/carouselContent';

const KioskCarousel: React.FC<CarouselProps> = ({
  slides,
  onTouchStart,
  autoAdvance
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextSlide = useCallback(() => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setTimeout(() => setIsAnimating(false), 500);
    }
  }, [slides.length, isAnimating]);

  const startAutoCarousel = useCallback(() => {
    if (!autoAdvance) return;

    const currentSlideDuration = slides[currentSlide]?.duration || 8;
    const timer = setTimeout(nextSlide, currentSlideDuration * 1000);
    return timer;
  }, [autoAdvance, currentSlide, slides, nextSlide]);

  useEffect(() => {
    if (!autoAdvance) return;

    const timer = startAutoCarousel();
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [startAutoCarousel, autoAdvance]);

  const handleTouchInteraction = () => {
    onTouchStart();
  };

  if (!slides || slides.length === 0) {
    return <div className="w-full h-screen bg-black" />;
  }

  const slide = slides[currentSlide];

  return (
    <div
      className="relative w-full h-screen overflow-hidden bg-black"
      onClick={handleTouchInteraction}
      onTouchStart={handleTouchInteraction}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="absolute inset-0 w-full h-full"
        >
          {/* Background Media - Image or Video */}
          {slide.backgroundVideo ? (
            <video
              key={`video-${currentSlide}`}
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              onLoadedData={(e) => {
                const video = e.target as HTMLVideoElement;
                video.currentTime = 0;
                video.play().catch(() => {
                  // Silently handle autoplay failures
                });
              }}
            >
              <source src={slide.backgroundVideo} type="video/mp4" />
              <source src={slide.backgroundVideo} type="video/mov" />
            </video>
          ) : slide.backgroundImage ? (
            <div
              className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${slide.backgroundImage})`,
              }}
            />
          ) : (
            <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-gray-900 to-black" />
          )}

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-between p-12">
            {/* Top Branding */}
            <div className="flex justify-between items-start">
              <FootlockerLogo size="large" variant="light" />
              <OptiSignsLogo size="small" variant="light" />
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col justify-center items-center text-center max-w-4xl mx-auto">
              <motion.h1
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tight leading-tight"
              >
                {slide.title}
              </motion.h1>

              <motion.h2
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="text-2xl md:text-4xl font-bold text-orange-400 mb-8 tracking-wide"
              >
                {slide.subtitle}
              </motion.h2>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="text-xl md:text-2xl text-white/90 max-w-2xl leading-relaxed"
              >
                {slide.description}
              </motion.p>
            </div>

            {/* Bottom Call to Action */}
            <div className="flex flex-col items-center space-y-6">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="text-center"
              >
                <div className="text-white/80 text-lg mb-2">
                  {interactiveMessages.touch}
                </div>
                <div className="text-orange-400 text-xl font-bold">
                  {interactiveMessages.interact}
                </div>
              </motion.div>

              {/* Slide Indicators */}
              <div className="flex space-x-2">
                {slides.map((_, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? 'bg-orange-400 scale-125'
                        : 'bg-white/30'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Touch Area Overlay */}
      <div className="absolute inset-0 w-full h-full z-10 cursor-pointer" />
    </div>
  );
};

export default KioskCarousel;