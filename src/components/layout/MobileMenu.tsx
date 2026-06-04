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

          <div className="relative z-10 flex flex-col gap-2 mt-4 items-center text-center">
            {links.map(({ id, href, label }) => {
              const active = pathname === href;
              return (
                <TransitionLink 
                  key={id} 
                  href={href} 
                  onClick={onClose}
                  className={`
                    w-full py-3 
                    font-calistoga text-4xl sm:text-5xl transition-all duration-300
                    ${active ? 'text-[#C41E3A] scale-105' : 'text-[#1A1A1A] hover:text-[#C41E3A] hover:scale-105 opacity-80 hover:opacity-100'}
                  `}
                >
                  {label}
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
