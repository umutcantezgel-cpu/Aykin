import { motion, useScroll, useVelocity, useTransform, useSpring } from 'framer-motion';
import React from 'react';

interface SloshingWaveProps {
  fill?: string;
  className?: string;
}

export const SloshingWave: React.FC<SloshingWaveProps> = ({ 
  fill = "currentColor",
  className = "text-blue-500" // Default color, can be overridden via className or fill prop
}) => {
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  
  // Smooth out the velocity to avoid jittering
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 200
  });

  const path = useTransform(smoothVelocity, (velocity) => {
    // Clamp velocity to a reasonable range
    const v = Math.max(-3000, Math.min(3000, velocity));
    const nv = v / 3000; // Normalized between -1 and 1
    
    // Calculate amplitude (wave height) and skew (wave leaning)
    const amp = 15 + Math.abs(nv) * 45; 
    const skew = nv * 80; 
    
    const y = 50;
    
    // Construct a smooth cubic bezier wave
    return `
      M 0 ${y}
      C ${100 + skew} ${y - amp}, ${200 + skew} ${y - amp}, 300 ${y}
      C ${400 + skew} ${y + amp}, ${500 + skew} ${y + amp}, 600 ${y}
      C ${700 + skew} ${y - amp}, ${800 + skew} ${y - amp}, 900 ${y}
      C ${1000 + skew} ${y + amp}, ${1100 + skew} ${y + amp}, 1200 ${y}
      L 1200 120
      L 0 120
      Z
    `;
  });

  return (
    <div 
      className={`fixed bottom-0 left-0 w-full h-20 md:h-32 pointer-events-none z-50 ${className}`} 
      style={{ transform: 'translateY(2px)' }}
    >
      <motion.svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className="w-full h-full drop-shadow-md"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          d={path}
          fill={fill}
          transition={{ type: "spring", bounce: 0.2 }}
        />
      </motion.svg>
    </div>
  );
};
