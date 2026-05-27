import React from 'react';
import { twMerge } from 'tailwind-merge';

export interface IconProps extends React.SVGProps<SVGSVGElement> {}

const baseProps = {
  viewBox: "0 0 32 32",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function BubbleWaffle({ className, ...props }: IconProps) {
  return (
    <svg {...baseProps} className={twMerge("w-6 h-6", className)} {...props}>
      <path d="M16 28 C 10 20 6 12 10 6 C 14 8 18 8 22 6 C 26 12 22 20 16 28 Z" />
      <circle cx="12" cy="12" r="1.5" />
      <circle cx="16" cy="14" r="1.5" />
      <circle cx="20" cy="12" r="1.5" />
      <circle cx="14" cy="18" r="1.5" />
      <circle cx="18" cy="18" r="1.5" />
      <circle cx="16" cy="22" r="1.5" />
    </svg>
  );
}

export function Crepes({ className, ...props }: IconProps) {
  return (
    <svg {...baseProps} className={twMerge("w-6 h-6", className)} {...props}>
      <path d="M4 26 L28 26 L16 6 L8 14 Z" />
      <path d="M12 26 L20 16" />
      <path d="M18 26 L24 20" />
    </svg>
  );
}

export function Pancakes({ className, ...props }: IconProps) {
  return (
    <svg {...baseProps} className={twMerge("w-6 h-6", className)} {...props}>
      <ellipse cx="16" cy="22" rx="10" ry="3" />
      <ellipse cx="16" cy="17" rx="10" ry="3" />
      <ellipse cx="16" cy="12" rx="10" ry="3" />
      <path d="M14 6 C 14 4 18 4 18 6 C 18 9 14 9 14 6 Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Eisbecher({ className, ...props }: IconProps) {
  return (
    <svg {...baseProps} className={twMerge("w-6 h-6", className)} {...props}>
      <path d="M8 12 L12 26 L20 26 L24 12 Z" />
      <path d="M10 26 L6 28 M22 26 L26 28" />
      <path d="M10 12 C 10 7 14 4 16 4 C 18 4 22 7 22 12" />
      <path d="M13 12 C 13 9 19 9 19 12" />
    </svg>
  );
}

export function Shakes({ className, ...props }: IconProps) {
  return (
    <svg {...baseProps} className={twMerge("w-6 h-6", className)} {...props}>
      <path d="M10 14 L12 28 L20 28 L22 14 Z" />
      <path d="M9 14 C 9 9 13 6 16 6 C 19 6 23 9 23 14" />
      <path d="M18 6 L20 2" />
    </svg>
  );
}

export function Coffee({ className, ...props }: IconProps) {
  return (
    <svg {...baseProps} className={twMerge("w-6 h-6", className)} {...props}>
      <path d="M8 10 L8 24 C 8 26 10 28 16 28 C 22 28 24 26 24 24 L24 10 Z" />
      <path d="M24 14 C 28 14 28 20 24 20" />
      <path d="M12 4 C 11 6 13 8 12 10" />
      <path d="M16 3 C 15 5 17 7 16 9" />
      <path d="M20 4 C 19 6 21 8 20 10" />
    </svg>
  );
}

export function Boxen({ className, ...props }: IconProps) {
  return (
    <svg {...baseProps} className={twMerge("w-6 h-6", className)} {...props}>
      <path d="M4 12 L16 18 L28 12 L16 6 Z" />
      <path d="M4 12 L4 22 L16 28 L28 22 L28 12" />
      <path d="M16 18 L16 28" />
    </svg>
  );
}

export function Cake({ className, ...props }: IconProps) {
  return (
    <svg {...baseProps} className={twMerge("w-6 h-6", className)} {...props}>
      <path d="M6 24 L26 24 L26 12 L16 6 L6 12 Z" />
      <path d="M6 16 L26 16" />
      <path d="M16 6 L16 2" />
      <circle cx="16" cy="2" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

// UI Icons with hand-drawn wobble / imperfections
export function HamburgerIcon({ className, ...props }: IconProps) {
  return (
    <svg {...baseProps} className={twMerge("w-6 h-6", className)} {...props}>
      <path d="M4.5 9 C 12 8 20 10 27.5 9" />
      <path d="M5 16 C 10 16 22 15 27 16" />
      <path d="M4.5 23 C 12 24 20 22 27.5 23" />
    </svg>
  );
}

export function CloseBittenIcon({ className, ...props }: IconProps) {
  return (
    <svg {...baseProps} className={twMerge("w-6 h-6", className)} {...props}>
      <path d="M7 7 L25 25" />
      {/* Missing chunk via curve to simulate a bite mark notch */}
      <path d="M25 7 L18 14 C 15 15 13 13 14 10 L16 8 L18 6" />
      <path d="M10 14 L7 17 C 6 21 11 26 15 25 L18 24" />
    </svg>
  );
}
