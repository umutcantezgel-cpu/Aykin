'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

interface SecondaryCTAProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: React.ReactNode;
}

export function SecondaryCTA({ className, children, ...props }: SecondaryCTAProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.button
      whileTap={prefersReducedMotion ? undefined : { scale: 0.92 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className={twMerge(
        "flex items-center justify-center px-6 py-3",
        "border-2 border-terracotta text-terracotta font-bold rounded-full transition-all duration-300",
        "hover:bg-terracotta/5 focus:outline-none focus:ring-4 focus:ring-terracotta/20",
        // Soft hover effect on the border
        className
      )}
      {...(props as any)}
    >
      {children}
    </motion.button>
  );
}
