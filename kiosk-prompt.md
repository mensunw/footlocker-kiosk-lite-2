# About Us:
This project is about building a Footlocker interactive kiosk video template POC

# Building Footlocker Interactive Kiosk Video - Specification

## 1. Project Overview

### Purpose
Create a SIMPLE eye-catching interactive kiosk video for Footlocker event in Netherlands (Thursday). Portrait orientation video that loops when idle, becomes interactive on touch to showcase 360° shoe exploration.

### Requirements
- Frontend only, no backend
- User can use Claude to prompt edit it later
- Keep codebase simple, easy for Claude to edit later
- NextJS project (already initialized)
- Portrait orientation (1080x1920) optimized for touch screens

## 2. Content Requirements

### Branding & Fonts
- **Primary Logo**: Footlocker logo (public/Footlocker logo.svg)
- **Secondary Logo**: "Powered by OptiSigns" logo (public/optisigns-logo.svg)
- **Fonts**: ITC Bauhaus Heavy, Bauhaus 93, Montserrat Extra Bold/Black, Gotham Bold/Black, Roboto Black, or Futura Extra Bold

### Video Content Structure
1. **Loop Video**: Auto-playing portrait video featuring:
   - Footlocker promotional content, images, videos
   - Smooth transitions between content sections
   - Jordan sneaker showcase from New Arrivals
   - 360° shoe rendering section with text: "Spin. Zoom. Explore." and "Tap to take control. Interact with the latest sneaker in full 360°" (public/360-rendering.mov)

2. **Interactive Mode**: Touch Video at any point to activate 360° shoe exploration interface (https://assets.footlocker.com/s7viewers/html5/SpinViewer.html?asset=FLDM/314217794404_02&config=FLDM/SpinSet_light&serverUrl=https://assets.footlocker.com/is/image/&contenturl=https://assets.footlocker.com/is/content/)

### Copy Content (use as needed):
- "Step Into the Culture" - Foot Locker brings you the hottest drops, exclusive access, and the sneakers you've been waiting for
- "Own Your Style" - From courtside classics to street-ready heat — your look starts here
- "Don't Miss the Drop" - Jordan. Nike. adidas. New heat lands daily — only at Foot Locker
- "Fresh Jordan Arrivals" - Straight from the Jumpman legacy to your rotation
- "The Drop Never Stops" - Your Sneakers. Your Story. Your Foot Locker

### Content Sources
- **Website**: https://www.footlocker.com/
- **YouTube**: https://www.youtube.com/@FootLockerofficial
- **New Arrivals**: https://www.footlocker.com/category/new-arrivals.html
- Use real Footlocker shoe images and promotional content

## 3. Technical Architecture

### Technology Stack
```
Frontend:
- Next.js 14+ with TypeScript
- Tailwind CSS 3 for styling
- Framer Motion for animations and transitions
- React hooks for state management
- Next.js Image component for optimized images

Features:
- Auto-looping video player
- Touch interaction detection
- Smooth transitions between loop and interactive modes 
- Responsive design for portrait kiosks
- 360° product viewer component (https://assets.footlocker.com/s7viewers/html5/SpinViewer.html?asset=FLDM/314217794404_02&config=FLDM/SpinSet_light&serverUrl=https://assets.footlocker.com/is/image/&contenturl=https://assets.footlocker.com/is/content/)
```

### Target Environment
- **Display**: Portrait touch screens (1080x1920)
- **Input**: Touch-only interface
- **Deployment**: Web-based kiosk application
- **Performance**: Smooth 60fps animations and transitions

## 4. Key Features
1. **Auto-Loop Mode**: Continuous branded video content
2. **Interactive Mode**: Touch-activated 360° shoe exploration
3. **Smooth Transitions**: Between all content sections
4. **Brand Integration**: Footlocker and OptiSigns logos throughout
5. **Product Showcase**: Jordan New Arrivals integration
6. **Touch Responsiveness**: Optimized for kiosk interaction
