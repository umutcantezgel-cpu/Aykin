"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, animate, useAnimation } from "framer-motion";
import * as Icons from "lucide-react";
import { useStore } from "@/store/useStore";

const WAFFLE_INVENTORY = [
  { id: 'eis-vanille',  name: 'Vanille-Eis',     price: 1.50, icon: 'Droplets',  color: '#FAF8F5' },
  { id: 'eis-schoko',   name: 'Schoko-Eis',      price: 1.50, icon: 'Droplets',  color: '#4A4A4A' },
  { id: 'erdbeere',     name: 'Erdbeeren',       price: 1.20, icon: 'Heart',     color: '#C41E3A' },
  { id: 'banane',       name: 'Banane',          price: 0.80, icon: 'Sparkles',  color: '#E8D5C4' },
  { id: 'schokosauce',  name: 'Schoko-Soße',     price: 0.80, icon: 'Droplets',  color: '#2D2D2D' },
  { id: 'nutella',      name: 'Nutella',         price: 1.00, icon: 'Cookie',    color: '#6b3a1f' },
  { id: 'oreo',         name: 'Oreo-Crumbs',     price: 0.80, icon: 'Cookie',    color: '#1A1A1A' },
  { id: 'sprinkles',    name: 'Bunte Streusel',  price: 0.60, icon: 'Sparkles',  color: '#C41E3A' },
];
const WAFFLE_BASE_PRICE = 4.80;

const InventoryItem = ({ item, onDrop }: { item: any; onDrop: (item: any, point: { x: number; y: number }) => void }) => {
  const LIcon = (Icons as any)[item.icon] || Icons.Sparkles;
  
  return (
    <motion.div
      drag
      dragSnapToOrigin
      dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
      dragElastic={0.6}
      whileDrag={{ scale: 1.15, zIndex: 100, cursor: 'grabbing' }}
      onDragEnd={(e, info) => onDrop(item, info.point)}
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
        padding: '10px 12px', borderRadius: 18, background: '#fff', cursor: 'grab',
        boxShadow: '0 4px 14px rgba(26,26,26,.08)', minWidth: 88, flexShrink: 0,
        userSelect: 'none', touchAction: 'none',
      }}
    >
      <div style={{ width: 42, height: 42, borderRadius: '50%', background: item.color, display:'flex', alignItems:'center', justifyContent:'center' }}>
        <LIcon size={20} color="#fff" strokeWidth={2}/>
      </div>
      <div style={{ fontFamily: 'var(--font-nunito), sans-serif', fontWeight: 800, fontSize: '0.74rem', color: '#1A1A1A', textAlign: 'center' }}>{item.name}</div>
      <div style={{ fontFamily: 'var(--font-calistoga), serif', fontSize: '0.82rem', color: '#C41E3A' }}>+{item.price.toFixed(2)} €</div>
    </motion.div>
  );
};

const Plate = ({ active, plateRef, controls, reduced }: { active: any[]; plateRef: any; controls: any; reduced: boolean }) => {
  return (
    <motion.div
      ref={plateRef}
      animate={controls}
      style={{
        position: 'relative',
        width: '100%', maxWidth: 460, aspectRatio: '1',
        margin: '0 auto', borderRadius: '50%',
        background: 'radial-gradient(circle at 50% 50%, #FAF8F5 0%, #E8D5C4 100%)',
        boxShadow: '0 24px 60px rgba(196,30,58,0.18), inset 0 -8px 24px rgba(26,26,26,0.08)',
        overflow: 'hidden', userSelect: 'none', touchAction: 'none',
      }}
    >
      {/* Waffel-Pattern */}
      <svg viewBox="0 0 200 200" style={{position:'absolute', inset:0, width:'100%', height:'100%', opacity:0.35}}>
        <defs>
          <pattern id="bubble" x="0" y="0" width="22" height="22" patternUnits="userSpaceOnUse">
            <circle cx="11" cy="11" r="7.5" fill="none" stroke="#C41E3A" strokeWidth="1.2" opacity="0.5"/>
          </pattern>
        </defs>
        <circle cx="100" cy="100" r="86" fill="url(#bubble)"/>
      </svg>

      <AnimatePresence>
        {active.map(t => {
          const LIcon = (Icons as any)[t.icon] || Icons.Sparkles;
          return (
            <motion.div
              key={t.instanceId}
              initial={reduced ? { opacity: 0 } : { scale: 0, rotate: -45, opacity: 0 }}
              animate={reduced ? { opacity: 1 } : { scale: 1, rotate: t.rot, opacity: 1 }}
              exit={reduced ? { opacity: 0 } : { scale: 0, opacity: 0 }}
              transition={reduced ? { duration: 0.2 } : { type: 'spring', stiffness: 600, damping: 12 }}
              style={{
                position: 'absolute', left: '50%', top: '50%',
                width: 44, height: 44, marginLeft: -22, marginTop: -22,
                transform: `translate(${t.x}px, ${t.y}px) rotate(${t.rot}deg)`,
                background: t.color, borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 4px 10px rgba(26,26,26,0.18)', pointerEvents: 'none',
              }}
            >
              <LIcon size={22} color="#fff" strokeWidth={2}/>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </motion.div>
  );
};

const AnimatedPrice = ({ value }: { value: number }) => {
  const mv = useMotionValue(value);
  const [display, setDisplay] = useState(value.toFixed(2));
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  useEffect(() => {
    const ctrl = animate(mv, value, { duration: 0.45, ease: 'easeOut' });
    const unsub = mv.on('change', v => setDisplay(v.toFixed(2)));
    return () => { ctrl.stop(); unsub(); };
  }, [value, mv]);

  return (
    <motion.span
      key={value}
      initial={reduced ? {} : { scale: 1 }}
      animate={reduced ? {} : { scale: [1, 1.15, 1] }}
      transition={{ duration: 0.35 }}
      style={{ fontFamily: 'var(--font-calistoga), serif', fontSize: '2.4rem', color: '#C41E3A', display: 'inline-block' }}
    >
      {display} €
    </motion.span>
  );
};

export function WaffleCrafter() {
  const { addToCart } = useStore();
  const [active, setActive] = useState<any[]>([]);
  const plateRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  const total = WAFFLE_BASE_PRICE + active.reduce((s, t) => s + t.price, 0);

  const onDrop = (item: any, point: { x: number; y: number }) => {
    const r = plateRef.current?.getBoundingClientRect();
    if (!r) return;
    const plateLeft = r.left + window.scrollX;
    const plateTop = r.top + window.scrollY;
    const plateRight = plateLeft + r.width;
    const plateBottom = plateTop + r.height;

    if (point.x < plateLeft || point.x > plateRight || point.y < plateTop || point.y > plateBottom) return;
    
    const localX = point.x - plateLeft - r.width / 2;
    const localY = point.y - plateTop - r.height / 2;
    
    setActive(prev => [...prev, {
      instanceId: `${item.id}-${Date.now()}-${Math.random()}`,
      ...item,
      x: localX + (Math.random() - 0.5) * 30,
      y: localY + (Math.random() - 0.5) * 30,
      rot: (Math.random() - 0.5) * 60,
    }]);

    if (reduced) {
      controls.start({ opacity: [1, 0.7, 1], transition: { duration: 0.3 } });
    } else {
      controls.start({ scale: [1, 0.96, 1.04, 1], transition: { duration: 0.35 } });
    }
    
    if (navigator.vibrate) navigator.vibrate(40);
  };

  const reset = () => setActive([]);
  
  const handleAddToCart = () => {
    const desc = active.length > 0 ? `Mit ${active.map(t => t.name).join(', ')}` : 'Basis Waffel';
    addToCart({
      id: `waffle-${Date.now()}`,
      name: 'Eigene Bubble Waffel',
      price: parseFloat(total.toFixed(2)),
      variant: desc
    });
    reset();
  };

  return (
    <div style={{ marginTop: 14 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap:'wrap', gap: 12, marginBottom: 22 }}>
        <div>
          <div style={{ fontFamily: 'var(--font-nunito), sans-serif', fontWeight: 900, fontSize: '0.7rem', color: '#8A8A8A', textTransform: 'uppercase', letterSpacing: '1.5px' }}>Bau dir deine Bubble Waffel</div>
          <div style={{ fontFamily: 'var(--font-calistoga), serif', fontSize: '1.05rem', color: '#1A1A1A', marginTop: 4 }}>Aktueller Preis</div>
        </div>
        <AnimatedPrice value={total}/>
      </div>

      <Plate active={active} plateRef={plateRef} controls={controls} reduced={reduced} />

      <div style={{
        display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center', padding: '20px 4px 6px',
        marginTop: 18,
      }}>
        {WAFFLE_INVENTORY.map(item => <InventoryItem key={item.id} item={item} onDrop={onDrop}/>)}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 20, gap: 12, flexWrap: 'wrap' }}>
        <p style={{ fontFamily: 'var(--font-nunito), sans-serif', fontSize: '0.78rem', color: '#8A8A8A', flex: '1 1 200px', lineHeight: 1.55 }}>
          Zieh die Toppings auf deine Waffel — und sieh deine Kreation entstehen. Nur eine Vorschau!
        </p>
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={reset}
            style={{
              background: '#F2E8E0', color: '#C41E3A', border: 'none', borderRadius: 50,
              padding: '10px 22px', fontFamily: 'var(--font-nunito), sans-serif', fontWeight: 800, fontSize: '0.82rem', cursor: 'pointer',
            }}
          >🗑️ Zurücksetzen</button>
          <button
            onClick={handleAddToCart}
            style={{
              background: '#C41E3A', color: '#fff', border: 'none', borderRadius: 50,
              padding: '10px 22px', fontFamily: 'var(--font-nunito), sans-serif', fontWeight: 800, fontSize: '0.82rem', cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(196,30,58,0.25)'
            }}
          >In den Warenkorb</button>
        </div>
      </div>
    </div>
  );
}
