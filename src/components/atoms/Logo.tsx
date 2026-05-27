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

  const handleTap = (e: React.MouseEvent<HTMLImageElement>) => {
    const now = Date.now();
    clicks.current.push(now);
    clicks.current = clicks.current.filter(t => now - t <= 500);

    if (clicks.current.length >= 3) {
      const unlock = useAchievements.getState().unlock;
      unlock('sweet-tooth');
      clicks.current = [];
    }

    if (onClick) onClick(e as any);
  };

  return (
    <img
      src="/Aykin-Logo.svg"
      alt="Aykin Logo"
      onClick={handleTap}
      className={twMerge(
        "cursor-pointer transition-transform active:scale-95 h-12 w-auto object-contain",
        pulse && "animate-aykin-pulse",
        className
      )}
      {...(props as any)}
    />
  );
}
