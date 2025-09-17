# Footlocker Interactive Kiosk Implementation Plan

## Project Overview

Build a simple interactive portrait video kiosk for a Footlocker event in the Netherlands. The kiosk displays looping Footlocker content and transitions to an interactive 360 degree shoe viewer when touched.

### Core Requirements
- Simple Portrait video that loops Footlocker promos/content when idle
- Touch interaction transitions to interactive shoe viewer
- 360 degree shoe rendering with "Spin. Zoom. Explore." messaging
- New Arrivals section for Jordan sneakers
- Footlocker + OptiSigns branding throughout
- Optimized for portrait kiosk displays (1080x1920)

## Implementation Approach

Focus on immediate functionality needed for the Netherlands event:
- Use Next.js (already initialized) with TypeScript
- Implement core carousel, 360 degree viewer, New Arrivals flow
- Use mock data for products and content initially
- Prioritize touch interactions and smooth transitions
- No backend required - purely frontend application
- Make it simple

## Files to Create/Modify

### Core App Structure
- `app/page.tsx` - Main kiosk page component (modify existing)
- `app/layout.tsx` - Root layout with kiosk styling (modify existing)
- `app/globals.css` - Global kiosk styles (modify existing)

### Components
- `components/KioskCarousel.tsx` - Main looping content carousel
- `components/Shoe360Viewer.tsx` - Interactive 360 degree shoe viewer
- `components/NewArrivals.tsx` - Jordan sneakers grid display
- `components/InteractionDetector.tsx` - Touch interaction management
- `components/FootlockerLogo.tsx` - Footlocker branding component
- `components/OptiSignsLogo.tsx` - OptiSigns branding component

### Utilities & Hooks
- `hooks/useIdleTimer.tsx` - Detect user inactivity to return to loop
- `utils/touchHandler.ts` - Touch interaction utilities
- `types/index.ts` - TypeScript type definitions

### Data & Assets
- `data/carouselContent.ts` - Carousel slides content
- `data/jordanProducts.ts` - Mock Jordan sneaker data
- `public/assets/logos/` - Footlocker and OptiSigns logos
- `public/assets/images/` - Shoe images and content imagery

### Configuration
- `tailwind.config.js` - Tailwind config for kiosk styling (modify existing)
- `next.config.js` - Next.js optimization config
- `package.json` - Add required dependencies (modify existing)

## Key Functions

### KioskCarousel Component
- `startAutoCarousel()` - Begins automatic content looping when idle
- `handleTouchInteraction()` - Detects touch and transitions to interactive mode
- `renderCarouselSlide()` - Renders individual slides with Footlocker content

### Shoe360Viewer Component
- `initShoe360()` - Initializes 360 degree shoe viewer with touch controls
- `handleShoeRotation()` - Processes touch gestures to rotate shoe
- `loadShoeImages()` - Preloads all 360 degree shoe angles for smooth rotation

### NewArrivals Component
- `fetchJordanProducts()` - Loads Jordan sneaker data (mock initially)
- `renderProductGrid()` - Displays sneakers in responsive grid
- `handleProductTap()` - Shows expanded product details on tap

### InteractionDetector
- `startIdleTimer()` - Monitors activity, returns to loop when idle (30s)
- `resetIdleTimer()` - Resets timer on any user interaction
- `detectTouchEvents()` - Captures touch interactions across components

### Utility Functions
- `preloadAssets()` - Preloads images/videos for smooth playback
- `formatProductData()` - Transforms product data for display
- `handleFullscreenMode()` - Manages kiosk fullscreen display

## Test Coverage

### KioskCarousel Tests
- `should start auto carousel on component mount`
- `should pause carousel and show interaction on touch`
- `should display Footlocker branding elements correctly`
- `should transition between content slides smoothly`

### Shoe360Viewer Tests
- `should load all shoe angles before showing viewer`
- `should rotate shoe smoothly on swipe gestures`
- `should display "Spin. Zoom. Explore." text prominently`
- `should zoom shoe on pinch gestures`

### NewArrivals Tests
- `should display Jordan sneakers in grid format`
- `should show product details on sneaker tap`
- `should handle empty product data gracefully`
- `should match Footlocker website styling patterns`

### InteractionDetector Tests
- `should return to carousel after 30 seconds idle`
- `should reset idle timer on any touch interaction`
- `should detect touch events across all components`

### Integration Tests
- `should transition from carousel to shoe viewer smoothly`
- `should maintain branding consistency across all screens`
- `should work properly in portrait kiosk orientation`

## Content & Branding

### Copy to Include
- "Step Into the Culture" - Foot Locker brings you the hottest drops
- "Own Your Style" - From courtside classics to street-ready heat
- "Don't Miss the Drop" - Jordan. Nike. adidas. New heat lands daily
- "Fresh Jordan Arrivals" - Straight from the Jumpman legacy
- "Spin. Zoom. Explore." & "Tap to take control. Interact with the latest sneaker in full 360 degree"

### Visual Elements
- Footlocker logo prominently displayed
- "Powered by OptiSigns" logo
- Fonts: Montserrat Extra Bold/Black, Gotham Bold, or Roboto Black
- Jordan sneaker imagery from Footlocker website
- 360 degree shoe rendering (screenrecorded or image sequence)

## Dependencies to Add
```json
{
  "framer-motion": "^10.0.0",
  "react-spring": "^9.7.0",
  "react-use-gesture": "^9.1.3",
  "react-intersection-observer": "^9.5.0"
}
```

## Implementation Priority
1. **Phase 1**: Basic carousel with Footlocker content and touch detection
2. **Phase 2**: 360 degree shoe viewer with rotation controls
3. **Phase 3**: New Arrivals grid with Jordan products
4. **Phase 4**: Branding, polish, and kiosk optimizations

Focus on core functionality first - the event is high priority and needs working prototype ASAP.