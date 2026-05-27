"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function SyrupCursor() {
  const [mounted, setMounted] = useState(false);
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('button, a, input, [role="button"]')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  if (!mounted) return null;

  return (
    <>
      <svg className="gooey-filter">
        <filter id="goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
          <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 25 -10" result="goo" />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>
      </svg>
      
      <div className="hidden md:block" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none', zIndex: 9999, filter: 'url(#goo)' }}>
        <motion.div
          animate={{
            x: mousePos.x - 12,
            y: mousePos.y - 12,
            scale: isHovering ? 1.5 : 1,
            backgroundColor: isHovering ? '#b5523d' : '#C41E3A',
          }}
          transition={{ type: "spring", stiffness: 400, damping: 28, mass: 0.5 }}
          style={{
            position: 'absolute',
            width: 24,
            height: 24,
            borderRadius: '50%',
            pointerEvents: 'none'
          }}
        />
        <motion.div
          animate={{
            x: mousePos.x - 8,
            y: mousePos.y - 8,
          }}
          transition={{ type: "spring", stiffness: 250, damping: 35, mass: 0.8 }}
          style={{
            position: 'absolute',
            width: 16,
            height: 16,
            borderRadius: '50%',
            backgroundColor: '#C41E3A',
            pointerEvents: 'none'
          }}
        />
      </div>
    </>
  );
}
