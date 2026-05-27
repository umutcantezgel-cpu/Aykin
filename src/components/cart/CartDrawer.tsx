'use client';
import React, { useEffect } from "react";
import { useStore } from "@/store/useStore";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import * as Icons from "lucide-react";
import { PrimaryCTA, IconCirclePlus } from "@/components/atoms/buttons";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { EmptyCart } from "./EmptyCart";

export function CartDrawer() {
  const { cart, isCartOpen, closeCart, updateQuantity, removeFromCart } = useStore();
  const prefersReducedMotion = useReducedMotion();

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isCartOpen) closeCart();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isCartOpen, closeCart]);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-charcoal/40 backdrop-blur-md z-[1000]"
          />

          {/* Drawer */}
          <motion.div
            initial={prefersReducedMotion ? { x: "100%" } : { x: "100%", skewX: -5 }}
            animate={prefersReducedMotion ? { x: 0 } : { x: 0, skewX: 0 }}
            exit={prefersReducedMotion ? { x: "100%" } : { x: "100%", skewX: 5 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-cream z-[1001] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="px-6 py-5 flex items-center justify-between border-b border-sand">
              <div>
                <h2 className="font-calistoga text-2xl text-charcoal">Warenkorb</h2>
                <p className="font-bold text-sm text-brown mt-1">{cart.length} Artikel</p>
              </div>
              <button 
                onClick={closeCart}
                className="w-10 h-10 rounded-full bg-sand/50 flex items-center justify-center text-charcoal hover:bg-terracotta hover:text-cream transition-colors"
              >
                <Icons.X size={20} strokeWidth={2.5} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden p-6 overscroll-contain">
              {cart.length === 0 ? (
                <EmptyCart />
              ) : (
                <div className="flex flex-col gap-4">
                  <AnimatePresence initial={false}>
                    {cart.map((item, index) => (
                      <motion.div 
                        key={item.id}
                        initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: 50 }}
                        animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
                        transition={{ type: "spring", damping: 25, stiffness: 300, delay: index * 0.05 }}
                        className="relative"
                        // Swipe-to-delete per Item via Framer Drag
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.8}
                        onDragEnd={(_, info) => {
                          if (info.offset.x > 100 || info.offset.x < -100) {
                            removeFromCart(item.id);
                          }
                        }}
                      >
                        <div className="bg-white rounded-2xl p-4 flex gap-4 items-center shadow-sm border border-sand">
                          <div className="flex-1 min-w-0">
                            <div className="font-bold text-base text-charcoal mb-1 truncate">{item.name}</div>
                            <div className="text-sm text-terracotta font-bold mb-3">
                              {(item.price * item.quantity).toFixed(2).replace('.', ',')} €
                            </div>
                            
                            {/* Quantity control */}
                            <div className="flex items-center gap-3">
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity - 1)} 
                                className="w-8 h-8 rounded-full bg-cream flex items-center justify-center text-charcoal hover:bg-terracotta hover:text-cream transition-colors"
                              >
                                <Icons.Minus size={16} strokeWidth={2.5} />
                              </button>
                              <span className="w-4 text-center font-bold text-charcoal">{item.quantity}</span>
                              <IconCirclePlus onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-8" />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-6 bg-cream border-t border-sand shadow-[0_-10px_20px_rgba(0,0,0,0.03)] relative z-10">
                <div className="flex justify-between items-end mb-6">
                  <span className="font-bold text-brown">Gesamt</span>
                  <span className="font-calistoga text-3xl text-terracotta leading-none">
                    {total.toFixed(2).replace('.', ',')} €
                  </span>
                </div>

                <TransitionLink href="/checkout" onClick={closeCart} className="block w-full">
                  <PrimaryCTA className="w-full justify-center text-lg py-4" showArrow>
                    Weiter zur Kasse
                  </PrimaryCTA>
                </TransitionLink>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
