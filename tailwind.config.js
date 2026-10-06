/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        pixel: ['"Press Start 2P"', 'monospace'],
        silkscreen: ['"Silkscreen"', 'monospace'],
        vt323: ['"VT323"', 'monospace'],
        retro: ['"DotGothic16"', '"Press Start 2P"', 'monospace'],
      },
      colors: {
        rpg: {
          dark: '#080811',
          panel: '#101026',
          border: '#3b3b6d',
          gold: '#facc15',
          goldBorder: '#eab308',
          accent: '#6366f1',
          crimson: '#ef4444',
          emerald: '#10b981',
          cyan: '#06b6d4',
          purple: '#a855f7'
        }
      },
      boxShadow: {
        'pixel': '4px 4px 0px 0px rgba(0,0,0,0.8)',
        'pixel-sm': '2px 2px 0px 0px rgba(0,0,0,0.8)',
        'pixel-gold': '0 0 15px rgba(250, 204, 21, 0.4), 4px 4px 0px 0px #000',
        'pixel-glow': '0 0 20px rgba(99, 102, 241, 0.5), 4px 4px 0px 0px #000',
      },
      animation: {
        'cursor-blink': 'blink 1s step-end infinite',
        'float-slow': 'float 4s ease-in-out infinite',
        'pulse-glow': 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        glow: {
          '0%, 100%': { filter: 'drop-shadow(0 0 6px rgba(250, 204, 21, 0.6))' },
          '50%': { filter: 'drop-shadow(0 0 16px rgba(250, 204, 21, 0.9))' },
        }
      }
    },
  },
  plugins: [],
};
