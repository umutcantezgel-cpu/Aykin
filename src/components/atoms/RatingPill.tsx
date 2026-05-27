import React from 'react';
import { twMerge } from 'tailwind-merge';
import { StarRating } from './StarRating';

interface RatingPillProps {
  score: number;
  reviewCount: number;
  className?: string;
}

export function RatingPill({ score, reviewCount, className }: RatingPillProps) {
  return (
    <div className={twMerge(
      "inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white shadow-sm border border-sand",
      className
    )}>
      <StarRating score={score} className="text-orange" />
      <span className="text-sm font-bold text-charcoal">{score.toFixed(1)}</span>
      <span className="text-xs text-brown">({reviewCount})</span>
    </div>
  );
}
