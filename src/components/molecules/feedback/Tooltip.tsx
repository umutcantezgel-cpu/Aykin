'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom';
  className?: string;
}

export function Tooltip({ content, children, position = 'top', className }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      {children}
      
      <AnimatePresence>
        {isVisible && (
          <motion.div
            role="tooltip"
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: position === 'top' ? 10 : -10, scale: 0.95 }}
            animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: position === 'top' ? 5 : -5, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className={twMerge(
              "absolute left-1/2 -translate-x-1/2 z-50 px-3 py-2 text-sm font-bold text-cream bg-charcoal rounded-xl shadow-sm whitespace-nowrap pointer-events-none",
              position === 'top' ? "bottom-full mb-2" : "top-full mt-2",
              className
            )}
          >
            {content}
            {/* Tooltip Tail */}
            <div 
              className={twMerge(
                "absolute left-1/2 -translate-x-1/2 w-0 h-0 border-[6px] border-transparent",
                position === 'top' 
                  ? "top-full border-t-charcoal" 
                  : "bottom-full border-b-charcoal"
              )}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
