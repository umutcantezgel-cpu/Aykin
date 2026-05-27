"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function AchievementBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [title, setTitle] = useState("Sweet Tooth Unlocked!");
  const [description, setDescription] = useState("Du hast das Easter Egg gefunden.");
  const [icon, setIcon] = useState("🏆");
  
  useEffect(() => {
    const handleAchievement = (e: Event) => {
      setIsVisible(true);
      const customEvent = e as CustomEvent;
      if (customEvent.detail) {
        if (customEvent.detail.title) setTitle(customEvent.detail.title);
        if (customEvent.detail.description) setDescription(customEvent.detail.description);
        if (customEvent.detail.icon) setIcon(customEvent.detail.icon);
      }
    };
    
    window.addEventListener('achievement-unlocked', handleAchievement);
    return () => window.removeEventListener('achievement-unlocked', handleAchievement);
  }, []);

  // Auto-close after duration
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  const onClose = () => setIsVisible(false);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: '-100%', x: '-50%', opacity: 0 }}
          animate={{ y: 0, x: '-50%', opacity: 1 }}
          exit={{ y: '-100%', x: '-50%', opacity: 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          style={{
            position: 'fixed',
            top: '24px',
            left: '50%',
            backgroundColor: '#2D2D2D', // Dark Bark
            color: '#fffdd0',           // Cream
            padding: '16px 24px',
            borderRadius: '16px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.3)',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            zIndex: 9999,
            minWidth: '320px',
            maxWidth: '90vw',
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          {icon && (
            <div style={{ flexShrink: 0, fontSize: '28px' }}>
              {icon}
            </div>
          )}
          
          <div style={{ flexGrow: 1 }}>
            <h4 style={{ margin: 0, fontSize: '16px', fontWeight: '700', letterSpacing: '0.02em' }}>
              {title}
            </h4>
            {description && (
              <p style={{ margin: '4px 0 0 0', fontSize: '14px', opacity: 0.85, lineHeight: 1.4 }}>
                {description}
              </p>
            )}
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#fffdd0',
              cursor: 'pointer',
              padding: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: 0.7,
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.7')}
            aria-label="Schließen"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
