'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { useGesture } from 'react-use-gesture';
import { Shoe360ViewerProps } from '../types';
import FootlockerLogo from './FootlockerLogo';
import OptiSignsLogo from './OptiSignsLogo';
import { interactiveMessages } from '../data/carouselContent';

const Shoe360Viewer: React.FC<Shoe360ViewerProps> = ({
  product,
  onClose,
  images
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [scale, setScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  // Framer Motion springs for smooth interactions
  const rotation = useSpring(0, { stiffness: 300, damping: 30 });
  const x = useSpring(0, { stiffness: 300, damping: 30 });
  const y = useSpring(0, { stiffness: 300, damping: 30 });
  const transformX = useTransform(x, (value) => `${value}px`);
  const transformY = useTransform(y, (value) => `${value}px`);

  const loadShoeImages = useCallback(async () => {
    if (!images || images.length === 0) {
      setImagesLoaded(true);
      return;
    }

    try {
      const loadPromises = images.map((src) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = resolve;
          img.onerror = reject;
          img.src = src;
        });
      });

      await Promise.all(loadPromises);
      setImagesLoaded(true);
    } catch (error) {
      console.error('Error loading shoe images:', error);
      setImagesLoaded(true); // Still show the component even if some images fail
    }
  }, [images]);

  useEffect(() => {
    loadShoeImages();
  }, [loadShoeImages]);

  const handleShoeRotation = useCallback((deltaX: number) => {
    if (!images || images.length === 0) return;

    const sensitivity = 0.01;
    const rotationDelta = deltaX * sensitivity;
    const newRotation = rotation.get() + rotationDelta;

    rotation.set(newRotation);

    // Map rotation to image index
    const normalizedRotation = ((newRotation % (Math.PI * 2)) + (Math.PI * 2)) % (Math.PI * 2);
    const imageIndex = Math.floor((normalizedRotation / (Math.PI * 2)) * images.length);
    setCurrentImageIndex(imageIndex);
  }, [images, rotation]);

  const handleZoom = useCallback((delta: number) => {
    const newScale = Math.max(1, Math.min(3, scale + delta * 0.01));
    setScale(newScale);
  }, [scale]);

  const bind = useGesture({
    onDrag: ({ movement: [mx, my] }) => {
      if (scale > 1) {
        // Pan when zoomed
        x.set(mx / scale);
        y.set(my / scale);
      } else {
        // Rotate when not zoomed
        handleShoeRotation(mx);
      }
    },
    onPinch: ({ offset: [d] }) => {
      const newScale = Math.max(1, Math.min(3, d / 100 + 1));
      setScale(newScale);
    },
    onWheel: ({ delta: [, dy] }) => {
      handleZoom(-dy);
    },
  });

  const currentImage = images && images.length > 0 ? images[currentImageIndex] : product.images[0];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 w-full h-screen bg-black z-50 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black" />

      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-20 p-8">
        <div className="flex justify-between items-center">
          <FootlockerLogo size="medium" variant="light" />
          <button
            onClick={onClose}
            className="text-white text-4xl font-light hover:text-orange-400 transition-colors"
          >
            ×
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col h-full pt-24 pb-16">
        {/* Title and Instructions */}
        <div className="text-center mb-8 px-8">
          <h1 className="text-4xl font-black text-white mb-4">
            {interactiveMessages.spin}
          </h1>
          <p className="text-lg text-white/80">
            {interactiveMessages.interact}
          </p>
        </div>

        {/* 360 Viewer Container */}
        <div
          ref={containerRef}
          className="flex-1 flex items-center justify-center relative"
          {...bind()}
          style={{ touchAction: 'none' }}
        >
          {!imagesLoaded ? (
            <div className="text-white text-xl">Loading 360° viewer...</div>
          ) : (
            <motion.div
              className="relative select-none"
              style={{
                scale,
                x: transformX,
                y: transformY,
              }}
            >
              <img
                src={currentImage}
                alt={`${product.name} - 360° view`}
                className="w-96 h-96 object-contain pointer-events-none"
                draggable={false}
              />

              {/* Rotation indicator */}
              <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
                <div className="flex items-center space-x-2 text-white/60">
                  <span className="text-sm">360°</span>
                  <div className="w-16 h-1 bg-white/20 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-orange-400 rounded-full transition-all duration-150"
                      style={{
                        width: `${((currentImageIndex / (images?.length || 1)) * 100)}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Touch hints */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="flex space-x-8 text-white/60 text-sm text-center">
              <div>
                <div className="mb-1">↔</div>
                <div>Drag to rotate</div>
              </div>
              <div>
                <div className="mb-1">⤢</div>
                <div>Pinch to zoom</div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-2">
              {product.name}
            </h2>
            <p className="text-lg text-white/70 mb-2">
              {product.colorway}
            </p>
            <p className="text-3xl font-bold text-orange-400">
              ${product.price}
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-8">
        <div className="flex justify-center">
          <OptiSignsLogo size="small" variant="light" />
        </div>
      </div>

      {/* Back to Carousel hint */}
      <div className="absolute top-1/2 right-8 transform -translate-y-1/2 text-white/40 text-sm rotate-90 origin-center">
        Tap outside to return
      </div>
    </motion.div>
  );
};

export default Shoe360Viewer;