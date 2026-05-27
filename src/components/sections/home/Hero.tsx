'use client';

import React, { useRef } from 'react';
import { motion, useReducedMotion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { TransitionLink } from '@/components/ui/TransitionLink';
import { EyebrowPill } from '@/components/atoms/EyebrowPill';
import { RatingPill } from '@/components/atoms/RatingPill';
import { PrimaryCTA, SecondaryCTA } from '@/components/atoms/buttons';
import { WaveDivider } from '@/components/atoms/WaveDivider';
import { Box, Layers, Zap } from 'lucide-react';
import dynamic from 'next/dynamic';

const PhysicsHero = dynamic(() => import('@/components/sections/home/PhysicsHero'), { ssr: false });

export function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Mouse position tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for mouse
  const springConfig = { damping: 25, stiffness: 150 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current && !prefersReducedMotion) {
      const rect = containerRef.current.getBoundingClientRect();
      // Normalize from -0.5 to 0.5
      mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
      mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    }
  };

  // Parallax transforms based on mouse
  const gridRotateX = useTransform(smoothMouseY, [-0.5, 0.5], [15, -15]);
  const gridRotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-15, 15]);
  const floatX1 = useTransform(smoothMouseX, [-0.5, 0.5], [-30, 30]);
  const floatY1 = useTransform(smoothMouseY, [-0.5, 0.5], [-30, 30]);
  const floatX2 = useTransform(smoothMouseX, [-0.5, 0.5], [40, -40]);
  const floatY2 = useTransform(smoothMouseY, [-0.5, 0.5], [40, -40]);

  // Ambient Glow gradient follows mouse
  const glowX = useTransform(smoothMouseX, [-0.5, 0.5], ["0%", "100%"]);
  const glowY = useTransform(smoothMouseY, [-0.5, 0.5], ["0%", "100%"]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring" as const, stiffness: 300, damping: 24 }
    }
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-[100svh] flex items-center bg-[#FAF8F5] pt-28 pb-32 overflow-hidden"
    >
      {/* Dynamic Glow */}
      <motion.div 
        className="absolute inset-0 z-0 pointer-events-none opacity-50"
        style={prefersReducedMotion ? {} : {
          background: useTransform(
            [glowX, glowY],
            ([x, y]) => `radial-gradient(circle at ${x} ${y}, rgba(196, 30, 58, 0.12) 0%, transparent 60%)`
          )
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left: Content Stack */}
          <motion.div 
            variants={prefersReducedMotion ? undefined : containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-start max-w-2xl relative z-20"
          >
            <motion.div variants={itemVariants} className="mb-6">
              <EyebrowPill label="CUSTOM 3D DRUCK · WETZLAR" statusColor="bg-[#C41E3A]" />
            </motion.div>

            {/* Explicit dark colors for perfect contrast against #FAF8F5 background */}
            <motion.h1 variants={itemVariants} className="font-calistoga text-5xl md:text-6xl lg:text-7xl text-[#1A1A1A] leading-[1.1] mb-6">
              Präzision trifft<br />
              <span className="text-[#C41E3A]">Kreativität.</span>
            </motion.h1>

            <motion.p variants={itemVariants} className="font-bold text-[#2D2D2D] text-lg md:text-xl leading-relaxed mb-10 max-w-lg">
              Individuelle 3D-Drucke, maßgeschneiderte Prototypen und kreative Lösungen — alles aus einer Hand. Dein Partner für Custom 3D Druck.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 mb-12">
              <TransitionLink href="/menu" tabIndex={-1}>
                <PrimaryCTA className="py-3 px-8 text-lg shadow-[0_4px_14px_rgba(196,30,58,0.25)]" showArrow>
                  Produkte entdecken
                </PrimaryCTA>
              </TransitionLink>
              <TransitionLink href="/visit" tabIndex={-1}>
                <SecondaryCTA className="py-3 px-8 text-lg bg-white/50 backdrop-blur-sm border-[#C41E3A] text-[#C41E3A] hover:bg-[#C41E3A] hover:text-white hover:border-[#C41E3A]">
                  Kontakt aufnehmen
                </SecondaryCTA>
              </TransitionLink>
            </motion.div>

            <motion.div variants={itemVariants}>
              <RatingPill score={4.8} reviewCount={84} />
            </motion.div>
          </motion.div>

          {/* Right: Interactive Physics Mini-Game */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="hidden lg:flex justify-center items-center relative h-[600px] w-full"
            style={{ perspective: 1000 }}
          >
            {/* The Floating Grid Background */}
            <motion.div 
              style={prefersReducedMotion ? {} : { rotateX: gridRotateX, rotateY: gridRotateY }}
              className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none"
            >
              <div 
                className="w-[800px] h-[800px] rounded-full border border-[#C41E3A]/5 bg-gradient-to-tr from-[#C41E3A]/5 to-transparent"
                style={{
                  backgroundImage: `linear-gradient(rgba(196, 30, 58, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(196, 30, 58, 0.05) 1px, transparent 1px)`,
                  backgroundSize: '40px 40px'
                }}
              />
            </motion.div>

            <PhysicsHero />

          </motion.div>

        </div>
      </div>

      {/* Bottom Wave to next section */}
      <div className="absolute bottom-0 left-0 w-full translate-y-[1px]">
        <WaveDivider variant="long-curve" className="w-full h-12 md:h-16 lg:h-24 text-[#F2E8E0]" />
      </div>
    </section>
  );
}
