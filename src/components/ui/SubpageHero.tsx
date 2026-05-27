'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { WaveDivider } from '@/components/atoms/WaveDivider';
import { EyebrowPill } from '@/components/atoms/EyebrowPill';

interface SubpageHeroProps {
  label: string;
  title: string;
  subtitle: string;
}

export function SubpageHero({ label, title, subtitle }: SubpageHeroProps) {
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
  };

  return (
    <section className="relative w-full pt-32 pb-24 md:pt-40 md:pb-32 bg-[#FAF8F5] overflow-hidden flex flex-col items-center justify-center text-center px-6">
      {/* Background Grid & Glow */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none opacity-40">
        <div 
          className="absolute inset-0 bg-gradient-to-b from-[#C41E3A]/5 to-transparent"
          style={{
            backgroundImage: `linear-gradient(rgba(196, 30, 58, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(196, 30, 58, 0.05) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
            maskImage: 'radial-gradient(ellipse at top, black, transparent 70%)',
            WebkitMaskImage: 'radial-gradient(ellipse at top, black, transparent 70%)'
          }}
        />
        <div className="absolute top-0 w-full h-[500px] bg-[#C41E3A]/5 blur-[100px] rounded-full" />
      </div>

      {/* Content */}
      <motion.div 
        variants={prefersReducedMotion ? undefined : containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-3xl mx-auto flex flex-col items-center"
      >
        <motion.div variants={itemVariants} className="mb-6">
          <EyebrowPill label={label} statusColor="bg-[#C41E3A]" />
        </motion.div>

        <motion.h1 
          variants={itemVariants} 
          className="font-calistoga text-4xl md:text-5xl lg:text-6xl text-[#1A1A1A] leading-[1.1] mb-6"
        >
          {title}
        </motion.h1>

        <motion.p 
          variants={itemVariants} 
          className="font-nunito text-[#2D2D2D] text-lg md:text-xl leading-relaxed max-w-2xl"
        >
          {subtitle}
        </motion.p>
      </motion.div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 w-full translate-y-[1px]">
        <WaveDivider variant="long-curve" className="w-full h-12 md:h-20 text-white" />
      </div>
    </section>
  );
}
