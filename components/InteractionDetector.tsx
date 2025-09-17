'use client';

import { useEffect, useRef } from 'react';
import { touchHandler } from '../utils/touchHandler';
import { TouchInteraction } from '../types';

interface InteractionDetectorProps {
  onInteraction: (interaction: TouchInteraction) => void;
  children: React.ReactNode;
  className?: string;
}

const InteractionDetector: React.FC<InteractionDetectorProps> = ({
  onInteraction,
  children,
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleTouchStart = (event: TouchEvent | MouseEvent) => {
      const interaction = touchHandler.detectTouch(event, 'kiosk-container');
      if (interaction) {
        onInteraction(interaction);
      }
    };

    const handleTouchEnd = (event: TouchEvent | MouseEvent) => {
      const interaction = touchHandler.detectTouch(event, 'kiosk-container');
      if (interaction) {
        onInteraction(interaction);
      }
    };

    // Touch events
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchend', handleTouchEnd, { passive: true });

    // Mouse events for desktop testing
    container.addEventListener('mousedown', handleTouchStart);
    container.addEventListener('mouseup', handleTouchEnd);

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchend', handleTouchEnd);
      container.removeEventListener('mousedown', handleTouchStart);
      container.removeEventListener('mouseup', handleTouchEnd);
    };
  }, [onInteraction]);

  return (
    <div
      ref={containerRef}
      className={`w-full h-full ${className}`}
    >
      {children}
    </div>
  );
};

export default InteractionDetector;