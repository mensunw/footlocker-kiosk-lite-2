'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { NewArrivalsProps } from '../types';
import FootlockerLogo from './FootlockerLogo';
import OptiSignsLogo from './OptiSignsLogo';

const NewArrivals: React.FC<NewArrivalsProps> = ({
  products,
  onProductSelect,
  onBack
}) => {
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  const handleProductTap = (productId: string) => {
    setSelectedProductId(productId);
    const product = products.find(p => p.id === productId);
    if (product) {
      onProductSelect(product);
    }
  };

  const formatPrice = (price: number, originalPrice?: number) => {
    if (originalPrice && originalPrice > price) {
      return (
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-orange-400">
            ${price}
          </span>
          <span className="text-lg text-white/50 line-through">
            ${originalPrice}
          </span>
        </div>
      );
    }
    return (
      <span className="text-2xl font-bold text-orange-400">
        ${price}
      </span>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className="w-full h-screen bg-gradient-to-b from-gray-900 to-black overflow-hidden"
    >
      {/* Header */}
      <div className="flex justify-between items-center p-8 border-b border-white/10">
        <button
          onClick={onBack}
          className="text-white text-2xl hover:text-orange-400 transition-colors flex items-center"
        >
          ← Back
        </button>
        <FootlockerLogo size="medium" variant="light" />
        <div className="w-20" /> {/* Spacer */}
      </div>

      {/* Title */}
      <div className="text-center py-8">
        <h1 className="text-5xl font-black text-white mb-4">
          Fresh Jordan Arrivals
        </h1>
        <p className="text-xl text-white/70">
          Straight from the Jumpman legacy
        </p>
      </div>

      {/* Products Grid */}
      <div className="px-8 pb-20 overflow-y-auto">
        {products.length === 0 ? (
          <div className="text-center text-white/60 text-xl mt-20">
            No new arrivals available
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-6 max-w-6xl mx-auto">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`
                  bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10
                  cursor-pointer transition-all duration-300 hover:bg-white/10
                  hover:border-orange-400/50 relative overflow-hidden
                  ${selectedProductId === product.id ? 'ring-2 ring-orange-400' : ''}
                `}
                onClick={() => handleProductTap(product.id)}
              >
                {/* New Arrival Badge */}
                {product.isNewArrival && (
                  <div className="absolute top-4 right-4 bg-orange-400 text-black text-xs font-bold px-2 py-1 rounded-full">
                    NEW
                  </div>
                )}

                {/* Product Image */}
                <div className="aspect-square mb-6 bg-white/5 rounded-xl overflow-hidden">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Product Info */}
                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-white leading-tight">
                    {product.name}
                  </h3>

                  <p className="text-sm text-white/60">
                    {product.colorway}
                  </p>

                  <div className="flex items-center justify-between">
                    {formatPrice(product.price, product.originalPrice)}
                    <div className="text-sm text-white/40">
                      {product.sizes.length} sizes
                    </div>
                  </div>

                  {/* Category Badge */}
                  <div className="text-xs text-orange-400 font-semibold uppercase tracking-wide">
                    {product.category}
                  </div>
                </div>

                {/* Touch hint */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-xs text-white/40">
                  Tap for 360° view
                </div>

                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-orange-400/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent">
        <div className="flex justify-center">
          <OptiSignsLogo size="small" variant="light" />
        </div>
      </div>

      {/* Navigation hint */}
      <div className="absolute bottom-20 right-8 text-white/40 text-sm">
        Swipe to browse • Tap to explore
      </div>
    </motion.div>
  );
};

export default NewArrivals;