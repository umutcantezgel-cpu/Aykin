'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export function FdmScrollDiagram() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center']
  });

  const nozzleY = useTransform(scrollYProgress, [0, 1], [-100, 400]);
  const nozzleX = useTransform(scrollYProgress, 
    [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1], 
    [-100, 100, -100, 100, -100, 100, -100, 100, -100, 100, -100]
  );
  
  const layerHeight = useTransform(scrollYProgress, [0, 1], [0, 500]);

  return (
    <div ref={containerRef} className="h-[200vh] relative w-full bg-white overflow-hidden py-24">
      <div className="sticky top-1/4 max-w-4xl mx-auto px-6 h-[60vh] flex flex-col md:flex-row items-center gap-16">
        
        <div className="flex-1 w-full relative h-[400px]">
          {/* Nozzle */}
          <motion.div 
            style={{ x: nozzleX, y: nozzleY }}
            className="absolute top-0 left-1/2 -ml-8 w-16 h-24 z-20"
          >
            {/* Hotend body */}
            <div className="w-16 h-16 bg-gray-300 rounded-t-lg border-2 border-gray-400 flex flex-col items-center">
              <div className="w-12 h-2 bg-red-500 mt-2 rounded-full" />
              <div className="w-12 h-2 bg-red-500 mt-1 rounded-full" />
              <div className="w-12 h-2 bg-red-500 mt-1 rounded-full" />
            </div>
            {/* Nozzle tip */}
            <div className="w-0 h-0 border-l-[16px] border-l-transparent border-r-[16px] border-r-transparent border-t-[32px] border-t-yellow-500 mx-auto" />
          </motion.div>

          {/* Extruded Material Base */}
          <div className="absolute top-[32px] left-1/2 -translate-x-1/2 w-48 h-[500px] bg-transparent overflow-hidden flex flex-col-reverse items-center justify-start border-b-8 border-gray-800">
            <motion.div 
              style={{ height: layerHeight }}
              className="w-full bg-[#C41E3A] origin-bottom rounded-t-md opacity-90 shadow-inner flex flex-col gap-1 p-1"
            >
              {/* Lines to simulate FDM layers */}
              {Array.from({length: 50}).map((_, i) => (
                <div key={i} className="h-2 w-full bg-black/10 rounded-sm" />
              ))}
            </motion.div>
          </div>
        </div>

        <div className="flex-1">
          <h2 className="font-calistoga text-5xl md:text-7xl text-[#1A1A1A] mb-6">Schicht für Schicht.</h2>
          <p className="text-xl text-[#2D2D2D] leading-relaxed">
            Beim FDM-Verfahren wird geschmolzener Kunststoff präzise durch eine heiße Düse aufgetragen. 
            So wachsen hochstabile Bauteile Ebene für Ebene heran. Beobachte, wie der Druckkopf wandert und das Modell aufbaut.
          </p>
        </div>

      </div>
    </div>
  );
}
