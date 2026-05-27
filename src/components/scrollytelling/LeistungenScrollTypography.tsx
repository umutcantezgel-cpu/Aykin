'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export function LeistungenScrollTypography() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  const textScale = useTransform(scrollYProgress, [0, 0.5], [1, 5]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.4, 0.6], [1, 0, 0]);
  
  const ring1Scale = useTransform(scrollYProgress, [0.4, 0.7], [0.5, 1]);
  const ring1Opacity = useTransform(scrollYProgress, [0.4, 0.5, 0.8], [0, 1, 1]);
  
  const ring2Scale = useTransform(scrollYProgress, [0.5, 0.8], [0.5, 1.2]);
  const ring2Opacity = useTransform(scrollYProgress, [0.5, 0.6, 0.9], [0, 1, 1]);

  return (
    <div ref={containerRef} className="h-[300vh] w-full relative bg-white">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        
        <motion.div 
          style={{ scale: textScale, opacity: textOpacity }}
          className="absolute z-10 flex flex-col items-center text-center"
        >
          <h2 className="text-[10vw] font-calistoga text-[#1A1A1A] leading-none tracking-tighter">
            MASSIVE
          </h2>
          <h2 className="text-[10vw] font-calistoga text-[#C41E3A] leading-none tracking-tighter">
            PRÄZISION
          </h2>
        </motion.div>

        {/* Animated Stat Rings */}
        <motion.div 
          style={{ scale: ring1Scale, opacity: ring1Opacity }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="w-[60vw] h-[60vw] md:w-[40vw] md:h-[40vw] rounded-full border-[1px] border-[#C41E3A]/30 flex items-center justify-center relative">
            <div className="absolute top-10 text-center">
              <span className="block text-4xl md:text-6xl font-bold text-[#C41E3A]">100%</span>
              <span className="text-sm md:text-lg text-[#2D2D2D] uppercase tracking-widest">Qualität</span>
            </div>
            
            <motion.div 
              style={{ scale: ring2Scale, opacity: ring2Opacity }}
              className="w-[40vw] h-[40vw] md:w-[25vw] md:h-[25vw] rounded-full border-[2px] border-[#C41E3A]/50 flex items-center justify-center"
            >
              <div className="text-center mt-auto mb-10">
                <span className="block text-3xl md:text-5xl font-bold text-[#1A1A1A]">24/7</span>
                <span className="text-xs md:text-sm text-[#2D2D2D] uppercase tracking-widest">Fertigung</span>
              </div>
            </motion.div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
