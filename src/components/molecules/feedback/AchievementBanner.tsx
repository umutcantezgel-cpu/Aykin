'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Trophy } from 'lucide-react';

export function AchievementBanner() {
  const [achievement, setAchievement] = useState<{ id: string, message: string } | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const handleAchievement = (e: Event) => {
      const customEvent = e as CustomEvent;
      const detail = customEvent.detail;
      const id = typeof detail === 'string' ? detail : detail?.id;
      const message = detail?.message || "Sweet Tooth! Du hast das Logo oft genug angetippt.";
      
      if (!id) return;

      // Check if already unlocked
      const unlocked = JSON.parse(localStorage.getItem('aykin_achievements') || '[]');
      if (unlocked.includes(id)) return;

      // Unlock and persist
      unlocked.push(id);
      localStorage.setItem('aykin_achievements', JSON.stringify(unlocked));

      setAchievement({ id, message });

      // Play sound fail-silent
      try {
        const audio = new Audio('/sounds/achievement.mp3');
        audio.volume = 0.5;
        audio.play().catch(() => {
          // Audio blocked by browser policy (autoplay restrictions) - fail silent
        });
      } catch (err) {
        // Ignore
      }

      // Auto dismiss after 5 seconds
      setTimeout(() => setAchievement(null), 5000);
    };

    window.addEventListener('achievementUnlocked', handleAchievement);
    return () => window.removeEventListener('achievementUnlocked', handleAchievement);
  }, []);

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[150] pointer-events-none w-full max-w-sm px-4">
      <AnimatePresence>
        {achievement && (
          <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -50, scale: 0.8, rotate: -2 }}
            animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1, rotate: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -20, scale: 0.9, rotate: 2 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="pointer-events-auto bg-gradient-to-r from-peach to-terracotta p-1 rounded-2xl shadow-clay"
          >
            <div className="bg-cream rounded-xl p-4 flex items-center gap-4 border-2 border-peach/50">
              <div className="flex-shrink-0 w-12 h-12 bg-peach rounded-full flex items-center justify-center text-terracotta">
                <Trophy className="w-6 h-6" />
              </div>
              <div className="flex-grow">
                <p className="text-xs font-bold text-terracotta uppercase tracking-wider mb-0.5">Achievement Unlocked</p>
                <p className="text-sm font-bold text-charcoal leading-tight">{achievement.message}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
