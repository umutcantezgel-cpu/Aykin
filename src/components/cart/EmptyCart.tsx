import React from 'react';
import { motion } from 'framer-motion';
import { TransitionLink } from '@/components/ui/TransitionLink';
import { useStore } from '@/store/useStore';

export const EmptyCart = () => {
  const { closeCart } = useStore();
  
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="h-full flex flex-col items-center justify-center text-center px-4"
    >
      <div className="w-48 h-48 mb-8 relative">
        <svg viewBox="0 0 100 100" className="w-full h-full text-[#F2E8E0] fill-current">
          {/* A cute empty bag illustration */}
          <path d="M25,40 L75,40 L65,85 L35,85 Z" opacity="0.5" />
          <path d="M35,40 C35,20 65,20 65,40" stroke="currentColor" strokeWidth="4" fill="none" opacity="0.8" />
          <circle cx="40" cy="60" r="4" className="text-[#C41E3A] fill-current" />
          <circle cx="60" cy="60" r="4" className="text-[#C41E3A] fill-current" />
          <path d="M45,70 Q50,75 55,70" stroke="#C41E3A" strokeWidth="3" fill="none" strokeLinecap="round" />
        </svg>
      </div>
      
      <h3 className="font-calistoga text-3xl text-[#1A1A1A] mb-3">Gähnende Leere!</h3>
      <p className="font-nunito text-[#7a5a52] leading-relaxed mb-8 max-w-[250px]">
        Dein Warenkorb ist noch hungrig. Zeit für ein paar süße Waffeln!
      </p>
      
      <TransitionLink 
        href="/menu" 
        onClick={closeCart}
        className="bg-[#C41E3A] text-[#FAF8F5] px-8 py-4 rounded-full font-bold text-lg shadow-clay hover:bg-[#A01830] transition-colors"
      >
        Jetzt bestellen
      </TransitionLink>
    </motion.div>
  );
};
