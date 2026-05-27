'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

interface PromoBannerProps {
  text: string;
  className?: string;
}

export function PromoBanner({ text, className }: PromoBannerProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className={twMerge("w-full bg-peach text-terracotta overflow-hidden py-1.5 flex whitespace-nowrap", className)}>
      <motion.div
        initial={prefersReducedMotion ? { x: 0 } : { x: '100%' }}
        animate={prefersReducedMotion ? { x: 0 } : { x: '-100%' }}
        transition={prefersReducedMotion ? undefined : {
          repeat: Infinity,
          ease: 'linear',
          duration: 15
        }}
        className="font-bold text-sm tracking-widest uppercase px-4 flex-shrink-0"
      >
        {text} <span className="mx-8">•</span> {text} <span className="mx-8">•</span> {text}
      </motion.div>
    </div>
  );
}
