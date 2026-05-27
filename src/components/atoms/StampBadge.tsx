import React from 'react';
import { twMerge } from 'tailwind-merge';
import { ScallopBadge } from './ScallopBadge';

type StampVariant = 'terracotta' | 'brown';

interface StampBadgeProps {
  label: string;
  variant?: StampVariant;
  size?: number | string;
  className?: string;
  rotate?: number;
}

export function StampBadge({ 
  label, 
  variant = 'terracotta', 
  size = 100, 
  className,
  rotate 
}: StampBadgeProps) {
  
  // Default rotations based on variant, overridden by rotate prop if provided
  const defaultRotation = variant === 'terracotta' ? 14 : -9;
  const finalRotation = rotate !== undefined ? rotate : defaultRotation;
  
  const fillClass = variant === 'terracotta' ? 'text-terracotta' : 'text-brown';
  const textClass = variant === 'terracotta' ? 'text-cream' : 'text-sand';

  return (
    <div className={twMerge("relative inline-block", className)}>
      <ScallopBadge 
        size={size} 
        fillClass={fillClass} 
        rotate={finalRotation}
      >
        <span className={twMerge(
          "font-calistoga text-center leading-tight tracking-wide px-4",
          textClass
        )} style={{ fontSize: `calc(${typeof size === 'number' ? size : 100}px * 0.16)` }}>
          {label}
        </span>
      </ScallopBadge>
    </div>
  );
}
