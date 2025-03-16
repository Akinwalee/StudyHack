/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0A1B2B',
        accent: '#FFFF55C9',
      },
      fontFamily: {
        'space': ['"Space Grotesk"', 'sans-serif'],
      },
      keyframes: {
        overlayFadeIn: {
          'from': { opacity: '0' },
          'to': { opacity: '1' }
        }
      },
      animation: {
        'overlayFadeIn': 'overlayFadeIn 0.5s forwards'
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwind-scrollbar-hide')
  ],
}
