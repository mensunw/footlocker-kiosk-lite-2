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

  const textColor = variant === 'light' ? 'text-white' : 'text-black';

  return (
    <div className={`flex items-center ${sizeClasses[size]} ${className}`}>
      <div className={`font-black text-xl ${textColor} tracking-wider`}>
        FOOT LOCKER
      </div>
    </div>
  );
};

export default FootlockerLogo;