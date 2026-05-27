"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// SVG Paths for the "Drop" animation
const paths = {
  initial: "M 0 0 L 100 0 Q 50 0 0 0 Z",
  dropDown: "M 0 0 L 100 0 L 100 100 Q 50 150 0 100 Z",
  cover: "M 0 0 L 100 0 L 100 100 Q 50 100 0 100 Z",
  retractCurve: "M 0 0 L 100 0 L 100 0 Q 50 50 0 0 Z",
  done: "M 0 0 L 100 0 L 100 0 Q 50 0 0 0 Z"
};

export function SplashScreen() {
  const [showSplash, setShowSplash] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const hasShownSplash = sessionStorage.getItem("splash_shown");
    if (!hasShownSplash) {
      setShowSplash(true);
      sessionStorage.setItem("splash_shown", "true");

      // Hard fail-safe: always dismiss after 3 seconds
      const timer = setTimeout(() => {
        setShowSplash(false);
        window.dispatchEvent(new CustomEvent("splash:done"));
      }, 3000);
      return () => clearTimeout(timer);
    } else {
      // Splash already shown → notify immediately
      window.dispatchEvent(new CustomEvent("splash:done"));
    }
  }, []);

  if (!isMounted) return null;

  return (
    <AnimatePresence>
      {showSplash && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.3 } }}
          style={{
            position: 'fixed', inset: 0, zIndex: 99999,
            pointerEvents: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.76, 0, 0.24, 1] }}
            style={{
              position: 'absolute', zIndex: 10,
              display: 'flex', flexDirection: 'column', alignItems: 'center',
            }}
          >
            <h1 style={{
              fontFamily: 'var(--font-calistoga), serif',
              fontSize: 'clamp(2.5rem, 8vw, 3.5rem)',
              color: '#fffdd0',
              margin: 0,
            }}>Aykin</h1>
            <p style={{
              fontFamily: 'var(--font-nunito), sans-serif',
              color: '#fffdd0',
              fontWeight: 700,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              fontSize: '0.85rem',
              marginTop: 8,
            }}>Custom 3D Druck</p>
          </motion.div>

          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            style={{
              width: '100%', height: '100%', display: 'block',
              filter: 'drop-shadow(0 20px 30px rgba(196,30,58,0.3))',
            }}
          >
            <motion.path
              fill="#C41E3A"
              initial={{ d: paths.initial }}
              animate={{
                d: [paths.initial, paths.dropDown, paths.cover, paths.cover, paths.retractCurve, paths.done]
              }}
              transition={{
                duration: 2.0,
                times: [0, 0.2, 0.4, 0.7, 0.9, 1],
                ease: [0.76, 0, 0.24, 1]
              }}
              onAnimationComplete={() => {
                setShowSplash(false);
                window.dispatchEvent(new CustomEvent("splash:done"));
              }}
            />
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
