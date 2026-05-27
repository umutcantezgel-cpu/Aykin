import React from 'react';
import { twMerge } from 'tailwind-merge';

interface EyebrowPillProps {
  label: string;
  statusColor?: string; // Tailwind bg-color class, e.g. 'bg-green-500' or 'bg-terracotta'
  className?: string;
}

export function EyebrowPill({ label, statusColor = 'bg-terracotta', className }: EyebrowPillProps) {
  return (
    <div className={twMerge(
      "inline-flex items-center gap-2 px-3 py-1.5 rounded-full",
      "bg-white/70 backdrop-blur-md shadow-sm border border-white/50",
      "text-xs font-bold text-charcoal tracking-wider uppercase",
      className
    )}>
      {statusColor && (
        <span className="relative flex h-2 w-2">
          <span className={twMerge("animate-ping absolute inline-flex h-full w-full rounded-full opacity-75", statusColor)}></span>
          <span className={twMerge("relative inline-flex rounded-full h-2 w-2", statusColor)}></span>
        </span>
      )}
      <span>{label}</span>
    </div>
  );
}
