import React from 'react';
import { twMerge } from 'tailwind-merge';

interface MiniInfoCardProps {
  title: string;
  desc: string;
  className?: string;
}

export function MiniInfoCard({ title, desc, className }: MiniInfoCardProps) {
  return (
    <div className={twMerge(
      "flex flex-col p-4 bg-cream rounded-xl border border-sand",
      // No shadows, no icons per spec
      className
    )}>
      <h4 className="font-bold text-charcoal mb-1">{title}</h4>
      <p className="text-sm text-charcoal/70 leading-snug">{desc}</p>
    </div>
  );
}
