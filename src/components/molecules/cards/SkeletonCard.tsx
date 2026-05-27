import React from 'react';
import { twMerge } from 'tailwind-merge';

interface SkeletonCardProps {
  className?: string;
}

export function SkeletonCard({ className }: SkeletonCardProps) {
  // Skeleton needs to match ProductCard padding (p-5) and border-radius (rounded-2xl)
  return (
    <div className={twMerge(
      "flex flex-col p-5 rounded-2xl bg-white shadow-clay animate-pulse",
      "h-[320px]", // Approximate fixed height to prevent CLS, adjust if actual ProductCard varies
      className
    )}>
      {/* Image / Top placeholder */}
      <div className="w-full h-40 bg-sand rounded-xl mb-4"></div>
      
      {/* Title placeholder */}
      <div className="w-3/4 h-6 bg-sand rounded-md mb-2"></div>
      
      {/* Description placeholder */}
      <div className="w-full h-4 bg-sand rounded-md mb-2"></div>
      <div className="w-5/6 h-4 bg-sand rounded-md mb-auto"></div>
      
      {/* Footer / Price placeholder */}
      <div className="flex justify-between items-center mt-4">
        <div className="w-1/3 h-6 bg-sand rounded-md"></div>
        <div className="w-8 h-8 bg-sand rounded-full"></div>
      </div>
    </div>
  );
}
