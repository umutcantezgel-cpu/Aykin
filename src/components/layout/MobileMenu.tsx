'use client';

import React from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { TransitionLink } from '@/components/ui/TransitionLink';
import { ChevronRight } from 'lucide-react';
import { FloatingBlob } from '@/components/atoms/FloatingBlob';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  pathname: string;
}

export function MobileMenu({ isOpen, onClose, pathname }: MobileMenuProps) {
  const prefersReducedMotion = useReducedMotion();

  const links = [
    { id: "produkte", href: "/produkte", label: "Produkte" },
    { id: "leistungen", href: "/leistungen", label: "Leistungen" },
    { id: "materialien", href: "/materialien", label: "Materialien" },
    { id: "showcase", href: "/showcase", label: "Showcase" },
    { id: "faq", href: "/faq", label: "FAQ" },
    { id: "ueber-uns", href: "/ueber-uns", label: "Über Uns" },
    { id: "support", href: "/support", label: "Support" },
    { id: "kontakt", href: "/kontakt", label: "Kontakt" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -20, filter: 'blur(10px)' }}
          animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -20, filter: 'blur(10px)' }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[890] bg-[#FAF8F5]/95 backdrop-blur-2xl pt-28 px-6 pb-6 flex flex-col overflow-y-auto"
        >
          {/* Sparse Background Blob */}
          <FloatingBlob 
            variant="organic2" 
            color="peach" 
            opacity={0.3} 
            size={400} 
            className="-top-20 -right-20 pointer-events-none" 
          />

          <div className="relative z-10 flex flex-col gap-3 mt-8 w-full max-w-md mx-auto mb-10">
            {links.map(({ id, href, label }, index) => {
              const active = pathname === href;
              return (
                <motion.div
                  key={id}
                  initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: -20 }}
                  animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
                  transition={{ delay: prefersReducedMotion ? 0 : index * 0.05 + 0.1, duration: 0.4 }}
                >
                  <TransitionLink 
                    href={href} 
                    onClick={onClose}
                    className={`
                      flex items-center justify-between w-full py-4 px-6 rounded-[24px]
                      font-calistoga text-2xl sm:text-3xl transition-all duration-300
                      ${active ? 'bg-[#C41E3A] text-white shadow-lg shadow-[#C41E3A]/20' : 'bg-white/60 text-[#1A1A1A] hover:bg-white hover:shadow-md hover:text-[#C41E3A] border border-[#E8D5C4]/60 backdrop-blur-sm'}
                    `}
                  >
                    <span>{label}</span>
                    {active ? <ChevronRight size={24} className="opacity-100" /> : <ChevronRight size={24} className="opacity-30" />}
                  </TransitionLink>
                </motion.div>
              );
            })}
          </div>

          <div className="relative z-10 mt-auto bg-sand rounded-2xl p-5 mb-4 border border-peach/50">
            <p className="font-bold text-sm text-charcoal mb-1">
              Mo – Fr 09:00–18:00
            </p>
            <p className="text-xs text-brown font-bold uppercase tracking-wider">
              Termine nach Vereinbarung
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
