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
        // Core Corporate White + Dark Blue + Light Blue Palette
        corporate: {
          dark: '#0B1F3A',        // Dark Blue (20%)
          darkHover: '#162E52',
          blue: '#2563EB',        // Bright Blue (10%)
          lightBlue: '#3B82F6',
          sky: '#60A5FA',
          softBlue: '#EFF6FF',    // Very Light Blue
          white: '#FFFFFF',       // Primary White (70%)
          offwhite: '#F6F9FC',    // Alternating Section Background
          border: '#E5EAF0',      // Subtle Card & Section Border
          borderDark: '#CBD5E1',
          text: '#172033',        // Dark Crisp Text
          mutedText: '#64748B',   // Muted Slate Text
        },
        // Backward-compatible semantic aliases mapped to the new palette
        ink: {
          DEFAULT: '#0B1F3A',
          light: '#162E52',
          surface: '#11284A',
          border: '#1E3A63',
        },
        navy: {
          DEFAULT: '#0B1F3A',
          dark: '#071529',
          light: '#162E52',
          surface: '#11284A',
          border: '#1E3A63',
        },
        ivory: {
          DEFAULT: '#FFFFFF',
          card: '#FFFFFF',
          muted: '#F6F9FC',
          border: '#E5EAF0',
          borderDark: '#CBD5E1',
        },
        softblack: {
          DEFAULT: '#172033',
          light: '#2D3748',
          muted: '#64748B',
        },
        slate: {
          DEFAULT: '#64748B',
          muted: '#94A3B8',
          light: '#E2E8F0',
          dark: '#172033',
        },
        teal: {
          DEFAULT: '#2563EB',     // Upgraded to refined Trust Blue
          hover: '#1D4ED8',
          active: '#1E40AF',
          subtle: '#EFF6FF',
          border: '#3B82F6',
        },
        champagne: {
          DEFAULT: '#2563EB',     // Blue accent badge
          hover: '#1D4ED8',
          active: '#1E40AF',
          subtle: '#EFF6FF',
          border: '#60A5FA',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['var(--font-display)', 'var(--font-sans)', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'subtle-card': '0 1px 3px 0 rgba(11, 31, 58, 0.04), 0 1px 2px -1px rgba(11, 31, 58, 0.04)',
        'elevated-card': '0 10px 30px -4px rgba(11, 31, 58, 0.08), 0 4px 12px -2px rgba(11, 31, 58, 0.04)',
        'hover-card': '0 20px 35px -8px rgba(11, 31, 58, 0.12), 0 6px 16px -4px rgba(11, 31, 58, 0.06)',
        'glow-blue': '0 0 20px -2px rgba(37, 99, 235, 0.25)',
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
