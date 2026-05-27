'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-[#FAF8F5] z-50 flex flex-col items-center justify-center">
      
      {/* Pulsating Logo */}
      <motion.div 
        className="w-24 h-24 mb-8 bg-[#C41E3A] rounded-full flex items-center justify-center text-4xl shadow-clay"
        animate={{ 
          scale: [1, 1.1, 1],
          boxShadow: [
            "0 10px 25px -5px rgba(196, 30, 58, 0.4)",
            "0 20px 35px -5px rgba(196, 30, 58, 0.6)",
            "0 10px 25px -5px rgba(196, 30, 58, 0.4)"
          ]
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <span className="font-calistoga text-white">AY</span>
      </motion.div>

      {/* Stagger Dots */}
      <div className="flex gap-2">
        {[0, 1, 2].map((dot) => (
          <motion.div
            key={dot}
            className="w-3 h-3 bg-[#C41E3A] rounded-full"
            animate={{ 
              y: ["0%", "-50%", "0%"],
              opacity: [0.3, 1, 0.3]
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: dot * 0.15
            }}
          />
        ))}
      </div>
      
    </div>
  );
}
