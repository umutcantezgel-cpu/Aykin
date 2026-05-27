'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { PrimaryCTA, SecondaryCTA } from '@/components/atoms/buttons';
import { Cookie } from 'lucide-react';

export function CookieBanner() {
  const [show, setShow] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const consent = localStorage.getItem('aykin_cookie_consent');
    if (!consent) {
      // Delay showing banner slightly for better UX
      const timer = setTimeout(() => setShow(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleConsent = (type: 'all' | 'essential' | 'custom') => {
    if (type === 'custom') {
      // Typically opens a modal to configure, for now we just accept essential
      localStorage.setItem('aykin_cookie_consent', 'custom');
    } else {
      localStorage.setItem('aykin_cookie_consent', type);
    }
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 100 }}
          animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 100 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-[100] p-4 pointer-events-none flex justify-center"
        >
          <div className="pointer-events-auto bg-cream border-2 border-peach rounded-3xl shadow-clay p-6 w-full max-w-4xl flex flex-col md:flex-row gap-6 items-center relative overflow-hidden">
            
            {/* Top Right Bite Mark */}
            <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none" style={{ maskImage: 'url(#bitemark-top-right)' }} />

            <div className="flex-shrink-0 w-16 h-16 bg-peach rounded-full flex items-center justify-center text-terracotta">
              <Cookie className="w-8 h-8" />
            </div>
            
            <div className="flex-grow text-center md:text-left">
              <h3 className="font-calistoga text-2xl text-charcoal mb-2">Cookies für dich!</h3>
              <p className="text-sm text-charcoal/80 leading-relaxed max-w-xl">
                Wir verwenden Cookies, um dir das beste Erlebnis auf unserer Website zu bieten. Manche sind essenziell, andere helfen uns, unseren Service zu verbessern. Bist du einverstanden?
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <button 
                onClick={() => handleConsent('essential')}
                className="text-sm font-bold text-charcoal/60 hover:text-charcoal underline underline-offset-4 px-4 py-2 transition-colors"
              >
                Ablehnen
              </button>
              <SecondaryCTA onClick={() => handleConsent('custom')} className="py-2 text-sm">
                Anpassen
              </SecondaryCTA>
              <PrimaryCTA onClick={() => handleConsent('all')} className="py-2 text-sm whitespace-nowrap">
                Akzeptieren
              </PrimaryCTA>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
