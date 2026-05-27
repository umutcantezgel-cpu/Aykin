import React from 'react';
import { twMerge } from 'tailwind-merge';

interface ScallopBadgeProps {
  size?: number | string;
  fillClass?: string;
  rotate?: number;
  className?: string;
  children?: React.ReactNode;
}

/**
 * ScallopBadge — Decorative badge with scalloped edge.
 * Uses inline SVG instead of old brand SVG import.
 */
export function ScallopBadge({ 
  size = 120, 
  fillClass = 'text-bg-secondary', 
  rotate = 0, 
  className, 
  children 
}: ScallopBadgeProps) {
  return (
    <div 
      className={twMerge("relative flex items-center justify-center", className)}
      style={{ 
        width: size, 
        height: size, 
        transform: `rotate(${rotate}deg)` 
      }}
    >
      {/* Scalloped circle SVG placeholder */}
      <svg 
        className={twMerge("absolute inset-0 w-full h-full", fillClass)} 
        viewBox="0 0 100 100" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="50" cy="50" r="45" fill="currentColor" />
      </svg>
      <div 
        className="relative z-10 flex items-center justify-center text-center"
        style={{ transform: `rotate(${-rotate}deg)` }}
      >
        {children}
      </div>
    </div>
  );
}
