'use client';

import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { KioskState, TouchInteraction, JordanProduct } from '../types';
import { carouselSlides } from '../data/carouselContent';
import { getNewArrivals } from '../data/jordanProducts';
import { useIdleTimer } from '../hooks/useIdleTimer';

import KioskCarousel from '../components/KioskCarousel';
import Shoe360Viewer from '../components/Shoe360Viewer';
import NewArrivals from '../components/NewArrivals';
import FootlockerSpinViewer from '../components/FootlockerSpinViewer';
import InteractionDetector from '../components/InteractionDetector';

export default function KioskApp() {
  const [kioskState, setKioskState] = useState<KioskState>({
    currentView: 'carousel',
    currentSlide: 0,
    isUserInteracting: false,
    lastInteractionTime: Date.now(),
  });

  const [selectedProduct, setSelectedProduct] = useState<JordanProduct | null>(null);
  const [newArrivals] = useState(() => getNewArrivals());

  // Use idle timer to return to carousel after inactivity
  const { isIdle, resetTimer } = useIdleTimer(15000); // 15 seconds

  // Return to carousel when idle
  useEffect(() => {
    if (isIdle && kioskState.currentView !== 'carousel') {
      setKioskState(prev => ({
        ...prev,
        currentView: 'carousel',
        isUserInteracting: false,
      }));
      setSelectedProduct(null);
    }
  }, [isIdle, kioskState.currentView]);

  // Handle touch interactions
  const handleInteraction = useCallback((interaction: TouchInteraction) => {
    resetTimer();

    setKioskState(prev => ({
      ...prev,
      isUserInteracting: true,
      lastInteractionTime: Date.now(),
    }));

    // Handle different interaction types
    switch (interaction.type) {
      case 'tap':
        if (kioskState.currentView === 'carousel') {
          // Transition from carousel to spin viewer
          setKioskState(prev => ({
            ...prev,
            currentView: 'spinViewer',
          }));
        }
        break;

      case 'swipe':
        // Handle swipe gestures if needed
        break;
    }
  }, [kioskState.currentView, resetTimer]);

  // Handle carousel touch start
  const handleCarouselTouch = useCallback(() => {
    resetTimer();
    setKioskState(prev => ({
      ...prev,
      currentView: 'spinViewer',
      isUserInteracting: true,
      lastInteractionTime: Date.now(),
    }));
  }, [resetTimer]);

  // Handle product selection for 360 view
  const handleProductSelect = useCallback((product: JordanProduct) => {
    resetTimer();
    setSelectedProduct(product);
    setKioskState(prev => ({
      ...prev,
      currentView: 'shoe360',
      selectedProduct: product,
      isUserInteracting: true,
      lastInteractionTime: Date.now(),
    }));
  }, [resetTimer]);

  // Handle going back from new arrivals to carousel
  const handleBackToCarousel = useCallback(() => {
    resetTimer();
    setKioskState(prev => ({
      ...prev,
      currentView: 'carousel',
      isUserInteracting: false,
    }));
    setSelectedProduct(null);
  }, [resetTimer]);

  // Handle going back from spin viewer to carousel
  const handleBackFromSpinViewer = useCallback(() => {
    resetTimer();
    setKioskState(prev => ({
      ...prev,
      currentView: 'carousel',
      isUserInteracting: false,
    }));
  }, [resetTimer]);

  // Handle closing 360 viewer
  const handleClose360Viewer = useCallback(() => {
    resetTimer();
    setSelectedProduct(null);
    setKioskState(prev => ({
      ...prev,
      currentView: 'newArrivals',
      selectedProduct: undefined,
      isUserInteracting: true,
    }));
  }, [resetTimer]);

  // Preload assets on component mount
  useEffect(() => {
    const preloadAssets = async () => {
      try {
        // Preload carousel images and videos
        const carouselPromises = carouselSlides.map(slide => {
          if (slide.backgroundVideo) {
            // Preload video
            return new Promise((resolve, reject) => {
              const video = document.createElement('video');
              video.onloadeddata = resolve;
              video.onerror = reject;
              video.src = slide.backgroundVideo!;
              video.load();
            });
          } else if (slide.backgroundImage) {
            // Preload image
            return new Promise((resolve, reject) => {
              const img = new Image();
              img.onload = resolve;
              img.onerror = reject;
              img.src = slide.backgroundImage!;
            });
          }
          return Promise.resolve();
        });

        // Preload product images
        const productPromises = newArrivals.flatMap(product =>
          product.images.map(src => {
            return new Promise((resolve, reject) => {
              const img = new Image();
              img.onload = resolve;
              img.onerror = reject;
              img.src = src;
            });
          })
        );

        await Promise.allSettled([...carouselPromises, ...productPromises]);
      } catch (error) {
        console.error('Error preloading assets:', error);
      }
    };

    preloadAssets();
  }, [newArrivals]);

  return (
    <div className="w-full h-screen overflow-hidden bg-white">
      <InteractionDetector onInteraction={handleInteraction}>
        <AnimatePresence mode="wait">
          {kioskState.currentView === 'carousel' && (
            <KioskCarousel
              key="carousel"
              slides={carouselSlides}
              onTouchStart={handleCarouselTouch}
              autoAdvance={!kioskState.isUserInteracting}
            />
          )}

          {kioskState.currentView === 'spinViewer' && (
            <FootlockerSpinViewer
              key="spinViewer"
              productId="314217794404_02"
              onClose={handleBackFromSpinViewer}
              title="Interactive Jordan Experience"
              description="Drag to spin • Zoom to explore • Experience every detail"
            />
          )}

          {kioskState.currentView === 'newArrivals' && (
            <NewArrivals
              key="newArrivals"
              products={newArrivals}
              onProductSelect={handleProductSelect}
              onBack={handleBackToCarousel}
            />
          )}

          {kioskState.currentView === 'shoe360' && selectedProduct && (
            <Shoe360Viewer
              key="shoe360"
              product={selectedProduct}
              onClose={handleClose360Viewer}
              images={selectedProduct.shoe360Images || selectedProduct.images}
            />
          )}
        </AnimatePresence>
      </InteractionDetector>
    </div>
  );
}
