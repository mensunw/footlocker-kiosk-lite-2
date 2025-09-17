'use client';

import Image from 'next/image';
import { BrandingProps } from '../types';

const FootlockerLogo: React.FC<BrandingProps> = ({
  size = 'medium',
  variant = 'dark',
  className = ''
}) => {
  const sizeClasses = {
    small: { width: 128, height: 32 },
    medium: { width: 192, height: 48 },
    large: { width: 256, height: 64 }
  };

  const dimensions = sizeClasses[size];

  return (
    <div className={`flex items-center ${className}`} style={{ width: dimensions.width, height: dimensions.height }}>
      <Image
        src="/Footlocker logo.svg"
        alt="Foot Locker"
        width={dimensions.width}
        height={dimensions.height}
        className="w-full h-full object-contain"
        style={{
          filter: variant === 'dark' ? 'brightness(0) saturate(100%)' : 'none'
        }}
        priority
      />
    </div>
  );
};

export default FootlockerLogo;