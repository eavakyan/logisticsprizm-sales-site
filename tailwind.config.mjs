/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,ts,jsx,tsx,md,mdx}'],
  theme: {
    extend: {
      colors: {
        // Signature Prizm brand
        prizm: {
          50: '#FFF8F0',
          100: '#FFEDD5',
          200: '#FFD9AA',
          300: '#FFB347',
          400: '#FF9E2C',
          500: '#FF8C00',
          600: '#E07800',
          700: '#C26600',
          800: '#9E5400',
          900: '#703C00',
        },
        // Ocean palette from the hero video — used for accent sections
        ocean: {
          deep: '#065A82',
          teal: '#1C7293',
          mint: '#02C39A',
          midnight: '#21295C',
          ice: '#F0F7FA',
        },
        navy: {
          900: '#0F1B2D',
          800: '#162439',
          700: '#1F3048',
        },
        surface: {
          0: '#FFFFFF',
          50: '#FAFAF8',
          100: '#F5F5F0',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Editorial scale
        hero: ['clamp(3rem, 7vw, 6rem)', { lineHeight: '0.98', letterSpacing: '-0.04em' }],
        h1: ['clamp(2.5rem, 5vw, 4rem)', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        h2: ['clamp(2rem, 3.5vw, 3rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
      },
      maxWidth: {
        prose: '65ch',
        reading: '75ch',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out both',
        'fade-in': 'fadeIn 0.8s ease-out both',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
