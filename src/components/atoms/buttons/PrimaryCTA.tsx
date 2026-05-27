'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';
import { ChevronRight } from 'lucide-react'; // utilitarische UI icon

interface PrimaryCTAProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  showArrow?: boolean;
  className?: string;
  children: React.ReactNode;
}

// Particle generator
const generateParticles = () => {
  return Array.from({ length: 8 }).map((_, i) => {
    const angle = (i * 360) / 8;
    // Radial explosion distance 40-60px
    const distance = 40 + Math.random() * 20; 
    const radian = (angle * Math.PI) / 180;
    return {
      id: Math.random().toString(),
      x: Math.cos(radian) * distance,
      y: Math.sin(radian) * distance,
      scale: 0.5 + Math.random() * 0.5,
    };
  });
};

export function PrimaryCTA({ showArrow = false, className, children, onClick, ...props }: PrimaryCTAProps) {
  const [particles, setParticles] = useState<any[]>([]);
  const prefersReducedMotion = useReducedMotion();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!prefersReducedMotion) {
      setParticles(generateParticles());
      // Remove particles after animation
      setTimeout(() => setParticles([]), 800);
    }
    if (onClick) onClick(e);
  };

  return (
    <div className="relative inline-block">
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 1, x: 0, y: 0, scale: 0 }}
            animate={{ opacity: 0, x: p.x, y: p.y, scale: p.scale }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute top-1/2 left-1/2 w-2 h-2 -ml-1 -mt-1 rounded-full bg-terracotta pointer-events-none"
          />
        ))}
      </AnimatePresence>

      <motion.button
        whileTap={prefersReducedMotion ? undefined : { scale: 0.92 }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
        onClick={handleClick}
        className={twMerge(
          "relative flex items-center justify-center gap-2 px-6 py-3",
          "bg-terracotta text-cream font-bold rounded-full transition-all duration-300",
          "hover:bg-[#C95039] hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-terracotta/30",
          // The bitemark mask reveals on hover via tailwind classes
          "hover:[mask-image:url(#bitemark-right)] [mask-image:none]",
          className
        )}
        {...(props as any)}
      >
        <span>{children}</span>
        {showArrow && <ChevronRight className="w-5 h-5" />}
      </motion.button>
    </div>
  );
}
