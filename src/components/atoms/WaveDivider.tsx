import React from 'react';
import { twMerge } from 'tailwind-merge';

export type WaveVariant = 'single-bump' | 'three-bump' | 'long-curve';

const WAVE_PATHS = {
  'single-bump': 'M0,50 Q500,0 1000,50 L1000,100 L0,100 Z',
  'three-bump': 'M0,50 Q250,20 500,50 T1000,50 L1000,100 L0,100 Z',
  'long-curve': 'M0,100 C300,20 700,80 1000,0 L1000,100 L0,100 Z',
};

interface WaveDividerProps {
  variant?: WaveVariant;
  fillClass?: string;
  flip?: boolean;
  className?: string;
}

export function WaveDivider({ 
  variant = 'single-bump', 
  fillClass = 'text-sand', 
  flip = false, 
  className 
}: WaveDividerProps) {
  return (
    <div 
      className={twMerge("w-full overflow-hidden leading-none", className)}
      style={{ transform: flip ? 'rotate(180deg)' : 'none' }}
    >
      <svg 
        viewBox="0 0 1000 100" 
        preserveAspectRatio="none" 
        className={twMerge("w-full h-12 md:h-20 lg:h-24", fillClass)}
      >
        <path d={WAVE_PATHS[variant]} fill="currentColor" />
      </svg>
    </div>
  );
}
