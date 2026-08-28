import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0D1117',
          light: '#161D27',
          surface: '#121820',
          border: '#212A38',
        },
        navy: {
          DEFAULT: '#182B3A',
          dark: '#101F2B',
          light: '#233B4F',
          surface: '#152431',
          border: '#2B465C',
        },
        ivory: {
          DEFAULT: '#F4F1EA',
          card: '#FAF8F4',
          muted: '#ECE8DF',
          border: '#E1DDD3',
          borderDark: '#D3CDC0',
        },
        softblack: {
          DEFAULT: '#20252B',
          light: '#353D47',
          muted: '#4D5763',
        },
        slate: {
          DEFAULT: '#69737D',
          muted: '#8A95A0',
          light: '#B4BCC4',
          dark: '#4D555D',
        },
        teal: {
          DEFAULT: '#2F7C78',
          hover: '#266562',
          active: '#1E504E',
          subtle: '#E8F2F1',
          border: '#3F9691',
        },
        champagne: {
          DEFAULT: '#B99A62',
          hover: '#A4854E',
          active: '#8E713E',
          subtle: '#F8F4EC',
          border: '#CDB17E',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['var(--font-display)', 'var(--font-sans)', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'subtle-ivory': '0 2px 12px -2px rgba(32, 37, 43, 0.05), 0 1px 3px 0 rgba(32, 37, 43, 0.03)',
        'elevated-ivory': '0 10px 30px -4px rgba(32, 37, 43, 0.08), 0 4px 12px -2px rgba(32, 37, 43, 0.04)',
        'card-dark': '0 10px 30px -4px rgba(0, 0, 0, 0.4), 0 4px 12px -2px rgba(0, 0, 0, 0.2)',
        'glow-teal': '0 0 20px -2px rgba(47, 124, 120, 0.25)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'flow-pulse': 'flowPulse 4s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        flowPulse: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.9' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
