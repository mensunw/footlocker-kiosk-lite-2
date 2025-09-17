export interface CarouselSlide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  backgroundImage: string;
  logoUrl?: string;
  duration: number; // in seconds
}

export interface JordanProduct {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  images: string[];
  shoe360Images?: string[];
  colorway: string;
  sizes: string[];
  isNewArrival: boolean;
  category: 'men' | 'women' | 'kids';
}

export interface TouchInteraction {
  type: 'tap' | 'swipe' | 'pinch' | 'drag';
  startPosition: { x: number; y: number };
  endPosition?: { x: number; y: number };
  timestamp: number;
  element?: string;
}

export interface KioskState {
  currentView: 'carousel' | 'shoe360' | 'newArrivals';
  currentSlide: number;
  selectedProduct?: JordanProduct;
  isUserInteracting: boolean;
  lastInteractionTime: number;
}

export interface Shoe360ViewerProps {
  product: JordanProduct;
  onClose: () => void;
  images: string[];
}

export interface CarouselProps {
  slides: CarouselSlide[];
  onTouchStart: () => void;
  autoAdvance: boolean;
}

export interface NewArrivalsProps {
  products: JordanProduct[];
  onProductSelect: (product: JordanProduct) => void;
  onBack: () => void;
}

export interface IdleTimerHook {
  isIdle: boolean;
  resetTimer: () => void;
  lastActiveTime: number;
}

export interface BrandingProps {
  size?: 'small' | 'medium' | 'large';
  variant?: 'light' | 'dark';
  className?: string;
}