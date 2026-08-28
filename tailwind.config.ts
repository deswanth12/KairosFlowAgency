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
        // Locked Kairos Flow 2026 Brand Design System
        kf: {
          navy: '#0B1F33',        // Deep Navy (Main brand anchor)
          navyHover: '#132B45',
          slateBlue: '#3E5C76',   // Slate Blue (Secondary brand structural)
          copper: '#B8613A',      // Copper (Warm tactile accent)
          copperHover: '#A0522E',
          copperLight: '#FBF4F0', // Subtle Copper Tint
          warmWhite: '#F7F7F4',   // Warm White (Primary canvas background)
          pureWhite: '#FFFFFF',   // White (Card & component surface)
          text: '#111827',        // Main Text (High-contrast charcoal)
          secondaryText: '#5B6875', // Secondary Text (Refined slate)
          border: '#D9E0E5',      // Structural Hairline Border
        },
        // Backward-compatible aliases mapped to the locked palette
        corporate: {
          dark: '#0B1F33',
          darkHover: '#132B45',
          blue: '#3E5C76',
          lightBlue: '#B8613A',
          sky: '#B8613A',
          softBlue: '#FBF4F0',
          white: '#FFFFFF',
          offwhite: '#F7F7F4',
          border: '#D9E0E5',
          borderDark: '#CBD5E1',
          text: '#111827',
          mutedText: '#5B6875',
        },
        ink: {
          DEFAULT: '#0B1F33',
          light: '#132B45',
          surface: '#132B45',
          border: '#3E5C76',
        },
        navy: {
          DEFAULT: '#0B1F33',
          dark: '#071524',
          light: '#132B45',
          surface: '#132B45',
          border: '#3E5C76',
        },
        ivory: {
          DEFAULT: '#F7F7F4',
          card: '#FFFFFF',
          muted: '#F0EFEA',
          border: '#D9E0E5',
          borderDark: '#CBD5E1',
        },
        softblack: {
          DEFAULT: '#111827',
          light: '#1F2937',
          muted: '#5B6875',
        },
        slate: {
          DEFAULT: '#5B6875',
          muted: '#94A3B8',
          light: '#D9E0E5',
          dark: '#111827',
        },
        teal: {
          DEFAULT: '#B8613A',     // Copper Accent
          hover: '#A0522E',
          active: '#874324',
          subtle: '#FBF4F0',
          border: '#B8613A',
        },
        champagne: {
          DEFAULT: '#B8613A',     // Copper Accent
          hover: '#A0522E',
          active: '#874324',
          subtle: '#FBF4F0',
          border: '#B8613A',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'Geist', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['var(--font-display)', 'var(--font-sans)', 'sans-serif'],
        mono: ['var(--font-mono)', 'Geist Mono', 'JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'subtle-card': '0 1px 3px 0 rgba(11, 31, 51, 0.04), 0 1px 2px -1px rgba(11, 31, 51, 0.03)',
        'elevated-card': '0 10px 25px -4px rgba(11, 31, 51, 0.06), 0 4px 10px -2px rgba(11, 31, 51, 0.03)',
        'hover-card': '0 20px 30px -8px rgba(11, 31, 51, 0.08), 0 6px 14px -4px rgba(11, 31, 51, 0.04)',
        'glow-copper': '0 0 20px -2px rgba(184, 97, 58, 0.25)',
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
