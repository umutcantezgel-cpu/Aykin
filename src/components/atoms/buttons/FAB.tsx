'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';
import { ShoppingBag } from 'lucide-react'; // utilitarische UI icon

interface FABProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  itemCount?: number;
  className?: string;
}

export function FAB({ itemCount = 0, className, ...props }: FABProps) {
  const prefersReducedMotion = useReducedMotion();

  // Tilt hover effect: rotate 15deg on hover if motion is allowed
  return (
    <motion.button
      whileHover={prefersReducedMotion ? undefined : { rotate: -10, scale: 1.05 }}
      whileTap={prefersReducedMotion ? undefined : { scale: 0.9 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={twMerge(
        "fixed bottom-6 right-6 z-50 flex items-center justify-center lg:hidden",
        "w-14 h-14 bg-terracotta text-cream rounded-full shadow-clay",
        "focus:outline-none focus:ring-4 focus:ring-terracotta/40",
        className
      )}
      aria-label="Warenkorb öffnen"
      {...(props as any)}
    >
      <ShoppingBag className="w-6 h-6" />
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 bg-cream text-terracotta text-xs font-bold rounded-full shadow-sm">
          {itemCount}
        </span>
      )}
    </motion.button>
  );
}
