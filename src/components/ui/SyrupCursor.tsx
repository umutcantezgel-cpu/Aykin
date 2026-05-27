'use client';

import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue, useReducedMotion } from 'framer-motion';

export function SyrupCursor() {
  const prefersReducedMotion = useReducedMotion();
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Main dot follows instantly, so we can just use the motion value directly
  // Or we can use a very fast spring
  const mainX = useSpring(cursorX, { stiffness: 1000, damping: 40 });
  const mainY = useSpring(cursorY, { stiffness: 1000, damping: 40 });

  // Trailer dot lags behind
  const trailerX = useSpring(cursorX, { stiffness: 150, damping: 18, mass: 0.5 });
  const trailerY = useSpring(cursorY, { stiffness: 150, damping: 18, mass: 0.5 });

  useEffect(() => {
    if (prefersReducedMotion) return;

    // Only activate cursor if we have a fine pointer (mouse)
    const mediaQuery = window.matchMedia('(pointer: fine) and (hover: hover)');
    if (!mediaQuery.matches) return;

    setIsVisible(true);

    const moveMouse = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      const isInteractive = 
        target.tagName.toLowerCase() === 'a' || 
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') !== null ||
        target.closest('button') !== null ||
        window.getComputedStyle(target).cursor === 'pointer';
      
      setIsHovering(isInteractive);
    };

    window.addEventListener('mousemove', moveMouse);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveMouse);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY, prefersReducedMotion]);

  if (prefersReducedMotion || !isVisible) return null;

  return (
    <>
      {/* SVG Goo Filter Def */}
      <svg className="hidden">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feColorMatrix 
              in="blur" 
              mode="matrix" 
              values="1 0 0 0 0  
                      0 1 0 0 0  
                      0 0 1 0 0  
                      0 0 0 25 -9" 
              result="goo" 
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      <div 
        className="fixed inset-0 pointer-events-none z-[9999] mix-blend-multiply hidden md:block"
        style={{ filter: 'url(#goo)' }}
      >
        {/* Main Dot */}
        <motion.div
          className="absolute top-0 left-0 bg-terracotta rounded-full"
          style={{
            x: mainX,
            y: mainY,
            width: 16,
            height: 16,
            translateX: '-50%',
            translateY: '-50%',
          }}
          animate={{
            scale: isHovering ? 1.5 : 1,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        />
        
        {/* Trailer Dot */}
        <motion.div
          className="absolute top-0 left-0 bg-terracotta/70 rounded-full"
          style={{
            x: trailerX,
            y: trailerY,
            width: 32,
            height: 32,
            translateX: '-50%',
            translateY: '-50%',
          }}
          animate={{
            scale: isHovering ? 1.5 : 1,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        />
      </div>
    </>
  );
}
