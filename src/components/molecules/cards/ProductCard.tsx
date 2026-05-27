'use client';

import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

interface ProductCardProps {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export function ProductCard({ className, children, onClick }: ProductCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Mouse positions mapped to -1 to 1
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for tilt
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  // Map to rotation degrees (max 10 degrees)
  const rotateX = useTransform(mouseYSpring, [-1, 1], [10, -10]);
  const rotateY = useTransform(mouseXSpring, [-1, 1], [-10, 10]);

  // Glare position
  const glareX = useTransform(mouseXSpring, [-1, 1], [0, 100]);
  const glareY = useTransform(mouseYSpring, [-1, 1], [0, 100]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || prefersReducedMotion) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = (mouseX / width) * 2 - 1; // -1 to 1
    const yPct = (mouseY / height) * 2 - 1; // -1 to 1

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    if (prefersReducedMotion) return;
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{
        perspective: 1200,
        rotateX: prefersReducedMotion ? 0 : rotateX,
        rotateY: prefersReducedMotion ? 0 : rotateY,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      whileHover={prefersReducedMotion ? undefined : { y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={twMerge(
        "relative flex flex-col p-5 rounded-2xl bg-white shadow-clay cursor-pointer",
        "transition-shadow duration-300 hover:shadow-lg",
        "hover:[mask-image:url(#bitemark-card)] [mask-image:none]",
        className
      )}
    >
      {/* Glare effect */}
      {!prefersReducedMotion && (
        <motion.div
          className="pointer-events-none absolute inset-0 z-20 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 mix-blend-overlay"
          style={{
            background: useTransform(
              () => `radial-gradient(circle at ${glareX.get()}% ${glareY.get()}%, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 60%)`
            ),
          }}
        />
      )}

      {/* Content wrapper pushed forward slightly for 3D effect */}
      <div 
        className="relative z-10 flex-grow"
        style={{ transform: prefersReducedMotion ? 'none' : 'translateZ(20px)' }}
      >
        {children}
      </div>
    </motion.div>
  );
}
