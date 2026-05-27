import React from 'react';
import { SubpageHero } from '@/components/ui/SubpageHero';
import { Droplets, Crosshair, Sparkles } from 'lucide-react';
import { PrintComparisonSlider } from '@/components/scrollytelling/PrintComparisonSlider';

export default function SLADruckPage() {
  return (
    <main className="min-h-screen bg-white">
      <SubpageHero 
        label="SLA-DRUCK"
        title="Mikrometer Präzision."
        subtitle="Stereolithografie (SLA) härtet flüssiges Kunstharz mit einem Laser aus. Das Ergebnis: Atemberaubende Details und spiegelglatte Oberflächen."
      />

      <section className="py-24 px-6 max-w-5xl mx-auto">
        <div className="prose prose-lg text-[#2D2D2D] mx-auto mb-16">
          <p>
            Wenn es auf jedes Detail ankommt, ist der SLA-Druck unschlagbar. Ob für den Modellbau, Schmuckdesign, Architekturmodelle oder zahnmedizinische Anwendungen – SLA liefert eine Oberflächengüte, die dem Spritzguss in nichts nachsteht.
          </p>
          <h3 className="text-[#1A1A1A] font-calistoga mt-10 text-2xl">Materialien (Resins)</h3>
          <p>
            Unsere Resins (Harze) decken verschiedenste mechanische Eigenschaften ab:
          </p>
          <ul>
            <li><strong>Standard Resin:</strong> Für visuelle Prototypen und Figuren.</li>
            <li><strong>Tough/Durable Resin:</strong> Simuliert ABS und Polypropylen für schnappbare Teile.</li>
            <li><strong>Castable Resin:</strong> Rückstandslos verbrennbar für den Schmuckguss.</li>
            <li><strong>Clear Resin:</strong> Hochtransparente Drucke für Linsen und Fluidik-Modelle.</li>
          </ul>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
          <div className="bg-[#FAF8F5] p-6 rounded-2xl border border-[#E8D5C4] text-center">
            <Crosshair className="mx-auto text-[#C41E3A] mb-4" size={32} />
            <h4 className="font-bold text-[#1A1A1A] mb-2">Extreme Auflösung</h4>
            <p className="text-sm text-[#2D2D2D]">Druckschichten bis zu 25 Mikrometer (0,025mm).</p>
          </div>
          <div className="bg-[#FAF8F5] p-6 rounded-2xl border border-[#E8D5C4] text-center">
            <Sparkles className="mx-auto text-[#C41E3A] mb-4" size={32} />
            <h4 className="font-bold text-[#1A1A1A] mb-2">Glatte Oberflächen</h4>
            <p className="text-sm text-[#2D2D2D]">Fast unsichtbare Schichtlinien für perfektes Finish.</p>
          </div>
          <div className="bg-[#FAF8F5] p-6 rounded-2xl border border-[#E8D5C4] text-center">
            <Droplets className="mx-auto text-[#C41E3A] mb-4" size={32} />
            <h4 className="font-bold text-[#1A1A1A] mb-2">Wasserdicht</h4>
            <p className="text-sm text-[#2D2D2D]">Vollständig dichte Struktur ohne Hohlräume.</p>
          </div>
        </div>
      </section>

      <PrintComparisonSlider />
    </main>
  );
}
