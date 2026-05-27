import React from 'react';
import { twMerge } from 'tailwind-merge';

interface TicketPerforationProps {
  position: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
  fillClass?: string; // e.g. text-sand
}

export function TicketPerforation({ position, className, fillClass = 'text-sand' }: TicketPerforationProps) {
  const isHorizontal = position === 'top' || position === 'bottom';
  
  // A repeating half-circle pattern
  return (
    <div 
      className={twMerge(
        "absolute pointer-events-none overflow-hidden",
        isHorizontal ? "left-0 right-0 h-3" : "top-0 bottom-0 w-3",
        position === 'top' ? "-top-1.5" : "",
        position === 'bottom' ? "-bottom-1.5" : "",
        position === 'left' ? "-left-1.5" : "",
        position === 'right' ? "-right-1.5" : "",
        className
      )}
      aria-hidden="true"
    >
      <svg 
        width="100%" 
        height="100%" 
        className={fillClass}
      >
        <defs>
          <pattern 
            id={`ticket-perf-${position}`} 
            x="0" y="0" 
            width={isHorizontal ? 12 : 100} 
            height={isHorizontal ? 100 : 12} 
            patternUnits="userSpaceOnUse"
          >
            <circle 
              cx={isHorizontal ? 6 : (position === 'left' ? 0 : 12)} 
              cy={isHorizontal ? (position === 'top' ? 0 : 12) : 6} 
              r="4" 
              fill="currentColor" 
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#ticket-perf-${position})`} />
      </svg>
    </div>
  );
}
