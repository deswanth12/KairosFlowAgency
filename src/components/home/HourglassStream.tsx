'use client';

import React, { useEffect, useRef } from 'react';

interface HourglassStreamProps {
  className?: string;
}

export const HourglassStream: React.FC<HourglassStreamProps> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = true;

    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      return;
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    // Particle system configuration
    const particleCount = 45;
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      color: string;
      life: number;
      maxLife: number;
    }> = [];

    const colors = [
      'rgba(37, 99, 235, ',   // Core Blue (#2563EB)
      'rgba(59, 130, 246, ',  // Light Blue (#3B82F6)
      'rgba(96, 165, 250, ',  // Soft Blue (#60A5FA)
      'rgba(11, 31, 58, ',    // Dark Blue (#0B1F3A)
      'rgba(37, 99, 235, '
    ];

    const initParticle = (p: (typeof particles)[0]) => {
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;
      const originX = width * 0.45;
      const originY = height * 0.35;

      p.x = originX + (Math.random() - 0.5) * 40;
      p.y = originY + (Math.random() - 0.5) * 20;
      p.vx = 0.6 + Math.random() * 1.4;
      p.vy = 0.4 + Math.random() * 0.8;
      p.size = 1.2 + Math.random() * 2.2;
      p.life = 0;
      p.maxLife = 120 + Math.random() * 100;
      p.color = colors[Math.floor(Math.random() * colors.length)];
      p.alpha = 0.1 + Math.random() * 0.5;
    };

    for (let i = 0; i < particleCount; i++) {
      const p = {
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        size: 2,
        alpha: 0.3,
        color: colors[0],
        life: 0,
        maxLife: 150
      };
      initParticle(p);
      p.life = Math.random() * p.maxLife; // Stagger initial life
      particles.push(p);
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        isVisible = entry.isIntersecting;
      });
    });
    observer.observe(canvas);

    const render = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;
      ctx.clearRect(0, 0, width, height);

      // Draw subtle connective flow curve
      ctx.beginPath();
      ctx.moveTo(width * 0.35, height * 0.25);
      ctx.bezierCurveTo(
        width * 0.48, height * 0.45,
        width * 0.55, height * 0.65,
        width * 0.75, height * 0.75
      );
      ctx.strokeStyle = 'rgba(47, 124, 120, 0.08)';
      ctx.lineWidth = 40;
      ctx.lineCap = 'round';
      ctx.stroke();

      // Render particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy + Math.sin(p.life * 0.05) * 0.3;
        p.life++;

        // Fade in and out
        const progress = p.life / p.maxLife;
        let currentAlpha = p.alpha;
        if (progress < 0.2) {
          currentAlpha = p.alpha * (progress / 0.2);
        } else if (progress > 0.8) {
          currentAlpha = p.alpha * ((1 - progress) / 0.2);
        }

        ctx.fillStyle = `${p.color}${currentAlpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Draw small trailing velocity line
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x - p.vx * 3.5, p.y - p.vy * 3.5);
        ctx.strokeStyle = `${p.color}${currentAlpha * 0.5})`;
        ctx.lineWidth = p.size * 0.6;
        ctx.stroke();

        if (p.life >= p.maxLife || p.x > width + 20 || p.y > height + 20) {
          initParticle(p);
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 w-full h-full opacity-70 ${className}`}
      aria-hidden="true"
    />
  );
};
