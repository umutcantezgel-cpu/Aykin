'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';
import { Truck } from 'lucide-react'; // utilitarische UI icon

interface LieferandoCTAProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  className?: string;
  children: React.ReactNode;
}

// Particle generator
const generateParticles = () => {
  return Array.from({ length: 8 }).map((_, i) => {
    const angle = (i * 360) / 8;
    const distance = 50 + Math.random() * 20; 
    const radian = (angle * Math.PI) / 180;
    return {
      id: Math.random().toString(),
      x: Math.cos(radian) * distance,
      y: Math.sin(radian) * distance,
      scale: 0.5 + Math.random() * 0.5,
    };
  });
};

export function LieferandoCTA({ href, className, children, onClick, ...props }: LieferandoCTAProps) {
  const [particles, setParticles] = useState<any[]>([]);
  const prefersReducedMotion = useReducedMotion();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!prefersReducedMotion) {
      setParticles(generateParticles());
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
            className="absolute top-1/2 left-1/2 w-3 h-3 -ml-1.5 -mt-1.5 rounded-full bg-[#FF8000] pointer-events-none"
          />
        ))}
      </AnimatePresence>

      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        whileTap={prefersReducedMotion ? undefined : { scale: 0.94 }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
        onClick={handleClick}
        className={twMerge(
          "relative flex items-center justify-center gap-3 px-8 py-4",
          "bg-[#FF8000] text-white font-bold text-lg rounded-full transition-all duration-300", // Lieferando Orange
          "hover:bg-[#E67300] hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-[#FF8000]/30",
          "hover:[mask-image:url(#bitemark-right)] [mask-image:none]",
          className
        )}
        {...(props as any)}
      >
        <Truck className="w-6 h-6" />
        <span>{children}</span>
      </motion.a>
    </div>
  );
}
