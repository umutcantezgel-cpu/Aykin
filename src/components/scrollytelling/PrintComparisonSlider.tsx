'use client';

import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export function PrintComparisonSlider() {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const titleY = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const handleDrag = (e: any, info: any) => {
    // Info contains point relative to container if we set up properly, or just use input range
  };

  return (
    <div ref={containerRef} className="py-32 w-full bg-[#1A1A1A] text-white overflow-hidden relative">
      <motion.h2 style={{ y: titleY }} className="text-center font-calistoga text-5xl md:text-7xl mb-16 text-white relative z-10">
        FDM vs. SLA
      </motion.h2>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <p className="text-center text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
          Ziehe den Slider, um den drastischen Unterschied in der Oberflächenqualität und Auflösung zu sehen.
        </p>

        <div className="relative h-[60vh] w-full bg-gray-800 rounded-3xl overflow-hidden border border-gray-700 select-none">
          {/* SLA Side (Bottom layer) */}
          <div className="absolute inset-0 bg-[#0F0F0F] flex items-center justify-center p-8">
            <div className="w-full max-w-md">
              <h3 className="font-calistoga text-3xl text-white mb-4">SLA-Druck</h3>
              <p className="text-gray-400 mb-8">25 Mikrometer. Spiegelglatt. Perfekt für Details.</p>
              
              {/* SLA Visual representation - smooth gradient/lines */}
              <div className="h-64 w-full flex flex-col gap-[1px]">
                {Array.from({length: 100}).map((_, i) => (
                  <div key={i} className="h-[2px] bg-gradient-to-r from-blue-500/20 via-blue-400 to-blue-500/20 w-full rounded-full opacity-80" />
                ))}
              </div>
            </div>
          </div>

          {/* FDM Side (Top layer clipped by slider) */}
          <div 
            className="absolute inset-0 bg-[#1A1A1A] flex items-center justify-center p-8"
            style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
          >
            <div className="w-full max-w-md pr-12">
              <h3 className="font-calistoga text-3xl text-[#C41E3A] mb-4">FDM-Druck</h3>
              <p className="text-gray-400 mb-8">Sichtbare Schichten. Robust. Perfekt für Funktionsteile.</p>
              
              {/* FDM Visual representation - thick lines */}
              <div className="h-64 w-full flex flex-col gap-[6px]">
                {Array.from({length: 20}).map((_, i) => (
                  <div key={i} className="h-4 bg-[#C41E3A] w-full rounded-sm shadow-[0_2px_4px_rgba(0,0,0,0.5)]" />
                ))}
              </div>
            </div>
          </div>

          {/* Slider Handle */}
          <div 
            className="absolute top-0 bottom-0 w-2 bg-white cursor-ew-resize flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.5)]"
            style={{ left: `calc(${sliderPos}% - 4px)` }}
          >
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg absolute">
              <div className="flex gap-1">
                <div className="w-1 h-4 bg-gray-400 rounded-full" />
                <div className="w-1 h-4 bg-gray-400 rounded-full" />
              </div>
            </div>
            
            {/* Hidden range input for accessibility and easy dragging */}
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={sliderPos}
              onChange={(e) => setSliderPos(Number(e.target.value))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20 appearance-none transform -translate-x-1/2"
              style={{ width: '100vw' }}
            />
          </div>
        </div>
      </div>
      
      {/* Decorative background elements */}
      <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-[#C41E3A]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
    </div>
  );
}
