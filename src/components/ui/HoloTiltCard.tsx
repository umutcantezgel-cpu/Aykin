"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform, useSpring, useMotionTemplate } from "framer-motion";
import { Plus } from "lucide-react";
import * as Icons from "lucide-react";
import { useRouter } from "next/navigation";

export function HoloTiltCard({ item }: { item: any }) {
  const router = useRouter();
  
  const handleAction = () => {
    // If ticket, go to order-hub, else to menu
    if (item.ticket) {
      router.push('/order-hub');
    } else {
      router.push('/menu');
    }
  };
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springX = useSpring(mouseX, { stiffness: 400, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 400, damping: 30 });
  
  const rotateX = useTransform(springY, [-0.5, 0.5], [12, -12]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-12, 12]);
  
  const glareX = useTransform(springX, [-0.5, 0.5], [0, 100]);
  const glareY = useTransform(springY, [-0.5, 0.5], [0, 100]);
  const glareBg = useMotionTemplate`radial-gradient(farthest-corner circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0) 60%)`;

  const [isTouch, setIsTouch] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setIsTouch(window.matchMedia('(pointer: coarse)').matches);
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  const safeRotateX = reduced || isTouch ? 0 : rotateX;
  const safeRotateY = reduced || isTouch ? 0 : rotateY;

  const LIcon = (Icons as any)[item.icon] || Icons.Sparkles;

  const innerContent = (
    <>
      {item.tag && (
        <motion.div
          className="absolute z-10 top-3 right-3 font-sans font-black text-[10px] px-3 py-1 rounded-full uppercase tracking-wider"
          style={{ 
            transform: 'translateZ(40px)',
            background: '#C41E3A',
            color: '#fefefe',
          }}
        >
          {item.tag}
        </motion.div>
      )}

      <motion.div
        className="w-full aspect-[4/3] rounded-[16px] mb-4 flex items-center justify-center overflow-hidden relative"
        style={{ 
          transform: 'translateZ(60px)',
          background: 'linear-gradient(135deg, #E8D5C4 0%, #F2E8E0 50%, #FAF8F5 100%)',
        }}
      >
        {/* Decorative circles */}
        <div className="absolute top-3 left-3 w-16 h-16 rounded-full opacity-20" style={{ background: '#C41E3A' }} />
        <div className="absolute bottom-2 right-4 w-10 h-10 rounded-full opacity-15" style={{ background: '#C41E3A' }} />
        <LIcon size={64} strokeWidth={1.2} color="#C41E3A" style={{ opacity: 0.85 }} />
      </motion.div>

      <motion.div style={{ transform: 'translateZ(30px)' }}>
        <h3 className="font-calistoga text-[1.1rem] text-[#1A1A1A] leading-tight mb-1">{item.name}</h3>
        <p className="font-nunito text-sm text-[#4A4A4A] leading-relaxed mb-4">{item.desc}</p>
        
        <div className="flex justify-between items-center mt-auto">
          <span className="font-calistoga text-xl text-[#C41E3A]">{item.price}</span>
          <button
            onClick={() => router.push('/menu')}
            aria-label={`${item.name} ansehen`}
            className="w-9 h-9 rounded-full flex items-center justify-center transition-transform hover:scale-110 active:scale-95"
            style={{ background: '#C41E3A', boxShadow: '0 2px 8px rgba(196,30,58,0.25)' }}
          >
            <Plus size={18} color="#fefefe" strokeWidth={2.5} />
          </button>
        </div>
      </motion.div>

      {!isTouch && (
        <motion.div
          aria-hidden
          className="absolute inset-0 rounded-card pointer-events-none z-10"
          style={{
            background: glareBg,
            mixBlendMode: 'overlay',
          }}
        />
      )}
    </>
  );

  const containerStyle: React.CSSProperties = {
    position: 'relative',
    background: '#FAF8F5',
    borderRadius: 22,
    padding: 20,
    overflow: 'hidden',
    boxShadow: '0 2px 8px 0 rgba(196, 30, 58, 0.08)',
    cursor: 'pointer',
  };

  // Wir nutzen den BitemarkMask nur beim Hover für den Juicy-UI-Effekt
  const hoverProps = {
    whileHover: { 
      y: -3,
      boxShadow: "0 8px 24px 0 rgba(196, 30, 58, 0.12)",
    },
    transition: { type: 'spring' as const, stiffness: 300, damping: 20 }
  };

  return (
    <div style={{ perspective: 1200 }}>
      {isTouch ? (
        <motion.div
          whileTap={{ scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className="holo-tilt-touch"
          style={containerStyle}
        >
          {innerContent}
          {/* Inject touch glow keyframe */}
          <style dangerouslySetInnerHTML={{ __html: `
            .holo-tilt-touch:active {
              animation: holoTouchGlow 0.6s ease-out;
            }
            @keyframes holoTouchGlow {
              0% { box-shadow: 0 2px 8px 0 rgba(196, 30, 58, 0.08); }
              40% { box-shadow: 0 4px 20px 4px rgba(196, 30, 58, 0.28); }
              100% { box-shadow: 0 2px 8px 0 rgba(196, 30, 58, 0.08); }
            }
          `}} />
        </motion.div>
      ) : (
        <motion.div
          onPointerMove={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            mouseX.set((e.clientX - r.left) / r.width - 0.5);
            mouseY.set((e.clientY - r.top) / r.height - 0.5);
          }}
          onPointerLeave={() => { mouseX.set(0); mouseY.set(0); }}
          {...hoverProps}
          style={{
            ...containerStyle,
            transformStyle: 'preserve-3d',
            rotateX: safeRotateX, 
            rotateY: safeRotateY,
          }}
        >
          {innerContent}
        </motion.div>
      )}
    </div>
  );
}
