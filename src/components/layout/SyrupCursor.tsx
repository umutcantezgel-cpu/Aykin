import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const SyrupCursor: React.FC = () => {
  // Initial position off-screen
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // useSpring configuration for a soft, syrupy lag effect
  const springConfig = { damping: 25, stiffness: 120, mass: 0.8 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      // Position the top-left tip exactly at the cursor
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [cursorX, cursorY, isVisible]);

  return (
    <motion.div
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        position: 'fixed',
        top: 0,
        left: 0,
        width: '24px',
        height: '24px',
        backgroundColor: '#C41E3A',
        // Top-left is sharp (0), others are rounded to create a drop shape
        borderRadius: '0 50% 50% 50%',
        pointerEvents: 'none',
        zIndex: 9999,
        opacity: isVisible ? 0.85 : 0,
        boxShadow: '0 4px 12px rgba(196, 30, 58, 0.4)',
        // Slight scale and rotation adjustment to make it look dynamic
        transformOrigin: 'top left',
      }}
      animate={{
        scale: isVisible ? 1 : 0.5,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    />
  );
};
