'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

interface TabPillProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active: boolean;
  layoutId: string; // Must be unique per tab group, e.g., 'menu-tabs'
  children: React.ReactNode;
  className?: string;
  activeClassName?: string;
  inactiveClassName?: string;
}

export function TabPill({ 
  active, 
  layoutId, 
  children, 
  className,
  activeClassName = "text-cream",
  inactiveClassName = "text-charcoal hover:bg-terracotta/5",
  ...props 
}: TabPillProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <button
      className={twMerge(
        "relative px-5 py-2 text-sm font-bold rounded-full transition-colors z-0",
        active ? activeClassName : inactiveClassName,
        className
      )}
      {...(props as any)}
    >
      {active && (
        <motion.div
          layoutId={layoutId}
          className="absolute inset-0 bg-terracotta rounded-full -z-10"
          transition={prefersReducedMotion ? { duration: 0 } : { type: "spring", stiffness: 300, damping: 25 }}
        />
      )}
      <span className="relative z-10">{children}</span>
    </button>
  );
}
