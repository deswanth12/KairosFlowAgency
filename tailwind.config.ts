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
        // Precise Developer Technical Palette
        tech: {
          navy: '#071A2F',        // Deep Developer Navy
          navyHover: '#0B2544',
          electric: '#1677FF',    // Electric Blue (Action)
          electricHover: '#0E62DA',
          code: '#38BDF8',        // Bright Cyan-Blue (Syntax Highlight)
          canvas: '#F8FAFC',      // Developer White
          pureWhite: '#FFFFFF',
          ink: '#0F172A',         // Code Black Text
          slate: '#64748B',       // Slate Muted Text
          border: '#DCE5EF',      // Technical Border
          softBlue: '#EFF6FF',
        },
        corporate: {
          dark: '#071A2F',        // Deep Developer Navy
          darkHover: '#0B2544',
          blue: '#1677FF',        // Electric Blue
          lightBlue: '#1677FF',
          sky: '#38BDF8',         // Technical Code Blue
          softBlue: '#EFF6FF',
          white: '#FFFFFF',
          offwhite: '#F8FAFC',    // Developer White
          border: '#DCE5EF',      // Technical Border
          borderDark: '#CBD5E1',
          text: '#0F172A',        // Code Black
          mutedText: '#64748B',   // Slate
        },
        ink: {
          DEFAULT: '#071A2F',
          light: '#0B2544',
          surface: '#0B2544',
          border: '#1E3A63',
        },
        navy: {
          DEFAULT: '#071A2F',
          dark: '#04101E',
          light: '#0B2544',
          surface: '#0B2544',
          border: '#1E3A63',
        },
        ivory: {
          DEFAULT: '#F8FAFC',
          card: '#FFFFFF',
          muted: '#F1F5F9',
          border: '#DCE5EF',
          borderDark: '#CBD5E1',
        },
        softblack: {
          DEFAULT: '#0F172A',
          light: '#1E293B',
          muted: '#64748B',
        },
        slate: {
          DEFAULT: '#64748B',
          muted: '#94A3B8',
          light: '#DCE5EF',
          dark: '#0F172A',
        },
        teal: {
          DEFAULT: '#1677FF',     // Electric Blue
          hover: '#0E62DA',
          active: '#094EAF',
          subtle: '#EFF6FF',
          border: '#38BDF8',
        },
        champagne: {
          DEFAULT: '#38BDF8',     // Technical Code Blue
          hover: '#0284C7',
          active: '#0369A1',
          subtle: '#EFF6FF',
          border: '#38BDF8',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['var(--font-display)', 'var(--font-sans)', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'subtle-card': '0 1px 3px 0 rgba(7, 26, 47, 0.04), 0 1px 2px -1px rgba(7, 26, 47, 0.04)',
        'elevated-card': '0 10px 25px -4px rgba(7, 26, 47, 0.06), 0 4px 10px -2px rgba(7, 26, 47, 0.03)',
        'hover-card': '0 20px 30px -8px rgba(7, 26, 47, 0.09), 0 6px 14px -4px rgba(7, 26, 47, 0.04)',
        'glow-electric': '0 0 20px -2px rgba(22, 119, 255, 0.25)',
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
