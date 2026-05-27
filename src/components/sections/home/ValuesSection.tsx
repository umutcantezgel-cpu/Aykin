import React from 'react';
import { FadeUp } from '@/components/ui/FadeUp';
import { ValueCard } from '@/components/ui/ValueCard';
import { WaveDivider } from '@/components/ui/WaveDivider';
import { SectionTitle } from '@/components/ui/LayoutBlocks';

export function ValuesSection() {
  return (
    <section className="bg-[#F2E8E0] py-20 relative">
      <WaveDivider fromColor="#F2E8E0" toColor="#F2E8E0" variant={3} />
      <FadeUp delay={0.1} className="max-w-[1200px] mx-auto px-6 pt-11">
        <SectionTitle sub="Was uns antreibt — jeden Tag.">Unsere Werte</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: 'Sparkles', title: 'Höchste Präzision', text: 'Modernste 3D-Drucktechnologie für detailgetreue Ergebnisse. Jedes Projekt wird mit höchster Genauigkeit umgesetzt.' },
            { icon: 'Heart',    title: 'Individuell gefertigt', text: 'Jedes Produkt wird nach Ihren Wünschen maßgeschneidert — von der Idee bis zum fertigen Objekt.' },
            { icon: 'Baby',     title: 'Für alle Branchen', text: 'Prototypen, Ersatzteile, Kunst und Design. Wir liefern Lösungen für Privatpersonen und Unternehmen.' },
          ].map((v, i) => (
            <ValueCard key={i} icon={v.icon as any} title={v.title} text={v.text} />
          ))}
        </div>
      </FadeUp>
      <div className="mt-[60px]">
        <WaveDivider fromColor="#F2E8E0" toColor="#F2E8E0" variant={2} flip={true} />
      </div>
    </section>
  );
}
