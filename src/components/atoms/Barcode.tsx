import React from 'react';
import { twMerge } from 'tailwind-merge';

interface BarcodeProps {
  className?: string;
  barClassName?: string;
}

export function Barcode({ className, barClassName }: BarcodeProps) {
  // 20 predefined pseudo-random widths (in px) for a consistent look
  const widths = [
    2, 4, 1, 3, 2, 6, 1, 2, 4, 1, 
    3, 5, 2, 1, 4, 2, 1, 3, 2, 4
  ];

  return (
    <div className={twMerge("flex items-stretch gap-[2px] h-12 opacity-80", className)} aria-hidden="true">
      {widths.map((w, i) => (
        <div 
          key={i} 
          className={twMerge("bg-charcoal rounded-sm", barClassName)}
          style={{ width: `${w}px` }}
        />
      ))}
    </div>
  );
}
