'use client';
import React from 'react';

export function SEOContentBlock({
  visible = true,
  children,
  ariaLabel = 'Über Aykin — Hintergrundinformationen',
}: {
  visible?: boolean;
  children: React.ReactNode;
  ariaLabel?: string;
}) {
  if (!visible) {
    return (
      <section
        aria-label={ariaLabel}
        style={{
          position: 'absolute',
          width: 1,
          height: 1,
          padding: 0,
          margin: -1,
          overflow: 'hidden',
          clip: 'rect(0,0,0,0)',
          whiteSpace: 'nowrap',
          borderWidth: 0,
        }}
      >
        {children}
      </section>
    );
  }

  return (
    <section
      aria-label={ariaLabel}
      style={{
        background: '#faf6f1',
        borderTop: '1px solid rgba(232,213,196,0.3)',
        padding: '60px 20px',
      }}
    >
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        {children}
      </div>
    </section>
  );
}
