'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, useSpring, useTransform, HTMLMotionProps } from 'framer-motion';

// ---------------------------------------------------------------------------
// Cubic Bezier Easing: Linear / Apple / Vercel style (snappy initial acceleration, smooth deceleration)
// ---------------------------------------------------------------------------
export const EASE_OUT = [0.16, 1, 0.3, 1] as const;

// ---------------------------------------------------------------------------
// 1. FadeIn & FadeInStagger Viewport Reveal Wrappers
// ---------------------------------------------------------------------------

interface FadeInProps extends HTMLMotionProps<'div'> {
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  duration?: number;
}

export const FadeIn: React.FC<FadeInProps> = ({
  children,
  delay = 0,
  direction = 'up',
  distance = 24,
  duration = 0.6,
  className = '',
  ...props
}) => {
  const getOffset = () => {
    switch (direction) {
      case 'up': return { y: distance, x: 0 };
      case 'down': return { y: -distance, x: 0 };
      case 'left': return { x: distance, y: 0 };
      case 'right': return { x: -distance, y: 0 };
      default: return { x: 0, y: 0 };
    }
  };

  const offset = getOffset();

  return (
    <motion.div
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration,
        delay,
        ease: EASE_OUT
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export const FadeInStagger: React.FC<{
  children: React.ReactNode;
  staggerDelay?: number;
  className?: string;
}> = ({ children, staggerDelay = 0.08, className = '' }) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const FadeInItem: React.FC<FadeInProps> = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.55, ease: EASE_OUT }
        }
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// ---------------------------------------------------------------------------
// 2. SpotlightCard — Cursor-following radial gradient glow (Linear / Raycast)
// ---------------------------------------------------------------------------

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  spotlightColor?: string;
  className?: string;
}

export const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  spotlightColor = 'rgba(184, 97, 58, 0.14)',
  className = '',
  ...props
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: -200, y: -200 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-hidden ${className}`}
      {...props}
    >
      {/* Dynamic Cursor Spotlight Radial Mask */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl transition-opacity duration-300 z-10"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, ${spotlightColor}, transparent 70%)`
        }}
      />
      {children}
    </div>
  );
};

// ---------------------------------------------------------------------------
// 3. SpringCounter — Rolling numeric ticker (Pricing, KPIs)
// ---------------------------------------------------------------------------

interface SpringCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
}

export const SpringCounter: React.FC<SpringCounterProps> = ({
  value,
  prefix = '',
  suffix = '',
  decimals = 0,
  className = ''
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const spring = useSpring(0, {
    stiffness: 75,
    damping: 18,
    mass: 0.8
  });

  const display = useTransform(spring, (current) => {
    const formatted = decimals > 0
      ? current.toFixed(decimals)
      : Math.round(current).toLocaleString();
    return `${prefix}${formatted}${suffix}`;
  });

  useEffect(() => {
    if (inView) {
      spring.set(value);
    }
  }, [spring, value, inView]);

  return (
    <motion.span ref={ref} className={className}>
      {display}
    </motion.span>
  );
};
