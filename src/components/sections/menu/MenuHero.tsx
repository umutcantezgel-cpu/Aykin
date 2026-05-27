import React from 'react';

export function MenuHero() {
  return (
    <div className="bg-peach pt-[120px] px-6 pb-20 text-center relative overflow-hidden">
      <div className="absolute inset-0 opacity-40 pointer-events-none"
           style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(196, 30, 58, 0.15) 1px, transparent 0)', backgroundSize: '24px 24px' }} />

      <div className="absolute top-[10%] right-[4%] w-[200px] h-[200px] bg-cream/30 rounded-[58%_42%_52%_48%] opacity-60 animate-blob-float" />
      <div className="absolute bottom-[15%] left-[3%] w-[150px] h-[150px] bg-terracotta/10 rounded-[45%_55%_60%_40%] animate-blob-float-reverse" />

      <div className="relative z-10 max-w-2xl mx-auto">
        <h1 className="font-calistoga text-5xl md:text-6xl text-charcoal mb-4 leading-tight">
          Unsere Produkte
        </h1>
        <p className="font-bold text-lg text-charcoal/80">
          Alles frisch & selbstgemacht — gönn dir was Süßes!
        </p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 leading-none">
        <svg viewBox="0 0 1440 44" className="block w-full h-[44px]" preserveAspectRatio="none">
          <path d="M0,22 C320,46 640,0 960,22 C1120,34 1300,14 1440,22 L1440,44 L0,44 Z" fill="#FAF8F5" />
        </svg>
      </div>
    </div>
  );
}
