'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMenu } from '@/hooks/useMenu';
import { ProductCard, BoxCard, SkeletonCard } from '@/components/molecules/cards';
import { TransitionLink } from '@/components/ui/TransitionLink';
import { Cake } from 'lucide-react';
import { FloatingBlob } from '@/components/atoms/FloatingBlob';

interface ProductGridProps {
  activeCategory: string;
}

export function ProductGrid({ activeCategory }: ProductGridProps) {
  const { items, loading, error } = useMenu(activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 min-h-[60vh]">
      {/* Error State */}
      {error && (
        <div className="text-center text-red-500 font-bold p-12 bg-red-500/10 rounded-3xl">
          Fehler beim Laden der Produkte: {error.message}
        </div>
      )}

      {/* Loading State: 8 SkeletonCards */}
      {loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && items.length === 0 && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center text-center py-20 relative"
        >
          <FloatingBlob variant="organic3" color="peach" size={300} opacity={0.3} className="absolute z-0" />
          <div className="relative z-10">
            <span className="text-7xl mb-6 block">🧐</span>
            <h3 className="font-calistoga text-3xl text-charcoal mb-3">Nichts gefunden!</h3>
            <p className="font-bold text-charcoal/70">
              In dieser Kategorie gibt es aktuell keine Leckereien.<br />
              Schau doch mal in einer anderen vorbei!
            </p>
          </div>
        </motion.div>
      )}

      {/* Items Grid */}
      {!loading && !error && items.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {items.map((item, i) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 300, damping: 25, delay: i * 0.05 }}
              >
                {activeCategory === 'boxen' ? (
                  <BoxCard 
                    title={item.name} 
                    desc={item.desc} 
                    price={String(item.price)} 
                  />
                ) : (
                  <ProductCard>
                    <div className="flex flex-col h-full relative">
                      <h3 className="font-calistoga text-xl text-charcoal mb-2">{item.name}</h3>
                      <p className="text-sm text-charcoal/70 line-clamp-2 flex-grow mb-4">{item.desc}</p>
                      <div className="flex items-center justify-between mt-auto">
                        <span className="font-bold text-lg text-terracotta whitespace-nowrap">
                          {String(item.price)}
                        </span>
                      </div>
                    </div>
                  </ProductCard>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Vitrine Hint Card for Toppings or Kuchen/Cookies */}
      {!loading && !error && (activeCategory === 'kuchen' || activeCategory === 'cookies' || activeCategory === 'toppings') && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 bg-peach/30 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row gap-6 items-center border border-peach"
        >
          <div className="w-16 h-16 rounded-full bg-peach flex items-center justify-center shrink-0">
            <Cake className="w-8 h-8 text-terracotta" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <p className="font-bold text-charcoal leading-relaxed">
              Weitere individuelle Produkte und Materialien findest du bei uns im Studio!
            </p>
          </div>
          <TransitionLink href="/visit">
            <button className="bg-terracotta text-cream px-6 py-3 rounded-full font-bold whitespace-nowrap shadow-clay hover:bg-brown transition-colors">
              Besuchen
            </button>
          </TransitionLink>
        </motion.div>
      )}
    </div>
  );
}
