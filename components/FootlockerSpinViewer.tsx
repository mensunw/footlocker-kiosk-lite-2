'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FootlockerSpinViewerProps } from '../types';
import { X } from 'lucide-react';

const FootlockerSpinViewer: React.FC<FootlockerSpinViewerProps> = ({
  productId = '314217794404_02', // Default to Air Jordan example
  onClose,
  title = 'Interactive 360° View',
  description = 'Drag to spin • Zoom to explore • Experience every detail'
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Construct the Footlocker SpinViewer URL
  const spinViewerUrl = `https://assets.footlocker.com/s7viewers/html5/SpinViewer.html?asset=FLDM/${productId}&config=FLDM/SpinSet_light&serverUrl=https://assets.footlocker.com/is/image/&contenturl=https://assets.footlocker.com/is/content/`;

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isLoaded) {
        setHasError(true);
      }
    }, 10000); // 10 second timeout

    return () => clearTimeout(timer);
  }, [isLoaded]);

  const handleIframeLoad = () => {
    setIsLoaded(true);
    setHasError(false);
  };

  const handleIframeError = () => {
    setHasError(true);
    setIsLoaded(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="absolute inset-0 bg-white z-50 flex flex-col"
    >
      {/* Header */}
      <div className="flex justify-between items-center p-6 border-b border-gray-200">
        <div className="flex-1 text-center">
          <h2 className="text-2xl font-bold text-black">{title}</h2>
          <p className="text-gray-600 mt-1">{description}</p>
        </div>

        <button
          onClick={onClose}
          className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors ml-6"
          aria-label="Close 360° viewer"
        >
          <X className="w-6 h-6 text-gray-600" />
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 relative overflow-hidden">
        {/* Loading State */}
        {!isLoaded && !hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mb-4"></div>
              <p className="text-gray-600 text-lg">Loading 360° experience...</p>
              <p className="text-gray-500 text-sm mt-2">This may take a few moments</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
            <div className="text-center max-w-md mx-auto p-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <X className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Unable to load 360° view</h3>
              <p className="text-gray-600 mb-6">
                The interactive viewer couldn&apos;t be loaded. This might be due to network issues or the product not being available.
              </p>
              <button
                onClick={onClose}
                className="bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
              >
                Go Back
              </button>
            </div>
          </div>
        )}

        {/* SpinViewer iframe */}
        <iframe
          src={spinViewerUrl}
          className={`w-full h-full border-none ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          title="360° Product Viewer"
          allow="autoplay; fullscreen"
          onLoad={handleIframeLoad}
          onError={handleIframeError}
          style={{
            minHeight: '600px',
            backgroundColor: '#ffffff'
          }}
        />
      </div>

      {/* Footer Instructions */}
      <div className="p-4 bg-gray-50 border-t border-gray-200">
        <div className="flex justify-center space-x-8 text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-orange-600">↻</span>
            </div>
            <span>Drag to rotate</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-orange-600">+</span>
            </div>
            <span>Pinch to zoom</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-orange-600">✋</span>
            </div>
            <span>Touch to explore</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FootlockerSpinViewer;