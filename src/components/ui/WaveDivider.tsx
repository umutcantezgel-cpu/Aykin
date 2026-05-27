"use client";

import React, { useEffect, useState } from "react";
import { motion, useScroll, useVelocity, useSpring, useTransform, useMotionValue } from "framer-motion";

export function WaveDivider({ 
  fromColor, 
  toColor, 
  variant = 1, 
  flip = false 
}: { 
  fromColor: string; 
  toColor: string; 
  variant?: 1 | 2 | 3; 
  flip?: boolean; 
}) {
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smooth = useSpring(scrollVelocity, { damping: 12, stiffness: 80, mass: 0.5 });
  
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  const offset = useTransform(smooth, [-2000, 0, 2000], [-22, 0, 22]);
  const zeroOffset = useMotionValue(0);
  const activeOffset = reduced ? zeroOffset : offset;

  const d = useTransform(activeOffset, (o) => {
    const oo = flip ? -o : o;
    if (variant === 1) return `M0,${30+oo} C240,${56+oo*1.2} 480,${4-oo*0.8} 720,${30+oo} C960,${56+oo*1.2} 1200,${4-oo*0.8} 1440,${30+oo} L1440,60 L0,60 Z`;
    if (variant === 2) return `M0,${22+oo*1.4} C180,${52+oo} 360,${2-oo*0.6} 540,${26+oo} C720,${50+oo*0.9} 900,${8-oo*0.5} 1080,${34+oo} C1260,${56+oo*0.8} 1380,${24-oo*0.4} 1440,${30+oo} L1440,60 L0,60 Z`;
    return `M0,${38+oo} Q360,${8-oo*0.7} 720,${38+oo} Q1080,${68+oo*1.1} 1440,${38+oo} L1440,60 L0,60 Z`;
  });

  return (
    <div style={{ background: toColor, lineHeight: 0, overflow: 'hidden' }}>
      <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg"
        style={{ display: 'block', width: '100%', height: 44, transform: flip ? 'scaleY(-1)' : 'none' }}
        preserveAspectRatio="none">
        <motion.path d={d} fill={fromColor} />
      </svg>
    </div>
  );
}
