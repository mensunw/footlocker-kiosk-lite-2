'use client';

import { BrandingProps } from '../types';

const OptiSignsLogo: React.FC<BrandingProps> = ({
  size = 'small',
  variant = 'light',
  className = ''
}) => {
  const sizeClasses = {
    small: 'text-xs',
    medium: 'text-sm',
    large: 'text-base'
  };

  const textColor = variant === 'light' ? 'text-white/70' : 'text-black/70';

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className={`${sizeClasses[size]} ${textColor} font-medium`}>
        Powered by
      </div>
      <div className={`${sizeClasses[size]} ${textColor} font-bold`}>
        OptiSigns
      </div>
    </div>
  );
};

export default OptiSignsLogo;