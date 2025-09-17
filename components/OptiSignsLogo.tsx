'use client';

import { BrandingProps } from '../types';

const OptiSignsLogo: React.FC<BrandingProps> = ({
  size = 'small',
  variant = 'light',
  className = ''
}) => {
  const sizeClasses = {
    small: 'h-6',
    medium: 'h-12',
    large: 'h-16'
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className={`text-xs text-black/70 font-medium`}>
        Powered by
      </div>
      <img
        src="/optisigns-logo.svg"
        alt="OptiSigns"
        className={`${sizeClasses[size]} object-contain`}
        style={{
          filter: 'brightness(0) saturate(100%)'
        }}
      />
    </div>
  );
};

export default OptiSignsLogo;