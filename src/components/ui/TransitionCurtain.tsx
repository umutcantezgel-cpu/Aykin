'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useTransition } from '@/store/useTransition';

export function TransitionCurtain() {
  const { isBusy } = useTransition();
  const prefersReducedMotion = useReducedMotion();
  const [show, setShow] = useState(false);
  const [origin, setOrigin] = useState<'top' | 'bottom'>('top');

  useEffect(() => {
    if (prefersReducedMotion) return;

    if (isBusy) {
      setOrigin('top');
      setShow(true);
    } else {
      setOrigin('bottom');
      // Delay unmount to let the curtain slide up
      const timer = setTimeout(() => setShow(false), 800);
      return () => clearTimeout(timer);
    }
  }, [isBusy, prefersReducedMotion]);

  useEffect(() => {
    const handlePopState = () => {
      if (prefersReducedMotion) return;
      // Quick flash on back button
      useTransition.setState({ isBusy: true });
      setTimeout(() => useTransition.setState({ isBusy: false }), 800);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ scaleY: isBusy ? 0 : 1 }}
          animate={{ scaleY: isBusy ? 1 : 0 }}
          exit={{ scaleY: 0 }}
          transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
          className="fixed inset-0 z-[9999] bg-terracotta pointer-events-none"
          style={{ transformOrigin: origin }}
        >
          {/* Dripping Syrup Edge at the bottom */}
          {origin === 'top' && isBusy && (
            <motion.svg
              initial={{ y: 0 }}
              animate={{ y: [0, 20, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="absolute top-full left-0 w-full h-16 text-terracotta fill-current"
              viewBox="0 0 1000 100"
              preserveAspectRatio="none"
            >
              <path d="M0,0 L1000,0 L1000,20 Q950,80 900,20 T800,20 T700,20 T600,20 T500,20 T400,20 T300,20 T200,20 T100,20 T0,20 Z" />
            </motion.svg>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
