"use client";

import React, { useEffect, useRef, useState } from "react";

export function ScratchCard({ discountCode = "AYKIN10" }: { discountCode?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isScratched, setIsScratched] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  useEffect(() => {
    if (!isMounted || !canvasRef.current || isScratched) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Fill with scratchable cover
    ctx.fillStyle = "#E8D5C4";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add some pattern/text
    ctx.font = "bold 20px var(--font-nunito), sans-serif";
    ctx.fillStyle = "#b5523d";
    ctx.textAlign = "center";
    ctx.fillText("Rubbeln!", canvas.width / 2, canvas.height / 2 + 7);

    let isDrawing = false;

    const scratch = (x: number, y: number) => {
      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(x, y, 20, 0, Math.PI * 2);
      ctx.fill();

      // Check how much is cleared
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      let clearCount = 0;
      for (let i = 3; i < imageData.data.length; i += 4) {
        if (imageData.data[i] === 0) clearCount++;
      }
      const percentCleared = (clearCount / (canvas.width * canvas.height)) * 100;
      if (percentCleared > 40) {
        setIsScratched(true);
        canvas.style.opacity = "0";
        setTimeout(() => {
          if (canvasRef.current) canvasRef.current.style.display = "none";
        }, 300);
      }
    };

    const getPos = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      return { x: clientX - rect.left, y: clientY - rect.top };
    };

    const handleDown = (e: MouseEvent | TouchEvent) => {
      isDrawing = true;
      const { x, y } = getPos(e);
      scratch(x, y);
    };

    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (!isDrawing) return;
      e.preventDefault();
      const { x, y } = getPos(e);
      scratch(x, y);
    };

    const handleUp = () => {
      isDrawing = false;
    };

    canvas.addEventListener("mousedown", handleDown);
    canvas.addEventListener("mousemove", handleMove);
    canvas.addEventListener("mouseup", handleUp);
    canvas.addEventListener("mouseleave", handleUp);
    
    canvas.addEventListener("touchstart", handleDown, { passive: false });
    canvas.addEventListener("touchmove", handleMove, { passive: false });
    canvas.addEventListener("touchend", handleUp);

    return () => {
      canvas.removeEventListener("mousedown", handleDown);
      canvas.removeEventListener("mousemove", handleMove);
      canvas.removeEventListener("mouseup", handleUp);
      canvas.removeEventListener("mouseleave", handleUp);
      canvas.removeEventListener("touchstart", handleDown);
      canvas.removeEventListener("touchmove", handleMove);
      canvas.removeEventListener("touchend", handleUp);
    };
  }, [isMounted, isScratched]);

  if (!isMounted) return <div style={{ width: 250, height: 100, background: '#E8D5C4', borderRadius: 16 }} />;

  return (
    <div style={{ position: 'relative', width: 250, height: 100, borderRadius: 16, overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
      <div style={{ position: 'absolute', inset: 0, background: '#fefefe', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        <span style={{ fontFamily: 'var(--font-nunito), sans-serif', fontSize: '0.8rem', color: '#8A8A8A', fontWeight: 600 }}>Dein Code:</span>
        <span style={{ fontFamily: 'var(--font-calistoga), serif', fontSize: '1.4rem', color: '#C41E3A' }}>{discountCode}</span>
      </div>
      <canvas
        ref={canvasRef}
        width={250}
        height={100}
        style={{ position: 'absolute', inset: 0, cursor: 'crosshair', transition: 'opacity 0.3s ease' }}
      />
    </div>
  );
}
