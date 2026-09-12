'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';

interface ImageLightboxProps {
  src: string;
  alt: string;
  caption?: string;
  children?: React.ReactNode;
  className?: string;
}

export const ImageLightbox: React.FC<ImageLightboxProps> = ({
  src,
  alt,
  caption,
  children,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        setIsZoomed(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <>
      {/* Clickable Trigger Wrapper */}
      <div 
        onClick={() => setIsOpen(true)}
        className={`cursor-zoom-in relative group ${className}`}
        title="Click to view full architecture preview"
      >
        {children}
        <div className="absolute inset-0 bg-[#0B1F33]/0 group-hover:bg-[#0B1F33]/20 transition-all flex items-center justify-center pointer-events-none rounded-2xl">
          <span className="opacity-0 group-hover:opacity-100 transition-opacity px-3 py-1.5 rounded-full bg-[#0B1F33]/90 text-white font-mono text-[11px] flex items-center gap-1.5 shadow-lg border border-white/20">
            <Maximize2 className="w-3 h-3 text-[#B8613A]" />
            <span>Enlarge Preview</span>
          </span>
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-[#0B1F33]/90 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => {
            setIsOpen(false);
            setIsZoomed(false);
          }}
        >
          {/* Top Control Bar */}
          <div 
            className="absolute top-4 right-4 z-10 flex items-center gap-2"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsZoomed(!isZoomed)}
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-colors"
              title={isZoomed ? "Zoom out" : "Zoom in"}
              aria-label={isZoomed ? "Zoom out" : "Zoom in"}
            >
              {isZoomed ? <ZoomOut className="w-5 h-5" /> : <ZoomIn className="w-5 h-5" />}
            </button>
            <button
              onClick={() => {
                setIsOpen(false);
                setIsZoomed(false);
              }}
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-colors"
              title="Close (Esc)"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Image Container */}
          <div 
            className="relative max-w-5xl max-h-[85vh] w-full flex flex-col items-center justify-center overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`relative transition-transform duration-300 ${isZoomed ? 'scale-125 cursor-zoom-out' : 'cursor-zoom-in'}`} onClick={() => setIsZoomed(!isZoomed)}>
              <Image
                src={src}
                alt={alt}
                width={1400}
                height={900}
                className="rounded-xl object-contain max-h-[75vh] w-auto shadow-2xl border border-white/10"
                priority
              />
            </div>

            {/* Optional Caption */}
            {(caption || alt) && (
              <div className="mt-4 px-4 py-2 rounded-lg bg-[#0B1F33]/80 border border-white/10 text-white font-mono text-xs text-center max-w-xl">
                {caption || alt}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
