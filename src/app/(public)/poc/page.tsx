import React from 'react';

export default function PoCHeroPage() {
  return (
    <div className="bg-bg-creme min-h-screen pt-20">
      <section className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6 py-20 border-b-8 border-terracotta bg-bg-creme">
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="font-heading text-terracotta drop-shadow-sm">
            Aykin
          </h1>
          
          <p className="font-body font-black text-terracotta text-[clamp(1.2rem,3vw,2rem)] tracking-wide uppercase">
            Custom 3D Druck
          </p>

          <p className="font-body font-normal text-terracotta/80 text-[clamp(1rem,2vw,1.25rem)] max-w-2xl mx-auto leading-relaxed mt-8">
            Ein neues Kapitel, ein frisches Design. Unsere 3D-Drucke und Spezialprodukte 
            präsentieren sich nun in einem warmen Creme-Terracotta Gewand. Fühl dich wie zuhause.
          </p>

          <div className="pt-8 flex gap-4 justify-center flex-wrap">
            <button className="font-body font-black bg-terracotta text-bg-creme px-8 py-4 rounded-full hover:opacity-90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
              Menü entdecken
            </button>
            <button className="font-body font-black bg-beige text-terracotta px-8 py-4 rounded-full hover:bg-peach transition-all shadow-sm hover:shadow-md">
              Besuch uns
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
