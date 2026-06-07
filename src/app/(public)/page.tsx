import React from "react";
import { HomeSEO } from "@/content/seo/HomeSEO";
import { SEOContentBlock } from "@/components/seo/SEOContentBlock";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqSchema, breadcrumbSchema } from "@/lib/seo/schemas";
import { FAQ_DATA } from "@/content/seo/faq-data";
import { FadeUp } from "@/components/ui/FadeUp";
import { PrimaryButton, SecondaryButton } from "@/components/ui/Btn";
import { WaveDivider } from "@/components/ui/WaveDivider";
import { SectionTitle, StampBadge, TicketCard } from "@/components/ui/LayoutBlocks";
import { HoloTiltCard } from "@/components/ui/HoloTiltCard";
import { ScratchCard } from "@/components/ui/ScratchCard";
import { FoodIcon } from "@/components/ui/FoodIcon";
import { ReviewsSection } from "@/components/ui/ReviewsSection";
import { Star } from "lucide-react";
import { AYKIN_DATA } from "@/lib/data";
import { buildMetadata } from '@/lib/seo/metadata';

import { Hero } from "@/components/sections/home/Hero";
import { BestsellersSection } from "@/components/sections/home/BestsellersSection";
import { ValuesSection } from "@/components/sections/home/ValuesSection";
import { NewsletterSection } from "@/components/sections/home/NewsletterSection";

export const revalidate = 60;

export const metadata = buildMetadata({
  title: 'Aykin · Custom 3D Druck — Individuelle 3D-Drucke individuell gefertigt',
  description: 'Aykin · Custom 3D Druck  — Prototypen, Ersatzteile, individuelle Modelle und kreative Lösungen. Präzise, individuell und in Premium-Qualität.',
  path: '/',
  keywords: ['3D Druck Wetzlar','Custom 3D Druck','Prototypen Wetzlar','3D Modellierung','Aykin 3D Druck','FDM Druck','SLA Druck'],
});

export default function HomePage() {
  const { bestsellers, reviews, config } = AYKIN_DATA;

  return (
    <div className="animate-fade-in overflow-x-hidden w-full max-w-full">
      {/* ─── Hero Wrapper ──────────────────────────────────────────────── */}
      <div className="relative w-full overflow-hidden max-w-[100vw]">
        <Hero />
      </div>

      {/* ─── Intro / Über Aykin ──────────────────────────────────────── */}
      <section className="bg-[#FAF8F5] py-24 w-full overflow-hidden">
        <FadeUp>
          <div className="max-w-[1200px] mx-auto px-6 lg:px-8 flex flex-col lg:flex-row gap-16 items-center">
            {/* Image blob - Golden Ratio 1/3 */}
            <div className="relative w-full lg:w-1/3 flex-shrink-0">
              <div className="overflow-hidden aspect-[4/5] mx-auto max-w-[320px] lg:max-w-none" style={{ borderRadius: '44% 56% 50% 50%/52% 48% 52% 48%' }}>
                <FoodIcon icon="Heart" label="3D Druck Werkstatt\nAykin Produktion" size="sq" shape="rounded-none" className="w-full h-full object-cover" />
              </div>
              {/* Rating badge */}
              <div className="absolute -bottom-4 -right-2 lg:-right-6 bg-[#C41E3A] text-white px-5 py-4 rounded-2xl shadow-terra z-10">
                <div className="font-calistoga text-[2rem] leading-none">{config.rating}★</div>
                <div className="font-nunito text-[0.7rem] font-extrabold opacity-90 mt-1">
                  {config.reviewCount}+ Google Reviews
                </div>
              </div>
            </div>

            {/* Copy - Golden Ratio 2/3 */}
            <div className="w-full lg:w-2/3 flex flex-col items-start">
              <div className="flex gap-3 mb-6">
                <StampBadge text="Für alle Branchen" size={84} rotate={-10} />
                <StampBadge text="Made in Germany" size={76} rotate={8} color="#4A4A4A" />
              </div>
              <h2 className="font-calistoga text-[clamp(2rem,4vw,3.2rem)] text-[#1A1A1A] mb-6 leading-tight">
                Dein Partner für<br/><span className="text-[#C41E3A]">individuelle Lösungen</span>
              </h2>
              <p className="font-nunito text-base md:text-lg text-[#4A4A4A] leading-relaxed mb-10 max-w-[540px]">
                Bei Aykin dreht sich alles um maßgeschneiderte 3D-Drucklösungen. Ob Prototyp, Ersatzteil
                oder kreatives Projekt — wir bringen deine Ideen in Form.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-[600px]">
                {[
                  ['FDM-Druck', 'Robuste Funktionsteile'],
                  ['SLA-Druck', 'Detailreiche Modelle'],
                  ['Prototypen', 'Schnelle Iterationen'],
                  ['Individuell', 'Nach deinen Wünschen']
                ].map(([t, d]) => (
                  <div key={t} className="bg-[#F2E8E0] rounded-2xl px-5 py-4 transition-transform hover:-translate-y-1 hover:shadow-md">
                    <div className="font-nunito font-black text-sm text-[#1A1A1A] leading-relaxed">{t}</div>
                    <div className="font-nunito text-xs text-[#8A8A8A] mt-1 leading-relaxed">{d}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeUp>
      </section>

      {/* ─── Bestsellers ───────────────────────────────────────────────────── */}
      <div className="w-full overflow-hidden">
        <BestsellersSection />
      </div>

      {/* ─── Values ────────────────────────────────────────────────────────── */}
      <div className="w-full overflow-hidden">
        <ValuesSection />
      </div>

      {/* ─── Reviews ───────────────────────────────────────────────────────── */}
      <div className="w-full overflow-hidden">
        <ReviewsSection reviews={reviews} config={config} />
      </div>
      
      {/* ─── Newsletter ────────────────────────────────────────────────────── */}
      <div className="w-full overflow-hidden">
        <NewsletterSection />
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes blobFloat { 0%,100%{transform:translate(0,0)} 33%{transform:translate(6px,-10px)} 66%{transform:translate(-5px,7px)} }
        .animate-blob-float { animation: blobFloat 9s ease-in-out infinite; }
        .animate-blob-float-reverse { animation: blobFloat 12s ease-in-out infinite reverse; }
        .animate-fade-in { animation: fadeIn 0.4s ease both; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(18px) } to { opacity: 1; transform: none } }
      `}} />
      <SEOContentBlock visible={true} ariaLabel="Mehr über Aykin Custom 3D Druck ">
        <HomeSEO />
      </SEOContentBlock>
      <JsonLd data={[faqSchema(FAQ_DATA), breadcrumbSchema([])]} />
    </div>
  );
}
