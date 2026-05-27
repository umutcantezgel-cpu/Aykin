import React from 'react';
import { motion } from 'framer-motion';

export const LoyaltyCoin: React.FC = () => {
  return (
    <motion.div
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '96px',
        height: '96px',
        borderRadius: '50%',
        cursor: 'pointer',
        background: 'linear-gradient(135deg, #FFF7D6 0%, #FFD700 25%, #E6A300 50%, #FDB931 75%, #FFF7D6 100%)',
        boxShadow: '0 0 20px rgba(255, 215, 0, 0.6), inset 0 0 10px rgba(255, 255, 255, 0.8), inset 0 0 25px rgba(218, 165, 32, 0.9)',
        border: '2px solid rgba(255, 255, 255, 0.6)',
        transformStyle: 'preserve-3d',
      }}
      animate={{
        rotateY: [0, 360],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: 'linear',
      }}
      whileHover={{
        scale: 1.15,
        boxShadow: '0 0 40px rgba(255, 215, 0, 0.9), inset 0 0 15px rgba(255, 255, 255, 1), inset 0 0 30px rgba(218, 165, 32, 1)',
        transition: { duration: 0.3 }
      }}
      whileTap={{ scale: 0.9 }}
    >
      {/* Inner ring */}
      <div 
        style={{
          position: 'absolute',
          top: '8px',
          left: '8px',
          right: '8px',
          bottom: '8px',
          borderRadius: '50%',
          border: '2px dashed rgba(184, 134, 11, 0.5)',
          transform: 'translateZ(10px)',
        }}
      />
      
      {/* Coin symbol/text */}
      <div
        style={{
          fontSize: '36px',
          fontWeight: 'bold',
          color: '#8B6508',
          textShadow: '1px 1px 0px rgba(255,255,255,0.5), -1px -1px 0px rgba(0,0,0,0.1)',
          transform: 'translateZ(20px)',
        }}
      >
        F
      </div>
      
      {/* Sparkle effect */}
      <motion.div
        style={{
          position: 'absolute',
          top: '15px',
          left: '20px',
          width: '8px',
          height: '8px',
          background: 'white',
          borderRadius: '50%',
          filter: 'blur(1px)',
          transform: 'translateZ(25px)',
        }}
        animate={{
          opacity: [0, 1, 0],
          scale: [0.5, 1.5, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.5
        }}
      />
    </motion.div>
  );
};

export default LoyaltyCoin;
