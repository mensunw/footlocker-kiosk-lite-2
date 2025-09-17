'use client';

import Image from 'next/image';
import { BrandingProps } from '../types';

const OptiSignsLogo: React.FC<BrandingProps> = ({
  size = 'small',
  variant = 'dark',
  className = ''
}) => {
  const sizeClasses = {
    small: { width: 80, height: 24 },
    medium: { width: 160, height: 48 },
    large: { width: 200, height: 64 }
  };

  const dimensions = sizeClasses[size];

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className={`text-xs text-black/70 font-medium`}>
        Powered by
      </div>
      <Image
        src="/optisigns-logo.svg"
        alt="OptiSigns"
        width={dimensions.width}
        height={dimensions.height}
        className="object-contain"
        style={{
          filter: variant === 'dark' ? 'brightness(0) saturate(100%)' : 'none'
        }}
        priority
      />
    </div>
  );
};

export default OptiSignsLogo;