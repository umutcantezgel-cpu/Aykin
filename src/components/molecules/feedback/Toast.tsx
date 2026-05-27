'use client';

import React from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useToastStore } from '@/store/useToastStore';
import { twMerge } from 'tailwind-merge';

export function ToastContainer() {
  const toasts = useToastStore((s) => s.toasts);
  const prefersReducedMotion = useReducedMotion();

  return (
    <div 
      className="fixed top-4 left-0 right-0 z-[100] flex flex-col items-center gap-2 pointer-events-none"
      aria-live="polite"
      role="status"
    >
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -50, scale: 0.9 }}
            animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -20, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className={twMerge(
              "pointer-events-auto px-6 py-3 rounded-full shadow-clay backdrop-blur-md font-bold text-center",
              toast.type === 'error' ? 'bg-red-500/90 text-white' : 
              toast.type === 'success' ? 'bg-terracotta text-cream' : 
              'bg-charcoal/90 text-cream'
            )}
          >
            {toast.title}
            {toast.message && <span className="block text-sm font-normal opacity-90 mt-0.5">{toast.message}</span>}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
