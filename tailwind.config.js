/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dental: {
          dark: '#081726',
          navy: '#0f2744',
          primary: '#0284c7', // vibrant cyan/blue
          accent: '#06b6d4',  // bright teal
          mint: '#10b981',    // fresh mint
          gold: '#f59e0b',    // subtle luxury gold
          surface: '#f8fafc',
          muted: '#64748b'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { filter: 'drop-shadow(0 0 15px rgba(6, 182, 212, 0.4))' },
          '100%': { filter: 'drop-shadow(0 0 30px rgba(6, 182, 212, 0.8))' },
        }
      }
    },
  },
  plugins: [],
}
