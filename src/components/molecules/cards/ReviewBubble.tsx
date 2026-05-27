import React from 'react';
import { twMerge } from 'tailwind-merge';
import { RatingPill } from '@/components/atoms/RatingPill';

interface ReviewBubbleProps {
  quote: string;
  author: string;
  score: number;
  className?: string;
}

export function ReviewBubble({ quote, author, score, className }: ReviewBubbleProps) {
  return (
    <div className={twMerge(
      "flex flex-col p-5 rounded-2xl bg-white/60 backdrop-blur-md shadow-sm border border-white/40",
      className
    )}>
      <RatingPill score={score} reviewCount={1} className="self-start mb-3 bg-white" />
      <p className="font-nunito italic text-charcoal/90 mb-4 leading-relaxed">
        "{quote}"
      </p>
      <span className="font-bold text-sm text-terracotta">— {author}</span>
    </div>
  );
}
