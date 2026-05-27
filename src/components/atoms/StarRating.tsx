import React from 'react';
import { twMerge } from 'tailwind-merge';

interface StarRatingProps {
  score: number; // e.g. 4.8
  max?: number;
  className?: string;
  starClassName?: string;
}

function HandDrawnStar({ filled = false, className }: { filled?: boolean, className?: string }) {
  // A slightly irregular star path to give a hand-drawn, authentic feel (no perfect symmetry)
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={filled ? "0" : "1.5"}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={twMerge("w-4 h-4", className)}
    >
      <path d="M 11.5 2.5 L 14.8 8 L 21.5 8.5 L 16.5 13.8 L 18.5 20.5 L 12.2 17.5 L 5.5 21 L 7.5 14 L 2.5 9.5 L 8.5 8.5 Z" />
    </svg>
  );
}

export function StarRating({ score, max = 5, className, starClassName }: StarRatingProps) {
  // Round score to nearest 0.5 for visual representation if partial stars were needed, 
  // but standard usually renders fully filled stars for anything above index + 0.5
  return (
    <div className={twMerge("flex items-center gap-0.5 text-orange", className)}>
      {Array.from({ length: max }).map((_, i) => (
        <HandDrawnStar 
          key={i} 
          filled={score >= i + 0.5} 
          className={starClassName} 
        />
      ))}
    </div>
  );
}
