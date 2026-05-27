import React from "react";
import { AboutSEO } from "@/content/seo/AboutSEO";
import { SEOContentBlock } from "@/components/seo/SEOContentBlock";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo/schemas";
import { FadeUp } from "@/components/ui/FadeUp";
import { WaveDivider } from "@/components/ui/WaveDivider";
import { SectionTitle, StampBadge } from "@/components/ui/LayoutBlocks";
import { FoodIcon } from "@/components/ui/FoodIcon";
import { LevelMap } from "@/components/ui/LevelMap";
import { ValueCard } from "@/components/ui/ValueCard";
import { buildMetadata } from '@/lib/seo/metadata';

export const metadata = buildMetadata({
  title: 'Über uns · Die Geschichte hinter Aykin',
  description: 'Erfahre die Geschichte von Aykin — Präzision trifft Kreativität. Custom 3D-Druck, individuell gefertigt für deine Projekte.',
  path: '/about',
  keywords: ['Aykin Geschichte','Custom 3D Druck','3D Druck Service'],
});

export default function AboutPage() {
  const sections = [
    { id: 'about-hero',   label: 'Start' },
    { id: 'about-story',  label: 'Story' },
    { id: 'about-values', label: 'Werte' },
    { id: 'about-home',   label: 'Zuhause' },
  ];

  return (
    <>
    <div className="min-h-screen bg-[#FAF8F5] animate-fade-in relative">
      <LevelMap sections={sections} />

      {/* Hero */}
      <section id="about-hero" className="bg-[#F2E8E0] pt-[110px] px-6 pb-[88px] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.22] dot-bg" />
        <div className="absolute top-[8%] right-[3%] w-[280px] h-[280px] bg-[#E8D5C4] opacity-[0.55] animate-blob-float" 
             style={{ borderRadius: '58% 42% 52% 48%/48% 58% 42% 52%' }} />
        <div className="absolute bottom-[10%] -left-[3%] w-[180px] h-[180px] bg-[#C41E3A] opacity-10" 
             style={{ borderRadius: '45% 55% 40% 60%' }} />

        <div className="relative z-10 max-w-[840px] mx-auto">
          <div className="mb-4">
            <StampBadge text="Seit 2023" size={88} rotate={-6} color="#C41E3A" />
          </div>
          <h1 className="font-calistoga text-[clamp(2.4rem,6vw,4.2rem)] text-[#1A1A1A] leading-[1.05] mb-5">
            Hinter Aykin steckt<br/>
            <span className="text-[#C41E3A]">echte Leidenschaft.</span>
          </h1>
          <p className="font-nunito text-[clamp(0.95rem,1.4vw,1.05rem)] text-[#4A4A4A] leading-[1.8] max-w-[600px]">
            Kein Fast-Food-Dessert, sondern handgemachte Kreationen mit Herz.
            Entstanden aus der einfachen Frage: Was fehlt dem 3D-Druck-Markt?
          </p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 leading-none">
          <svg viewBox="0 0 1440 44" className="block w-full h-[44px]" preserveAspectRatio="none">
            <path d="M0,22 C360,48 720,0 1080,26 C1260,38 1380,16 1440,22 L1440,44 L0,44 Z" fill="#FAF8F5" />
          </svg>
        </div>
      </section>

      {/* Story */}
      <section id="about-story" className="py-20">
        <FadeUp className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[60px] items-center">
            {/* Portrait */}
            <div className="relative">
              <div className="overflow-hidden aspect-[4/5]" style={{ borderRadius: '44% 56% 52% 48%/50% 46% 54% 50%' }}>
                <FoodIcon icon="Heart" label="Gründer\nPorträt / Team-Foto" size="sq" shape="rounded-none" className="w-full h-full" />
              </div>
              <div className="absolute -bottom-4 -left-3 bg-[#F2E8E0] rounded-2xl px-5 py-4 shadow-[0_8px_28px_rgba(26,26,26,0.1)]">
                <div className="font-calistoga text-[1.08rem] text-[#C41E3A]">[Name eintragen]</div>
                <div className="font-nunito text-[0.73rem] text-[#8A8A8A] font-bold mt-0.5">
                  Gründerin & Inhaberin
                </div>
              </div>
            </div>

            {/* Copy */}
            <div>
              <h2 className="font-calistoga text-[clamp(1.6rem,3vw,2.4rem)] text-[#1A1A1A] mb-5 leading-[1.12]">
                Die Geschichte<br/>von Aykin
              </h2>
              <p className="font-nunito text-[0.97rem] text-[#4A4A4A] leading-[1.88] mb-4.5">
                Alles begann mit einer einfachen Frage: Was fehlt dem 3D-Druck-Markt? Ein Service, der Qualität, Individualität und schnelle Umsetzung vereint. Mit Liebe zum Detail und der tiefen Überzeugung, dass das Beste immer individuell gefertigt wird.
              </p>
              <p className="font-nunito text-[0.97rem] text-[#4A4A4A] leading-[1.88] mb-8">
                Seit der Eröffnung im September 2023 ist Aykin ein Ort geworden, an dem Generationen zusammenkommen.
              </p>
              <div className="flex flex-wrap gap-7">
                {[
                  ['84+', 'Google Reviews'],
                  ['4,8★', 'Bewertung'],
                  ['Sep. 2023', 'Eröffnung']
                ].map(([n, l]) => (
                  <div key={l}>
                    <div className="font-calistoga text-[2.2rem] text-[#C41E3A] leading-none">{n}</div>
                    <div className="font-nunito text-[0.74rem] text-[#8A8A8A] font-bold mt-1">{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeUp>
      </section>

      {/* Values */}
      <section id="about-values" className="bg-[#F2E8E0] py-20 relative">
        <WaveDivider fromColor="#F2E8E0" toColor="#F2E8E0" variant={3} />
        <FadeUp delay={0.1} className="max-w-[1200px] mx-auto px-6 pt-11">
          <SectionTitle sub="Was uns antreibt — jeden Tag.">Unsere Werte</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: 'Sparkles', title: 'Frische Zutaten', text: 'Täglich frisch verarbeitet. Keine Fertigprodukte — nur echte Zutaten und echte Qualität.' },
              { icon: 'Heart',    title: 'Mit Liebe gemacht', text: 'Jedes Produkt — mit Präzision und Leidenschaft gefertigt. Das sieht man.' },
              { icon: 'Baby',     title: 'Für alle', text: 'Familien, Freunde, alle Generationen. Mit Kinderecke, Wickelraum und einem herzlichen Empfang.' },
              { icon: 'Coffee',   title: 'Hausgemacht', text: 'Von den Soßen bis zum Teig: Wir machen so viel wie möglich selbst.' },
            ].map((v, i) => (
              <ValueCard key={i} icon={v.icon as any} title={v.title} text={v.text} />
            ))}
          </div>
        </FadeUp>
        <div className="mt-[60px]">
          <WaveDivider fromColor="#F2E8E0" toColor="#F2E8E0" variant={2} flip={true} />
        </div>
      </section>

      {/* Photo mosaic */}
      <section id="about-home" className="bg-[#F2E8E0] pb-20">
        <FadeUp className="max-w-[1200px] mx-auto px-6">
          <SectionTitle sub="Aykin Studio">Unser Studio </SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] grid-rows-auto gap-4">
            <div className="md:row-span-2 rounded-[22px] overflow-hidden min-h-[320px]">
              <FoodIcon icon="MapPin" label="Außenansicht\nAyk" size="sq" shape="rounded-none" className="h-full min-h-[320px]" />
            </div>
            {[
              ['Coffee', 'Innenraum\nCafé-Bereich'],
              ['Baby', 'Kinderecke'],
              ['Cake', 'Theke & Vitrine'],
              ['Sparkles', 'Detail-Shot']
            ].map(([ic, lb]) => (
              <div key={ic} className="rounded-[18px] overflow-hidden min-h-[148px]">
                <FoodIcon icon={ic} label={lb} size="sq" shape="rounded-none" className="h-full min-h-[148px]" />
              </div>
            ))}
          </div>
        </FadeUp>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes blobFloat{0%,100%{transform:translate(0,0)}33%{transform:translate(6px,-10px)}66%{transform:translate(-5px,7px)}}
        .animate-blob-float { animation: blobFloat 9s ease-in-out infinite; }
        .animate-fade-in { animation: fadeIn 0.4s ease both; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(18px) } to { opacity: 1; transform: none } }
      `}} />
    </div>
      <SEOContentBlock visible={true} ariaLabel="Die Geschichte von Aykin · Custom 3D Druck Wetzlar">
        <AboutSEO />
      </SEOContentBlock>
      <JsonLd data={[breadcrumbSchema([{ name: 'Über uns', path: '/about' }])]} />
    </>
  );
}
