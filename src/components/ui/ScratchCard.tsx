"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export function ScratchCard({ children, frostingColor = '#F2E8E0' }: { children: React.ReactNode, frostingColor?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const drawingRef = useRef(false);
  const lastRef = useRef({ x: 0, y: 0 });
  const lastCheckRef = useRef(0);
  const [isRevealed, setRevealed] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const wasRevealed = sessionStorage.getItem('aykin_scratch_revealed') === 'true';
    if (wasRevealed) {
      setRevealed(true);
    }
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const setup = () => {
      const dpr = window.devicePixelRatio || 1;
      const r = container.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) return;
      canvas.width = r.width * dpr;
      canvas.height = r.height * dpr;
      canvas.style.width = r.width + 'px';
      canvas.style.height = r.height + 'px';
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (!ctx) return;
      ctx.scale(dpr, dpr);
      ctxRef.current = ctx;

      ctx.fillStyle = frostingColor;
      ctx.fillRect(0, 0, r.width, r.height);
      ctx.fillStyle = 'rgba(196,30,58,0.06)';
      for (let i = 0; i < 30; i++) {
        ctx.beginPath();
        ctx.arc(Math.random()*r.width, Math.random()*r.height, 10+Math.random()*30, 0, Math.PI*2);
        ctx.fill();
      }
      ctx.fillStyle = '#C41E3A';
      ctx.font = 'bold 22px Nunito, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('Rubbel mich frei! ✨', r.width/2, r.height/2 - 4);
      ctx.font = '600 12px Nunito, sans-serif';
      ctx.fillStyle = 'rgba(196,30,58,0.7)';
      ctx.fillText('Wische über das Ticket', r.width/2, r.height/2 + 22);
    };

    setup();
    const ro = new ResizeObserver(() => setup());
    ro.observe(container);
    return () => ro.disconnect();
  }, [frostingColor]);

  const getPos = (e: React.PointerEvent) => {
    const r = canvasRef.current!.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };

  const checkProgress = () => {
    const now = performance.now();
    if (now - lastCheckRef.current < 150) return;
    lastCheckRef.current = now;
    const c = canvasRef.current;
    const ctx = ctxRef.current;
    if (!c || !ctx) return;
    const img = ctx.getImageData(0, 0, c.width, c.height).data;
    let cleared = 0, total = 0;
    for (let i = 3; i < img.length; i += 32) {
      total++;
      if (img[i] === 0) cleared++;
    }
    if (cleared / total > 0.5 && !isRevealed) {
      setRevealed(true);
      sessionStorage.setItem('aykin_scratch_revealed', 'true');
      import('canvas-confetti').then(({ default: confetti }) => {
        confetti({
          particleCount: 150, spread: 80, origin: { y: 0.55 },
          colors: ['#C41E3A', '#E8D5C4', '#F2E8E0', '#fff8f1'],
          zIndex: 9999, shapes: ['circle', 'square'], scalar: 1.1,
        });
      });
      if (navigator.vibrate) navigator.vibrate([60, 30, 60]);
    }
  };

  const onDown = (e: React.PointerEvent) => {
    if (isRevealed) return;
    drawingRef.current = true;
    if (canvasRef.current && canvasRef.current.setPointerCapture) {
      canvasRef.current.setPointerCapture(e.pointerId);
    }
    lastRef.current = getPos(e);
  };
  
  const onMove = (e: React.PointerEvent) => {
    if (!drawingRef.current || isRevealed) return;
    const p = getPos(e);
    const ctx = ctxRef.current;
    if (!ctx) return;
    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineCap = 'round'; 
    ctx.lineJoin = 'round'; 
    ctx.lineWidth = 45;
    ctx.beginPath();
    ctx.moveTo(lastRef.current.x, lastRef.current.y);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
    lastRef.current = p;
    checkProgress();
  };
  
  const onUp = () => { 
    drawingRef.current = false; 
    if (!isRevealed) checkProgress(); 
  };

  const animateProps = isRevealed && !reduced ? {
    x: [-8, 8, -5, 5, 0], y: [-2, 2, -1, 1, 0],
    boxShadow: [
      '0px 0px 0px rgba(196,30,58,0)',
      '0px 0px 60px rgba(196,30,58,0.6)',
      '0px 8px 28px rgba(196,30,58,0.18)',
    ],
  } : {};

  return (
    <div ref={containerRef} style={{ position: 'relative', borderRadius: 22 }}>
      <motion.div
        animate={animateProps}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{ borderRadius: 22 }}
      >
        {children}
      </motion.div>

      <canvas
        ref={canvasRef}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerLeave={onUp}
        style={{
          position: 'absolute', inset: 0, zIndex: 10,
          touchAction: 'none', cursor: 'crosshair',
          opacity: isRevealed ? 0 : 1,
          pointerEvents: isRevealed ? 'none' : 'auto',
          transition: 'opacity .5s ease',
          borderRadius: 22,
        }}
      />
    </div>
  );
}
