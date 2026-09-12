'use client';

import React, { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Critical global error:', error);
  }, [error]);

  return (
    <html lang="en">
      <body style={{
        margin: 0,
        padding: '3rem 1.5rem',
        backgroundColor: '#0B1F33',
        color: '#F7F7F4',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '480px', margin: '0 auto' }}>
          <div style={{
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: '#B8613A',
            marginBottom: '1rem',
            fontFamily: 'monospace'
          }}>
            Critical System Notice
          </div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            A critical error occurred
          </h1>
          <p style={{ color: '#94A3B8', fontSize: '0.875rem', lineHeight: '1.6', marginBottom: '2rem' }}>
            The root application layout encountered an unexpected issue. Please retry loading or contact technical support.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
            <button
              onClick={() => reset()}
              style={{
                backgroundColor: '#B8613A',
                color: '#FFFFFF',
                border: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '0.5rem',
                fontWeight: '600',
                fontSize: '0.875rem',
                cursor: 'pointer'
              }}
            >
              Try Again
            </button>
            <a
              href="/"
              style={{
                backgroundColor: 'rgba(255,255,255,0.1)',
                color: '#FFFFFF',
                textDecoration: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '0.5rem',
                fontWeight: '600',
                fontSize: '0.875rem'
              }}
            >
              Return Home
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
