'use client';

import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getCategoryIcon } from '@/components/atoms/icons/category-icons';

interface Category {
  id: string;
  label: string;
  icon: string;
}

interface MenuFilterProps {
  categories: Category[];
  activeCategory: string;
  onChange: (categoryId: string) => void;
}

export function MenuFilter({ categories, activeCategory, onChange }: MenuFilterProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Scroll active tab into view
  useEffect(() => {
    if (!scrollRef.current) return;
    const activeEl = scrollRef.current.querySelector('[data-active="true"]');
    if (activeEl) {
      activeEl.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' });
    }
  }, [activeCategory]);

  return (
    <div className="sticky top-[88px] z-[800] bg-sand/90 backdrop-blur-md shadow-sm border-b border-peach">
      <div className="max-w-7xl mx-auto px-6">
        <div 
          ref={scrollRef}
          className="flex gap-2 overflow-x-auto py-3 hide-scrollbar snap-x snap-mandatory"
        >
          {categories.map((c) => {
            const isActive = activeCategory === c.id;
            const Icon = getCategoryIcon(c.id);

            return (
              <button
                key={c.id}
                data-active={isActive}
                onClick={() => onChange(c.id)}
                className={`relative flex items-center gap-2 font-bold text-sm px-5 py-2.5 rounded-full whitespace-nowrap shrink-0 snap-start transition-colors duration-200 ${
                  isActive ? 'text-cream' : 'text-charcoal hover:bg-cream/50'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeMenuTab"
                    className="absolute inset-0 bg-terracotta rounded-full shadow-clay"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <Icon className="w-4 h-4" />
                  {c.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
