'use client';
import { motion, useReducedMotion } from 'framer-motion';

const BLOB_PATHS = {
  organic1: 'M 60,10 C 90,5 120,30 110,60 C 105,85 75,105 45,100 C 15,95 5,65 15,40 C 25,15 40,12 60,10 Z',
  organic2: 'M 50,15 C 80,8 105,35 95,60 C 90,80 70,98 45,95 C 20,92 8,68 12,42 C 18,20 35,18 50,15 Z',
  organic3: 'M 55,8 C 85,12 110,28 108,55 C 106,82 80,102 50,98 C 18,94 4,62 12,38 C 18,18 35,5 55,8 Z',
};

export function FloatingBlob({
  variant = 'organic1',
  color   = 'peach',
  opacity = 0.55,
  size    = 360,
  delay   = 0,
  reverse = false,
  className,
}: {
  variant?: keyof typeof BLOB_PATHS;
  color?:   'peach' | 'cream' | 'terracotta' | 'beige' | 'brown';
  opacity?: number;
  size?:    number | string;
  delay?:   number;
  reverse?: boolean;
  className?: string;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.svg
      viewBox="0 0 120 120"
      width={size}
      height={size}
      className={`absolute pointer-events-none ${className ?? ''}`}
      aria-hidden="true"
      animate={prefersReducedMotion ? undefined : {
        y:      reverse ? [0, 12, 0]  : [0, -12, 0],
        x:      reverse ? [0, -8, 0]  : [0, 8, 0],
        rotate: reverse ? [0, -3, 0]  : [0, 3, 0],
        scale:  [1, 1.04, 1],
      }}
      transition={prefersReducedMotion ? undefined : {
        duration: 12,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <path
        d={BLOB_PATHS[variant]}
        className={`fill-${color}`}
        opacity={opacity}
      />
    </motion.svg>
  );
}
