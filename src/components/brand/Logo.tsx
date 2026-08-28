import React from 'react';
import Image from 'next/image';

interface LogoProps {
  className?: string;
  size?: number;
  variant?: 'mark' | 'full' | 'compact';
  theme?: 'dark' | 'light' | 'monochrome';
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 38,
  variant = 'full',
  theme = 'dark'
}) => {
  const textPrimary = theme === 'dark' ? '#F4F1EA' : '#0D1117';
  const textSecondary = '#2F7C78';
  const logoSrc = theme === 'dark' 
    ? '/images/logo/logo-mark-dark-mode.png' 
    : '/images/logo/logo-mark-transparent.png';

  const markImg = (
    <div
      className="relative flex-shrink-0 transition-transform duration-300 group-hover:scale-105"
      style={{ width: size, height: size }}
    >
      <Image
        src={logoSrc}
        alt="Kairos Flow Agency Logo"
        width={size}
        height={size}
        className="w-full h-full object-contain"
        priority
        unoptimized
      />
    </div>
  );

  if (variant === 'mark') {
    return <div className={`inline-flex items-center ${className}`}>{markImg}</div>;
  }

  return (
    <div className={`inline-flex items-center gap-3 group select-none ${className}`}>
      {markImg}
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
