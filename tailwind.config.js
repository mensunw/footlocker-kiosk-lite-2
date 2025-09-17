/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./hooks/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
    "./utils/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        footlocker: {
          orange: '#FF6900',
          'orange-dark': '#E55A00',
          black: '#000000',
          'gray-dark': '#1A1A1A',
          'gray-medium': '#333333',
        },
      },
      fontFamily: {
        'sans': ['ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif'],
        'black': ['Montserrat', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        'bold': ['Gotham', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'kiosk-xs': ['12px', { lineHeight: '16px' }],
        'kiosk-sm': ['14px', { lineHeight: '20px' }],
        'kiosk-base': ['18px', { lineHeight: '26px' }],
        'kiosk-lg': ['22px', { lineHeight: '30px' }],
        'kiosk-xl': ['28px', { lineHeight: '36px' }],
        'kiosk-2xl': ['36px', { lineHeight: '44px' }],
        'kiosk-3xl': ['48px', { lineHeight: '56px' }],
        'kiosk-4xl': ['64px', { lineHeight: '72px' }],
        'kiosk-5xl': ['80px', { lineHeight: '88px' }],
        'kiosk-6xl': ['96px', { lineHeight: '104px' }],
        'kiosk-7xl': ['128px', { lineHeight: '136px' }],
        'kiosk-8xl': ['160px', { lineHeight: '168px' }],
      },
      spacing: {
        'kiosk-xs': '8px',
        'kiosk-sm': '16px',
        'kiosk-md': '24px',
        'kiosk-lg': '32px',
        'kiosk-xl': '48px',
        'kiosk-2xl': '64px',
        'kiosk-3xl': '80px',
        'kiosk-4xl': '96px',
      },
      aspectRatio: {
        'portrait': '9 / 16',
        'kiosk': '1080 / 1920',
      },
      screens: {
        'kiosk': '1080px',
        'portrait': { 'raw': '(orientation: portrait)' },
      },
      animation: {
        'carousel-slide': 'slideIn 0.8s ease-in-out',
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'scale-in': 'scaleIn 0.4s ease-out',
        'bounce-gentle': 'bounceGentle 2s infinite',
      },
      keyframes: {
        slideIn: {
          '0%': { opacity: '0', transform: 'scale(1.1)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backdropBlur: {
        'xs': '2px',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
        '1200': '1200ms',
      },
      cursor: {
        'touch': 'pointer',
      },
    },
  },
  plugins: [],
};