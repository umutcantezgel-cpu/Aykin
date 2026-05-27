"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as CookieConsent from "vanilla-cookieconsent";
import { Cookie, Settings } from "lucide-react";

export default function CookieRevoke() {
  const [visible, setVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const check = () => setVisible(CookieConsent.validConsent());
    check();
    window.addEventListener("cc:onConsent", check);
    window.addEventListener("cc:onChange", check);

    // Show tooltip briefly after 3 seconds to hint the button exists
    const tooltipTimer = setTimeout(() => {
      if (CookieConsent.validConsent()) {
        setShowTooltip(true);
        setTimeout(() => setShowTooltip(false), 3000);
      }
    }, 5000);

    return () => {
      window.removeEventListener("cc:onConsent", check);
      window.removeEventListener("cc:onChange", check);
      clearTimeout(tooltipTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div style={{ position: "fixed", bottom: 20, left: 20, zIndex: 800 }}>
      {/* Tooltip */}
      <AnimatePresence>
        {(isHovered || showTooltip) && (
          <motion.div
            initial={{ opacity: 0, x: -8, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -8, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            style={{
              position: "absolute",
              bottom: "calc(100% + 10px)",
              left: 0,
              background: "rgba(26, 26, 26, 0.92)",
              backdropFilter: "blur(12px)",
              color: "#fefefe",
              padding: "8px 14px",
              borderRadius: 12,
              fontSize: "0.75rem",
              fontFamily: "var(--font-nunito), sans-serif",
              fontWeight: 700,
              whiteSpace: "nowrap",
              boxShadow: "0 8px 24px rgba(26,26,26,0.2)",
              pointerEvents: "none",
            }}
          >
            Cookie-Einstellungen
            <div style={{
              position: "absolute",
              bottom: -5,
              left: 16,
              width: 10,
              height: 10,
              background: "rgba(26, 26, 26, 0.92)",
              transform: "rotate(45deg)",
              borderRadius: 2,
            }} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pulse ring */}
      <motion.div
        animate={{
          scale: [1, 1.6, 1.6],
          opacity: [0.4, 0, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeOut",
        }}
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          border: "2px solid #C41E3A",
          pointerEvents: "none",
        }}
      />

      {/* Main button */}
      <motion.button
        initial={{ opacity: 0, scale: 0, rotate: -180 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 1.5 }}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.9 }}
        onHoverStart={() => { setIsHovered(true); setShowTooltip(false); }}
        onHoverEnd={() => setIsHovered(false)}
        onClick={() => CookieConsent.showPreferences()}
        aria-label="Cookie-Einstellungen öffnen"
        style={{
          position: "relative",
          width: 46,
          height: 46,
          borderRadius: "50%",
          border: "none",
          background: "rgba(250, 248, 245, 0.85)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: isHovered
            ? "0 8px 28px rgba(196,30,58,0.25), 0 0 0 1px rgba(232,213,196,0.5) inset"
            : "0 4px 16px rgba(26,26,26,0.1), 0 0 0 1px rgba(232,213,196,0.3) inset",
          transition: "box-shadow 0.3s ease",
        }}
      >
        <motion.div
          animate={{ rotate: isHovered ? 90 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {isHovered ? (
            <Settings size={20} color="#C41E3A" strokeWidth={2} />
          ) : (
            <Cookie size={20} color="#C41E3A" strokeWidth={2} />
          )}
        </motion.div>
      </motion.button>
    </div>
  );
}
