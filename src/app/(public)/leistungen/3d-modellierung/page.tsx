import React from 'react';
import { SubpageHero } from '@/components/ui/SubpageHero';
import { PenTool, Monitor, FileCheck } from 'lucide-react';
import { PrimaryCTA } from '@/components/atoms/buttons';
import { TransitionLink } from '@/components/ui/TransitionLink';
import { ModelingScrollSequence } from '@/components/scrollytelling/ModelingScrollSequence';

export default function ModelingPage() {
  return (
    <main className="min-h-screen bg-white">
      <SubpageHero 
        label="3D-MODELLIERUNG"
        title="Von der Idee zur CAD-Datei."
        subtitle="Du hast eine Skizze, ein kaputtes Ersatzteil oder nur eine grobe Idee im Kopf? Wir übernehmen das digitale Design."
      />

      <ModelingScrollSequence />

      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="order-2 lg:order-1 bg-[#FAF8F5] p-10 rounded-3xl border border-[#E8D5C4] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-[80px]" />
            <h3 className="font-calistoga text-2xl text-[#1A1A1A] mb-6 relative z-10">Unser Workflow</h3>
            
            <div className="space-y-8 relative z-10">
              <div className="flex gap-4">
                <div className="w-12 h-12 shrink-0 bg-white rounded-full flex items-center justify-center text-[#C41E3A] shadow-sm border border-[#E8D5C4]">
                  1
                </div>
                <div>
                  <h4 className="font-bold text-[#1A1A1A] text-lg">Beratung & Skizze</h4>
                  <p className="text-[#2D2D2D] text-sm">Wir besprechen Anforderungen, Maße und den Verwendungszweck deines Bauteils.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 shrink-0 bg-white rounded-full flex items-center justify-center text-[#C41E3A] shadow-sm border border-[#E8D5C4]">
                  2
                </div>
                <div>
                  <h4 className="font-bold text-[#1A1A1A] text-lg">CAD-Konstruktion</h4>
                  <p className="text-[#2D2D2D] text-sm">Unsere Designer erstellen ein präzises, druckbares 3D-Modell (z.B. in Fusion 360 oder Blender).</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 shrink-0 bg-[#C41E3A] rounded-full flex items-center justify-center text-white shadow-sm">
                  3
                </div>
                <div>
                  <h4 className="font-bold text-[#1A1A1A] text-lg">Freigabe & Druck</h4>
                  <p className="text-[#2D2D2D] text-sm">Du erhältst Renderings zur Freigabe. Erst danach geht das Teil in den Druck.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <h2 className="font-calistoga text-4xl text-[#1A1A1A] mb-6">Reverse Engineering & Design.</h2>
            <p className="text-lg text-[#2D2D2D] mb-6 leading-relaxed">
              Manchmal bricht ein Plastikteil an einem 500€ Gerät, und der Hersteller bietet keine Ersatzteile mehr an. Anstatt das Gerät wegzuwerfen, designen wir das defekte Teil am Computer nach und drucken es in robusterem Material neu aus.
            </p>
            <p className="text-lg text-[#2D2D2D] mb-10 leading-relaxed">
              Aber auch für Erfinder, Künstler und Startups: Wenn du das Know-How im 3D-Druck nicht hast, lagere die Modellierung einfach an uns aus.
            </p>

            <TransitionLink href="/anfrage">
              <PrimaryCTA className="py-4 px-8 w-fit" showArrow>
                Modellierung anfragen
              </PrimaryCTA>
            </TransitionLink>
          </div>
          
        </div>
      </section>
    </main>
  );
}
