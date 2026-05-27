'use client';

import React from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { TransitionLink } from '@/components/ui/TransitionLink';
import { FloatingBlob } from '@/components/atoms/FloatingBlob';
import { EyebrowPill } from '@/components/atoms/EyebrowPill';
import { RatingPill } from '@/components/atoms/RatingPill';
import { PrimaryCTA, SecondaryCTA } from '@/components/atoms/buttons';
import { ScallopBadge } from '@/components/atoms/ScallopBadge';
import { StampBadge } from '@/components/atoms/StampBadge';
import { WaveDivider } from '@/components/atoms/WaveDivider';

export function Hero() {
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
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
    <section className="relative w-full min-h-[100svh] flex items-center bg-peach pt-28 pb-32 overflow-hidden">
      {/* Dot Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(196, 30, 58, 0.15) 1px, transparent 0)', backgroundSize: '24px 24px' }}
      />

      {/* Decorative Background Blobs */}
      <FloatingBlob 
        variant="organic1" 
        color="cream" 
        size={360} 
        opacity={0.4} 
        className="-top-[10%] -right-[5%]" 
      />
      <FloatingBlob 
        variant="organic3" 
        color="terracotta" 
        size={220} 
        opacity={0.12} 
        reverse 
        delay={1.5} 
        className="-bottom-[5%] -left-[5%]" 
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left: Content Stack */}
          <motion.div 
            variants={prefersReducedMotion ? undefined : containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-start max-w-2xl"
          >
            <motion.div variants={itemVariants} className="mb-6">
              <EyebrowPill label="CUSTOM 3D DRUCK · WETZLAR" statusColor="bg-terracotta" />
            </motion.div>

            <motion.h1 variants={itemVariants} className="font-calistoga text-5xl md:text-6xl lg:text-7xl text-charcoal leading-[1.1] mb-6">
              Präzision trifft<br />
              <span className="text-terracotta">Kreativität.</span>
            </motion.h1>

            <motion.p variants={itemVariants} className="font-bold text-charcoal/80 text-lg md:text-xl leading-relaxed mb-10 max-w-lg">
              Individuelle 3D-Drucke, maßgeschneiderte Prototypen und kreative Lösungen — alles aus einer Hand. Dein Partner für Custom 3D Druck.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 mb-12">
              <TransitionLink href="/menu" tabIndex={-1}>
                <PrimaryCTA className="py-3 px-8 text-lg" showArrow>
                  Produkte entdecken
                </PrimaryCTA>
              </TransitionLink>
              <TransitionLink href="/visit" tabIndex={-1}>
                <SecondaryCTA className="py-3 px-8 text-lg bg-cream/50 backdrop-blur-sm border-terracotta text-terracotta hover:bg-terracotta hover:text-cream hover:border-terracotta">
                  Kontakt aufnehmen
                </SecondaryCTA>
              </TransitionLink>
            </motion.div>

            <motion.div variants={itemVariants}>
              <RatingPill score={4.8} reviewCount={84} />
            </motion.div>
          </motion.div>

          {/* Right: Visual */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="hidden lg:flex justify-center items-center relative h-[600px] w-full"
          >
            {/* Large cream blob backing */}
            <FloatingBlob 
              variant="organic2" 
              color="cream" 
              size={500} 
              opacity={0.8} 
              className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" 
            />

            {/* Hero Image with priority and blurDataURL for LCP Optimization */}
            <div className="relative z-10 w-[420px] h-[520px] flex items-center justify-center animate-blob-float">
              <Image 
                src="https://images.unsplash.com/photo-1563805042-7684c8a9e9ce?q=80&w=800&auto=format&fit=crop" 
                alt="Aykin 3D Druck Produkt"
                width={420}
                height={520}
                priority
                className="rounded-3xl shadow-2xl object-cover"
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAYAAAB1WUOMAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
              />
            </div>

            {/* Floating Stamps */}
            <div className="absolute top-[15%] right-[10%] z-20 animate-blob-float" style={{ animationDelay: '1s' }}>
              <StampBadge label="PREMIUM QUALITÄT" size={100} rotate={12} variant="terracotta" />
            </div>
            <div className="absolute bottom-[20%] left-[5%] z-20 animate-blob-float-reverse" style={{ animationDelay: "1s" }}>
              <StampBadge label="MADE IN GERMANY" size={90} rotate={-15} variant="brown" />
            </div>
          </motion.div>

        </div>
      </div>

      {/* Bottom Wave to next section (bg-sand) */}
      <div className="absolute bottom-0 left-0 w-full translate-y-[1px]">
        <WaveDivider variant="long-curve" className="w-full h-12 md:h-16 lg:h-24 text-sand" />
      </div>
    </section>
  );
}
