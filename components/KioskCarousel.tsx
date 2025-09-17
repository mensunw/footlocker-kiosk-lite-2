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
      className="relative w-full h-screen overflow-hidden bg-white"
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
            <div className="absolute inset-0 w-full h-full bg-white" />
          ) : slide.backgroundImage ? (
            <div
              className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${slide.backgroundImage})`,
              }}
            />
          ) : (
            <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-gray-100 to-white" />
          )}

          {/* Conditional gradient overlay - only for image slides */}
          {!slide.backgroundVideo && (
            <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-white/20 to-transparent" />
          )}

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-between p-12">
            {/* Top Branding */}
            <div className="flex justify-between items-center">
              <FootlockerLogo size="medium" variant="dark" />
              <OptiSignsLogo size="medium" variant="dark" />
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col justify-center items-center text-center max-w-4xl mx-auto">
              <motion.h1
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className={`text-6xl md:text-8xl font-black mb-6 tracking-tight leading-tight ${
                  slide.backgroundVideo
                    ? 'text-black drop-shadow-xl'
                    : 'text-black text-shadow'
                }`}
                style={slide.backgroundVideo ? {
                  textShadow: '2px 2px 0px rgba(255,255,255,0.8), -2px -2px 0px rgba(255,255,255,0.8), 2px -2px 0px rgba(255,255,255,0.8), -2px 2px 0px rgba(255,255,255,0.8)'
                } : {}}
              >
                {slide.title}
              </motion.h1>

              <motion.h2
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className={`text-2xl md:text-4xl font-bold mb-8 tracking-wide ${
                  slide.backgroundVideo
                    ? 'text-orange-700 drop-shadow-lg'
                    : 'text-orange-600 text-shadow'
                }`}
                style={slide.backgroundVideo ? {
                  textShadow: '1px 1px 0px rgba(255,255,255,0.9), -1px -1px 0px rgba(255,255,255,0.9), 1px -1px 0px rgba(255,255,255,0.9), -1px 1px 0px rgba(255,255,255,0.9)'
                } : {}}
              >
                {slide.subtitle}
              </motion.h2>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className={`text-xl md:text-2xl max-w-2xl leading-relaxed ${
                  slide.backgroundVideo
                    ? 'text-gray-900 drop-shadow-md'
                    : 'text-gray-800 text-shadow'
                }`}
                style={slide.backgroundVideo ? {
                  textShadow: '1px 1px 0px rgba(255,255,255,0.8), -1px -1px 0px rgba(255,255,255,0.8)'
                } : {}}
              >
                {slide.description}
              </motion.p>

              {/* Video positioned between description and call-to-action - only for video slides */}
              {slide.backgroundVideo && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.9, duration: 0.6 }}
                  className="flex justify-center mt-8"
                >
                  <video
                    key={`inline-video-${currentSlide}`}
                    className="w-80 h-60 object-contain"
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
                </motion.div>
              )}
            </div>

            {/* Bottom Call to Action */}
            <div className="flex flex-col items-center space-y-6">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="text-center"
              >
                <div className={`text-lg mb-2 ${
                  slide.backgroundVideo
                    ? 'text-gray-800 drop-shadow-md'
                    : 'text-gray-700 text-shadow'
                }`}
                style={slide.backgroundVideo ? {
                  textShadow: '1px 1px 0px rgba(255,255,255,0.8)'
                } : {}}>
                  {interactiveMessages.touch}
                </div>
                <div className={`text-xl font-bold ${
                  slide.backgroundVideo
                    ? 'text-orange-700 drop-shadow-lg'
                    : 'text-orange-600 text-shadow'
                }`}
                style={slide.backgroundVideo ? {
                  textShadow: '1px 1px 0px rgba(255,255,255,0.9), -1px -1px 0px rgba(255,255,255,0.9)'
                } : {}}>
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
                        ? 'bg-orange-600 scale-125'
                        : 'bg-gray-400'
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