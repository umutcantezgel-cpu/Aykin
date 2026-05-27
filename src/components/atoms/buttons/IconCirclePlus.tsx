'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';
import { Plus } from 'lucide-react';

interface IconCirclePlusProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export function IconCirclePlus({ className, ...props }: IconCirclePlusProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.button
      whileTap={prefersReducedMotion ? undefined : { scale: 0.90 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className={twMerge(
        "flex items-center justify-center w-[34px] h-[34px] rounded-full",
        "bg-sand text-charcoal transition-colors hover:bg-terracotta hover:text-cream",
        "focus:outline-none focus:ring-2 focus:ring-terracotta/50",
        className
      )}
      aria-label="Hinzufügen"
      {...(props as any)}
    >
      <Plus className="w-5 h-5" />
    </motion.button>
  );
}
