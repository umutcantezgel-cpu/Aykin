'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, HTMLMotionProps } from 'framer-motion';

// --- Particle Burst ---
interface Particle {
  id: number;
  x: number;
  y: number;
  angle: number;
  velocity: number;
  size: number;
}

function ParticleBurstEffect({ burstId }: { burstId: number }) {
  const [particles] = useState<Particle[]>(() => {
    return Array.from({ length: 8 }).map((_, i) => ({
      id: i,
      x: 0,
      y: 0,
      angle: (Math.PI * 2 * i) / 8 + (Math.random() - 0.5),
      velocity: 40 + Math.random() * 40,
      size: 4 + Math.random() * 4,
    }));
  });

  return (
    <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center">
      <AnimatePresence>
        {burstId > 0 &&
          particles.map((p) => (
            <motion.div
              key={`${burstId}-${p.id}`}
              initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
              animate={{
                x: Math.cos(p.angle) * p.velocity,
                y: Math.sin(p.angle) * p.velocity,
                scale: 0,
                opacity: 0,
              }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="absolute bg-terracotta rounded-full"
              style={{ width: p.size, height: p.size }}
            />
          ))}
      </AnimatePresence>
    </div>
  );
}

// --- Primary CTA ---
interface PrimaryButtonProps extends Omit<HTMLMotionProps<"button">, "onClick"> {
  large?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export function PrimaryButton({
  children,
  onClick,
  large = false,
  className = '',
  ...props
}: PrimaryButtonProps) {
  const [burstId, setBurstId] = useState(0);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setBurstId((prev) => prev + 1);
    if (onClick) onClick(e);
  };

  return (
    <div className={`relative inline-block ${className}`}>
      <ParticleBurstEffect burstId={burstId} />
      
      <motion.button
        onClick={handleClick}
        className={`
          relative z-10 flex items-center justify-center
          bg-terracotta text-cream-pure font-bold rounded-pill
          whitespace-nowrap cursor-pointer select-none
          shadow-clay-cta outline-none focus-visible:ring-4 focus-visible:ring-terracotta/50
          ${large ? 'h-[60px] px-9 text-lg' : 'h-[48px] px-7 text-base'}
        `}
        style={{
          // Apply bitemark mask when hovered
          maskImage: 'url(#bitemark-right)',
          WebkitMaskImage: 'url(#bitemark-right)',
          maskSize: '100% 100%',
          WebkitMaskSize: '100% 100%',
          maskPosition: 'center',
          WebkitMaskPosition: 'center',
          maskRepeat: 'no-repeat',
          WebkitMaskRepeat: 'no-repeat',
        }}
        whileHover={{
          scale: 1.02,
          backgroundColor: '#A01830', // terracotta-deep
          // Bitemark is static in the mask, but the scale gives it life
        }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        {...(props as any)}
      >
        {children}
      </motion.button>
    </div>
  );
}

// --- Secondary Button ---
interface SecondaryButtonProps extends Omit<HTMLMotionProps<"button">, "onClick"> {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export function SecondaryButton({ children, onClick, className = '', ...props }: SecondaryButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className={`
        border-2 border-terracotta text-terracotta font-bold rounded-pill
        whitespace-nowrap cursor-pointer select-none
        h-[48px] px-7 text-base outline-none focus-visible:ring-4 focus-visible:ring-terracotta/50
        ${className}
      `}
      whileHover={{
        backgroundColor: '#C41E3A',
        color: '#fefefe',
        scale: 1.02,
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      {...(props as any)}
    >
      {children}
    </motion.button>
  );
}
