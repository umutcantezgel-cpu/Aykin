'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export function ModelingScrollSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  // Steps
  // 0.0 - 0.2: Sketch (lines)
  // 0.2 - 0.4: Wireframe
  // 0.4 - 0.6: Solid Object (Flat)
  // 0.6 - 1.0: Rendered (Gradient/Shiny)

  const sketchOpacity = useTransform(scrollYProgress, [0, 0.2, 0.3], [1, 1, 0]);
  const wireframeOpacity = useTransform(scrollYProgress, [0.2, 0.3, 0.5, 0.6], [0, 1, 1, 0]);
  const solidOpacity = useTransform(scrollYProgress, [0.5, 0.6, 0.8, 0.9], [0, 1, 1, 0]);
  const renderedOpacity = useTransform(scrollYProgress, [0.8, 0.9, 1], [0, 1, 1]);

  const rotation = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <div ref={containerRef} className="h-[400vh] w-full relative bg-[#FAF8F5]">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        
        <div className="text-center z-20 mb-12">
          <h2 className="font-calistoga text-4xl md:text-6xl text-[#1A1A1A]">Der Entstehungsprozess</h2>
          <p className="text-[#2D2D2D] mt-4 max-w-xl mx-auto">Scrolle, um zu sehen, wie aus einer einfachen Idee ein fertiges, hochauflösendes 3D-Modell wird.</p>
        </div>

        <div className="relative w-64 h-64 md:w-96 md:h-96 perspective-[1000px]">
          <motion.div 
            style={{ rotateY: rotation }}
            className="w-full h-full relative preserve-3d"
          >
            {/* Step 1: Sketch (SVG paths imitating hand-drawn) */}
            <motion.div 
              style={{ opacity: sketchOpacity }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <svg width="100%" height="100%" viewBox="0 0 100 100" className="stroke-[#2D2D2D] stroke-2 fill-transparent overflow-visible">
                <path d="M 20 50 Q 50 20 80 50 Q 50 80 20 50" strokeDasharray="5,5" />
                <path d="M 50 20 L 50 80" strokeDasharray="5,5" />
                <path d="M 20 50 L 80 50" strokeDasharray="5,5" />
              </svg>
            </motion.div>

            {/* Step 2: Wireframe */}
            <motion.div 
              style={{ opacity: wireframeOpacity }}
              className="absolute inset-0 flex items-center justify-center"
            >
               <svg width="100%" height="100%" viewBox="0 0 100 100" className="stroke-[#C41E3A] stroke-[0.5] fill-transparent overflow-visible">
                {Array.from({length: 10}).map((_, i) => (
                  <ellipse key={i} cx="50" cy="50" rx={40} ry={10 + i*3} />
                ))}
                {Array.from({length: 10}).map((_, i) => (
                  <ellipse key={i + 10} cx="50" cy="50" rx={10 + i*3} ry={40} />
                ))}
              </svg>
            </motion.div>

            {/* Step 3: Solid Flat */}
            <motion.div 
              style={{ opacity: solidOpacity }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="w-3/4 h-3/4 bg-gray-400 rounded-full shadow-inner border border-gray-500" />
            </motion.div>

            {/* Step 4: Rendered Shiny */}
            <motion.div 
              style={{ opacity: renderedOpacity }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="w-3/4 h-3/4 rounded-full shadow-[0_20px_50px_rgba(196,30,58,0.3)] bg-[radial-gradient(circle_at_30%_30%,#fff_0%,#C41E3A_30%,#4a0b16_100%)]" />
            </motion.div>

          </motion.div>
        </div>

      </div>
    </div>
  );
}
