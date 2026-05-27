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
    { id: "kontakt", href: "/kontakt", label: "Standort & Kontakt" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -20 }}
          animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -20 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="fixed top-[88px] left-0 right-0 bottom-0 z-[890] bg-cream p-6 flex flex-col gap-3 overflow-hidden"
        >
          {/* Sparse Background Blob */}
          <FloatingBlob 
            variant="organic2" 
            color="peach" 
            opacity={0.3} 
            size={400} 
            className="-top-20 -right-20" 
          />

          <div className="relative z-10 flex flex-col gap-3 mt-4">
            {links.map(({ id, href, label }) => {
              const active = pathname === href;
              return (
                <TransitionLink 
                  key={id} 
                  href={href} 
                  onClick={onClose}
                  className={`
                    w-full flex items-center justify-between p-5 rounded-2xl
                    font-calistoga text-2xl transition-colors duration-200
                    ${active ? 'bg-sand text-terracotta' : 'bg-transparent text-charcoal hover:bg-sand/50'}
                  `}
                >
                  <span>{label}</span>
                  <ChevronRight className={`w-6 h-6 ${active ? 'text-terracotta' : 'text-brown'}`} />
                </TransitionLink>
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
