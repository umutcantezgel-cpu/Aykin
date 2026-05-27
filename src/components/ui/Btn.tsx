"use client";

import React, { useState, useEffect } from "react";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { motion, AnimatePresence } from "framer-motion";
import * as Icons from "lucide-react";

const PARTICLE_COLORS = ['#C41E3A', '#E8D5C4', '#F2E8E0', '#fefefe'];
const PARTICLE_ICONS  = ['dot', 'sparkle', 'star'];

function makeBurst(originX: number, originY: number) {
  const id = Date.now() + Math.random();
  const particles = Array.from({ length: 14 }, (_, i) => ({
    id: `${id}-${i}`,
    angle: Math.random() * Math.PI * 2,
    distance: 40 + Math.random() * 60,
    size: 4 + Math.random() * 10,
    rotation: (Math.random() - 0.5) * 540,
    color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
    type: PARTICLE_ICONS[Math.floor(Math.random() * PARTICLE_ICONS.length)],
  }));
  return { id, originX, originY, particles };
}

export function PrimaryButton({ 
  children, 
  onClick, 
  href,
  large = false, 
  sectionBg = '#FAF8F5', 
  className = '',
  disabled = false
}: {
  children: React.ReactNode;
  onClick?: (e?: any) => void;
  href?: string;
  large?: boolean;
  sectionBg?: string;
  className?: string;
  disabled?: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const [bursts, setBursts] = useState<any[]>([]);

  useEffect(() => {
    if (bursts.length === 0) return;
    const timers = bursts.map(b => setTimeout(() => setBursts(prev => prev.filter(x => x.id !== b.id)), 800));
    return () => timers.forEach(clearTimeout);
  }, [bursts]);

  const handleClick = (e: any) => {
    if (disabled) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ox = (e.clientX ?? rect.left + rect.width / 2) - rect.left;
    const oy = (e.clientY ?? rect.top + rect.height / 2) - rect.top;
    setBursts(b => [...b, makeBurst(ox, oy)]);
    if (onClick) onClick(e);
  };

  const inner = (
    <motion.button
      onClick={!href ? handleClick : undefined}
      disabled={disabled}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={disabled ? {} : { scale: 1.05 }}
      whileTap={disabled ? {} : { scale: 0.92, scaleX: 1.06, scaleY: 0.84 }}
      transition={{ type: 'spring', stiffness: 600, damping: 15, mass: 1 }}
      className={`relative inline-flex items-center justify-center font-nunito font-extrabold text-white bg-[#C41E3A] border-none rounded-full overflow-visible ${
        large ? 'px-9 py-[15px] text-[0.96rem]' : 'px-[26px] py-[11px] text-[0.88rem]'
      } ${disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'} ${className}`}
      style={{
        boxShadow: hovered && !disabled ? '0 8px 28px rgba(196,30,58,0.34)' : '0 3px 12px rgba(196,30,58,0.18)',
      }}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>

      {/* Bissspur */}
      <span
        aria-hidden
        className="absolute z-0 w-[18px] h-[18px] rounded-full bottom-[-1px] left-[14px] pointer-events-none"
        style={{
          background: sectionBg,
          transform: hovered ? 'scale(1)' : 'scale(0)',
          transformOrigin: 'center bottom',
          transition: 'transform .25s cubic-bezier(0.34,1.56,0.64,1)',
        }}
      />

      {/* Particle burst overlay */}
      <span className="absolute inset-0 pointer-events-none overflow-visible z-20">
        <AnimatePresence>
          {bursts.map(burst => burst.particles.map((p: any) => (
            <motion.div
              key={p.id}
              initial={{ x: burst.originX, y: burst.originY, opacity: 1, scale: 0, rotate: 0 }}
              animate={{
                x: burst.originX + Math.cos(p.angle) * p.distance,
                y: burst.originY + Math.sin(p.angle) * p.distance - 20,
                opacity: [1, 1, 0], scale: [0, 1, 0.5], rotate: p.rotation,
              }}
              transition={{ duration: 0.65, ease: 'easeOut', times: [0, 0.3, 1] }}
              style={{
                position: 'absolute', top: 0, left: 0,
                width: p.size, height: p.size,
                borderRadius: p.type === 'dot' ? '50%' : 0,
                background: p.type === 'dot' ? p.color : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              {p.type === 'star' && <Icons.Star size={p.size} strokeWidth={0} color={p.color} fill={p.color} />}
              {p.type === 'sparkle' && <Icons.Sparkles size={p.size} strokeWidth={0} color={p.color} fill={p.color} />}
            </motion.div>
          )))}
        </AnimatePresence>
      </span>
    </motion.button>
  );

  return href ? (
    <div onClick={handleClick} className="inline-block" style={{ textDecoration: 'none' }}>
      <TransitionLink href={href} style={{ textDecoration: 'none' }} className="inline-block" tabIndex={-1}>
        {inner}
      </TransitionLink>
    </div>
  ) : inner;
}

export function SecondaryButton({ 
  children, 
  onClick, 
  href,
  className = '' 
}: {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
}) {
  const [hover, setHover] = useState(false);
  
  const inner = (
    <motion.button
      onClick={onClick}
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => setHover(false)}
      whileTap={{ scale: 0.94, scaleX: 1.04, scaleY: 0.88 }}
      transition={{ type: 'spring', stiffness: 600, damping: 15 }}
      className={`relative inline-flex items-center justify-center font-nunito font-extrabold rounded-full cursor-pointer whitespace-nowrap px-[25px] py-[10px] text-[0.88rem] ${className}`}
      style={{
        border: '2px solid #C41E3A',
        color: hover ? '#fff' : '#C41E3A',
        background: hover ? '#C41E3A' : 'transparent',
        transition: 'background .2s ease, color .2s ease',
      }}
    >
      {children}
    </motion.button>
  );

  return href ? (
    <TransitionLink href={href} style={{ textDecoration: 'none' }} className="inline-block">
      {inner}
    </TransitionLink>
  ) : inner;
}
