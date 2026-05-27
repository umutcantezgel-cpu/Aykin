"use client";

import React, { useRef } from 'react';
import { useAchievements } from '@/store/useAchievements';
import { twMerge } from 'tailwind-merge';

interface LogoProps extends React.SVGProps<SVGSVGElement> {
  variant?: 'primary' | 'light' | 'dark';
  pulse?: boolean;
}

/**
 * Aykin Logo — Inline SVG placeholder.
 * Replace with actual Aykin brand logo SVGs when available.
 */
export function Logo({ variant = 'primary', pulse = false, className, onClick, ...props }: LogoProps) {
  const clicks = useRef<number[]>([]);

  const handleTap = (e: React.MouseEvent<SVGSVGElement>) => {
    const now = Date.now();
    clicks.current.push(now);
    clicks.current = clicks.current.filter(t => now - t <= 500);

    if (clicks.current.length >= 3) {
      const unlock = useAchievements.getState().unlock;
      unlock('sweet-tooth');
      clicks.current = [];
    }

    if (onClick) onClick(e);
  };

  const fillColor = variant === 'primary' ? '#C41E3A' : variant === 'light' ? '#FAF8F5' : '#1A1A1A';
  const textColor = variant === 'primary' ? '#FAF8F5' : variant === 'light' ? '#C41E3A' : '#FAF8F5';

  return (
    <svg
      onClick={handleTap}
      viewBox="0 0 60 60"
      xmlns="http://www.w3.org/2000/svg"
      style={{ aspectRatio: '1 / 1' }}
      className={twMerge(
        "cursor-pointer transition-transform active:scale-95",
        pulse && "animate-aykin-pulse",
        className
      )}
      {...props}
    >
      <rect width="60" height="60" rx="14" fill={fillColor} />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="central"
        style={{ fontFamily: 'var(--font-heading), sans-serif', fontSize: 16, fontWeight: 700, fill: textColor, letterSpacing: '0.05em' }}
      >
        AYKIN
      </text>
    </svg>
  );
}
