import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
  variant?: 'mark' | 'full' | 'compact';
  theme?: 'dark' | 'light' | 'monochrome';
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 36,
  variant = 'full',
  theme = 'dark'
}) => {
  // Theme colors based on editorial palette
  const frameColor = theme === 'dark' ? '#182B3A' : '#0D1117';
  const streamDark = theme === 'dark' ? '#1B4D4B' : '#182B3A';
  const streamTeal = '#2F7C78';
  const streamTealLight = '#489E9A';
  const textPrimary = theme === 'dark' ? '#F4F1EA' : '#0D1117';
  const textSecondary = '#2F7C78';
  const champagneDot = '#B99A62';

  const markSvg = (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="inline-block flex-shrink-0 transition-transform duration-300 group-hover:scale-105"
    >
      {/* Top and Bottom Horizontal Frame Bars */}
      <rect x="18" y="16" width="64" height="6" rx="1" fill={frameColor} />
      <rect x="18" y="78" width="40" height="6" rx="1" fill={frameColor} />

      {/* Hourglass Outer Frame Lines */}
      {/* Left upper diagonal */}
      <path
        d="M20 22L45 50L20 78"
        stroke={frameColor}
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Right upper diagonal */}
      <path
        d="M80 22L55 50L68 64"
        stroke={frameColor}
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Upper liquid pool */}
      <path
        d="M30 34C37 32 46 38 55 35C62 33 67 36 70 34L53 52C51 54 49 54 47 52L30 34Z"
        fill={streamDark}
      />

      {/* Center flowing stream down to right exit */}
      <path
        d="M48 48C49 56 46 62 52 70C55 74 61 78 72 78L72 84C57 84 48 78 44 71C40 64 42 56 44 48Z"
        fill={streamTeal}
      />

      {/* Flowing speed lines & digital particles */}
      {/* Upper flow line */}
      <path
        d="M62 67H76C78.2 67 80 65.2 80 63C80 60.8 78.2 59 76 59H65"
        stroke={streamTeal}
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      {/* Middle flow line */}
      <path
        d="M58 74H84C85.7 74 87 72.7 87 71C87 69.3 85.7 68 84 68H62"
        stroke={streamTeal}
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      {/* Bottom flow line */}
      <path
        d="M55 81H80C81.7 81 83 79.7 83 78C83 76.3 81.7 75 80 75H58"
        stroke={streamTealLight}
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Particle Dots */}
      <circle cx="85" cy="63" r="2.5" fill={streamTeal} />
      <circle cx="92" cy="71" r="2.2" fill={streamTealLight} />
      <circle cx="89" cy="78" r="2" fill={champagneDot} />
    </svg>
  );

  if (variant === 'mark') {
    return <div className={`inline-flex items-center ${className}`}>{markSvg}</div>;
  }

  return (
    <div className={`inline-flex items-center gap-3 group select-none ${className}`}>
      {markSvg}
      <div className="flex flex-col">
        <span
          className="text-base sm:text-lg font-bold tracking-wider uppercase transition-colors"
          style={{ color: textPrimary, letterSpacing: '0.12em', fontFamily: 'inherit' }}
        >
          Kairos Flow
        </span>
        <span
          className="text-[10px] sm:text-[11px] font-semibold tracking-[0.32em] uppercase transition-colors"
          style={{ color: textSecondary }}
        >
          Agency
        </span>
      </div>
    </div>
  );
};
