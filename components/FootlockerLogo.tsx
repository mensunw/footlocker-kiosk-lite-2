'use client';

import { BrandingProps } from '../types';

const FootlockerLogo: React.FC<BrandingProps> = ({
  size = 'medium',
  variant = 'light',
  className = ''
}) => {
  const sizeClasses = {
    small: 'w-32 h-8',
    medium: 'w-48 h-12',
    large: 'w-64 h-16'
  };

  return (
    <div className={`flex items-center ${sizeClasses[size]} ${className}`}>
      <img
        src="/Footlocker logo.svg"
        alt="Foot Locker"
        className="w-full h-full object-contain"
        style={{
          filter: 'brightness(0) saturate(100%)'
        }}
      />
    </div>
  );
};

export default FootlockerLogo;