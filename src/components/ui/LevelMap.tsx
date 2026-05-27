"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from "framer-motion";
import * as Icons from "lucide-react";

export const LevelMap = ({ sections }: { sections: { id: string; label: string }[] }) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { damping: 20, stiffness: 100 });
  const avatarY = useTransform(smooth, [0, 1], ['0%', '100%']);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter(e => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          const idx = sections.findIndex(s => s.id === visible[0].target.id);
          if (idx >= 0) setActiveIdx(idx);
        }
      },
      { threshold: [0.3, 0.5, 0.7] }
    );
    sections.forEach(s => {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [sections]);

  const goTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div
      style={{
        position: 'fixed', right: 24, top: '50%', transform: 'translateY(-50%)',
        zIndex: 50, height: 380, display: 'flex',
      }}
      className="hidden md:flex"
      aria-label="Seitennavigation"
    >
      <div style={{ position: 'relative', width: 36, height: '100%' }}>
        {/* Dashed Track */}
        <div style={{
          position: 'absolute', left: '50%', top: 0, bottom: 0,
          width: 2, marginLeft: -1,
          background: 'repeating-linear-gradient(to bottom, #E8D5C4 0, #E8D5C4 6px, transparent 6px, transparent 12px)',
        }}/>

        {/* Avatar */}
        <motion.div
          style={{
            position: 'absolute', left: '50%', top: reduced ? `${sections.length > 1 ? (activeIdx / (sections.length - 1)) * 100 : 50}%` : avatarY,
            translateX: '-50%', translateY: '-50%',
            width: 28, height: 28, borderRadius: '50%',
            background: '#C41E3A',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 6px 16px rgba(196,30,58,0.45)',
            zIndex: 2,
          }}
          animate={reduced ? {} : { scale: [1, 1.2, 1] }}
          key={activeIdx}
          transition={{ duration: 0.3 }}
        >
          <Icons.Coffee size={14} color="#fff" strokeWidth={2}/>
        </motion.div>

        {/* Checkpoints */}
        {sections.map((s, i) => {
          const active = i === activeIdx;
          const topPct = sections.length === 1 ? 50 : (i / (sections.length - 1)) * 100;
          return (
            <div key={s.id}
              style={{
                position: 'absolute', left: '50%', top: `${topPct}%`,
                transform: 'translate(-50%, -50%)', zIndex: 3,
              }}
            >
              <button
                onClick={() => goTo(s.id)}
                aria-label={s.label}
                style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
              >
                <motion.div
                  animate={{
                    scale: active ? 1.4 : 1,
                    backgroundColor: active ? '#C41E3A' : '#F2E8E0',
                  }}
                  transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 400, damping: 18 }}
                  style={{
                    width: 14, height: 14, borderRadius: '50%',
                    border: '2px solid #C41E3A', position: 'relative',
                  }}
                >
                  {active && !reduced && (
                    <motion.div
                      initial={{ scale: 1, opacity: 0.7 }}
                      animate={{ scale: 2.5, opacity: 0 }}
                      transition={{ duration: 0.9, repeat: Infinity }}
                      style={{
                        position: 'absolute', inset: -3, borderRadius: '50%',
                        border: '2px solid #C41E3A',
                      }}
                    />
                  )}
                </motion.div>
              </button>

              {/* Label */}
              <AnimatePresence>
                {active && (
                  <motion.div
                    key="lbl"
                    initial={reduced ? { opacity: 0 } : { opacity: 0, x: 10 }}
                    animate={reduced ? { opacity: 1 } : { opacity: 1, x: -10 }}
                    exit={reduced ? { opacity: 0 } : { opacity: 0, x: 10 }}
                    transition={{ duration: 0.25 }}
                    style={{
                      position: 'absolute', right: 26, top: '50%', transform: 'translateY(-50%)',
                      fontFamily: 'var(--font-nunito), sans-serif', fontWeight: 800, fontSize: '0.78rem',
                      color: '#C41E3A', whiteSpace: 'nowrap',
                      background: '#FAF8F5', padding: '4px 12px', borderRadius: 50,
                      boxShadow: '0 4px 14px rgba(26,26,26,0.10)',
                    }}
                  >
                    {s.label}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
};
