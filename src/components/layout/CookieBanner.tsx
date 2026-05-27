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

  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState({ analytics: false, marketing: false });

  const handleConsent = (type: 'all' | 'essential' | 'custom' | 'save') => {
    if (type === 'custom') {
      setShowSettings(true);
      return;
    }
    
    if (type === 'save') {
      localStorage.setItem('aykin_cookie_consent', JSON.stringify({ essential: true, ...preferences }));
      setShowSettings(false);
      setShow(false);
      return;
    }

    if (type === 'all') {
      localStorage.setItem('aykin_cookie_consent', JSON.stringify({ essential: true, analytics: true, marketing: true }));
    } else if (type === 'essential') {
      localStorage.setItem('aykin_cookie_consent', JSON.stringify({ essential: true, analytics: false, marketing: false }));
    }
    
    setShow(false);
  };

  return (
    <>
      <AnimatePresence>
        {show && !showSettings && (
          <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 100 }}
            animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 100 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-0 left-0 right-0 z-[100] p-4 pointer-events-none flex justify-center"
          >
            <div className="pointer-events-auto bg-[#FAF8F5] border-2 border-[#E8D5C4] rounded-3xl shadow-[0_10px_40px_rgba(26,26,26,0.1)] p-6 w-full max-w-4xl flex flex-col md:flex-row gap-6 items-center relative overflow-hidden">
              <div className="flex-shrink-0 w-16 h-16 bg-[#E8D5C4] rounded-full flex items-center justify-center text-[#C41E3A]">
                <Cookie className="w-8 h-8" />
              </div>
              
              <div className="flex-grow text-center md:text-left">
                <h3 className="font-calistoga text-2xl text-[#1A1A1A] mb-2">Cookies für dich!</h3>
                <p className="text-sm text-[#2D2D2D] leading-relaxed max-w-xl">
                  Wir verwenden Cookies, um dir das beste Erlebnis auf unserer Website zu bieten. Manche sind essenziell, andere helfen uns, unseren Service zu verbessern. Bist du einverstanden?
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <button 
                  onClick={() => handleConsent('essential')}
                  className="text-sm font-bold text-[#1A1A1A]/60 hover:text-[#1A1A1A] underline underline-offset-4 px-4 py-2 transition-colors"
                >
                  Ablehnen
                </button>
                <SecondaryCTA onClick={() => handleConsent('custom')} className="py-2 text-sm bg-white border-[#E8D5C4]">
                  Anpassen
                </SecondaryCTA>
                <PrimaryCTA onClick={() => handleConsent('all')} className="py-2 text-sm whitespace-nowrap shadow-none">
                  Akzeptieren
                </PrimaryCTA>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] bg-[#1A1A1A]/40 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#FAF8F5] border border-[#E8D5C4] rounded-3xl shadow-2xl p-8 max-w-md w-full relative"
            >
              <h3 className="font-calistoga text-2xl text-[#1A1A1A] mb-2">Cookie-Einstellungen</h3>
              <p className="text-sm text-[#2D2D2D] mb-8">Wähle selbst, welche Cookies du zulassen möchtest.</p>
              
              <div className="space-y-6 mb-8">
                {/* Essential */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h4 className="font-bold text-[#1A1A1A] text-sm">Essenziell (Immer aktiv)</h4>
                    <p className="text-xs text-[#2D2D2D] mt-1">Notwendig für die Grundfunktionen der Webseite (Sicherheit, Warenkorb, Navigation).</p>
                  </div>
                  <div className="w-10 h-6 bg-[#C41E3A] rounded-full flex items-center px-1 opacity-50 cursor-not-allowed shrink-0">
                    <div className="w-4 h-4 bg-white rounded-full translate-x-4" />
                  </div>
                </div>

                {/* Analytics */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h4 className="font-bold text-[#1A1A1A] text-sm">Statistiken</h4>
                    <p className="text-xs text-[#2D2D2D] mt-1">Helfen uns zu verstehen, wie Besucher mit der Seite interagieren (Google Analytics).</p>
                  </div>
                  <button 
                    onClick={() => setPreferences(p => ({ ...p, analytics: !p.analytics }))}
                    className={`w-10 h-6 rounded-full flex items-center px-1 shrink-0 transition-colors ${preferences.analytics ? 'bg-[#C41E3A]' : 'bg-[#E8D5C4]'}`}
                  >
                    <div className={`w-4 h-4 bg-white rounded-full transition-transform ${preferences.analytics ? 'translate-x-4' : 'translate-x-0'}`} />
                  </button>
                </div>

                {/* Marketing */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h4 className="font-bold text-[#1A1A1A] text-sm">Marketing</h4>
                    <p className="text-xs text-[#2D2D2D] mt-1">Erlaubt es uns, personalisierte Werbung basierend auf deinen Interessen anzuzeigen.</p>
                  </div>
                  <button 
                    onClick={() => setPreferences(p => ({ ...p, marketing: !p.marketing }))}
                    className={`w-10 h-6 rounded-full flex items-center px-1 shrink-0 transition-colors ${preferences.marketing ? 'bg-[#C41E3A]' : 'bg-[#E8D5C4]'}`}
                  >
                    <div className={`w-4 h-4 bg-white rounded-full transition-transform ${preferences.marketing ? 'translate-x-4' : 'translate-x-0'}`} />
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button 
                  onClick={() => setShowSettings(false)}
                  className="w-full py-3 text-sm font-bold text-[#1A1A1A]/60 hover:text-[#1A1A1A] transition-colors"
                >
                  Zurück
                </button>
                <PrimaryCTA onClick={() => handleConsent('save')} className="py-3 w-full justify-center text-sm" showArrow={false}>
                  Einstellungen speichern
                </PrimaryCTA>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
