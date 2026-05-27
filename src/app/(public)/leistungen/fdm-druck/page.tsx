import React from 'react';
import { SubpageHero } from '@/components/ui/SubpageHero';
import { Box, Settings, Zap } from 'lucide-react';
import { FdmScrollDiagram } from '@/components/scrollytelling/FdmScrollDiagram';
import { PrintComparisonSlider } from '@/components/scrollytelling/PrintComparisonSlider';

export default function FDMDruckPage() {
  return (
    <main className="min-h-screen bg-white">
      <SubpageHero 
        label="FDM-DRUCK"
        title="Robust. Vielseitig. Effizient."
        subtitle="Die Fused Deposition Modeling (FDM) Technologie ist der Goldstandard für funktionale Prototypen, Gehäuse und mechanische Bauteile."
      />

      <FdmScrollDiagram />

      <section className="py-24 px-6 max-w-5xl mx-auto">
        <div className="prose prose-lg text-[#2D2D2D] mx-auto mb-16">
          <p>
            Unser FDM-Druckservice nutzt hochmoderne Industriedrucker, um langlebige und temperaturbeständige Bauteile zu fertigen. Egal, ob du ein Ersatzteil für ein defektes Gerät benötigst oder eine Kleinserie für dein Startup planst – FDM ist oft die beste und wirtschaftlichste Wahl.
          </p>
          <h3 className="text-[#1A1A1A] font-calistoga mt-10 text-2xl">Materialien</h3>
          <p>
            Wir bieten eine breite Palette an Filamenten:
          </p>
          <ul>
            <li><strong>PLA/PETG:</strong> Standardmaterialien für schnelle Prototypen.</li>
            <li><strong>ABS/ASA:</strong> UV- und wetterbeständig für den Außenbereich.</li>
            <li><strong>Carbonfaser (PA-CF):</strong> Extrem leicht und unfassbar stabil für industrielle Anwendungen.</li>
          </ul>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
          <div className="bg-[#FAF8F5] p-6 rounded-2xl border border-[#E8D5C4] text-center">
            <Zap className="mx-auto text-[#C41E3A] mb-4" size={32} />
            <h4 className="font-bold text-[#1A1A1A] mb-2">Schnelle Fertigung</h4>
            <p className="text-sm text-[#2D2D2D]">Ideal für Rapid Prototyping und schnelle Iterationen.</p>
          </div>
          <div className="bg-[#FAF8F5] p-6 rounded-2xl border border-[#E8D5C4] text-center">
            <Settings className="mx-auto text-[#C41E3A] mb-4" size={32} />
            <h4 className="font-bold text-[#1A1A1A] mb-2">Hohe Festigkeit</h4>
            <p className="text-sm text-[#2D2D2D]">Funktionale Bauteile, die Belastungen standhalten.</p>
          </div>
          <div className="bg-[#FAF8F5] p-6 rounded-2xl border border-[#E8D5C4] text-center">
            <Box className="mx-auto text-[#C41E3A] mb-4" size={32} />
            <h4 className="font-bold text-[#1A1A1A] mb-2">Riesiges Bauvolumen</h4>
            <p className="text-sm text-[#2D2D2D]">Druck von großen Objekten in einem Stück möglich.</p>
          </div>
        </div>
      </section>

      <PrintComparisonSlider />
    </main>
  );
}
