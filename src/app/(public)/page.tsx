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
    <div className="animate-fade-in">
      <Hero />

      {/* ─── Intro / Über Aykin ──────────────────────────────────────── */}
      <section className="bg-[#FAF8F5] pt-[88px] pb-[80px]">
        <FadeUp>
          <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
            {/* Image blob */}
            <div className="relative">
              <div className="overflow-hidden aspect-[4/5]" style={{ borderRadius: '44% 56% 50% 50%/52% 48% 52% 48%' }}>
                <FoodIcon icon="Heart" label="3D Druck Werkstatt\nAykin Produktion" size="sq" shape="rounded-none" className="w-full h-full" />
              </div>
              {/* Rating badge */}
              <div className="absolute -bottom-4 -right-2 bg-[#C41E3A] text-white px-4 py-3 rounded-2xl shadow-terra">
                <div className="font-calistoga text-[1.8rem] leading-none">{config.rating}★</div>
                <div className="font-nunito text-[0.68rem] font-extrabold opacity-90 mt-0.5">
                  {config.reviewCount}+ Google Reviews
                </div>
              </div>
            </div>

            {/* Copy */}
            <div>
              <div className="flex gap-2.5 mb-4">
                <StampBadge text="Für alle Branchen" size={84} rotate={-10} />
                <StampBadge text="Made in Germany" size={76} rotate={8} color="#4A4A4A" />
              </div>
              <h2 className="font-calistoga text-[clamp(1.7rem,3.5vw,2.7rem)] text-[#1A1A1A] mb-4 leading-[1.1]">
                Dein Partner für<br/><span className="text-[#C41E3A]">individuelle Lösungen</span>
              </h2>
              <p className="font-nunito text-[0.97rem] text-[#4A4A4A] leading-[1.85] mb-7 max-w-[440px]">
                Bei Aykin dreht sich alles um maßgeschneiderte 3D-Drucklösungen. Ob Prototyp, Ersatzteil
                oder kreatives Projekt — wir bringen deine Ideen in Form.
              </p>

              <div className="grid grid-cols-2 gap-3">
                {[
                  ['FDM-Druck', 'Robuste Funktionsteile'],
                  ['SLA-Druck', 'Detailreiche Modelle'],
                  ['Prototypen', 'Schnelle Iterationen'],
                  ['Individuell', 'Nach deinen Wünschen']
                ].map(([t, d]) => (
                  <div key={t} className="bg-[#F2E8E0] rounded-[14px] px-4 py-3.5">
                    <div className="font-nunito font-black text-[0.84rem] text-[#1A1A1A]">{t}</div>
                    <div className="font-nunito text-[0.75rem] text-[#8A8A8A] mt-0.5">{d}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeUp>
      </section>

      {/* ─── Bestsellers ───────────────────────────────────────────────────── */}
      <BestsellersSection />

      {/* ─── Values ────────────────────────────────────────────────────────── */}
      <ValuesSection />

      {/* ─── Reviews ───────────────────────────────────────────────────────── */}
      <ReviewsSection reviews={reviews} config={config} />
      
      {/* ─── Newsletter ────────────────────────────────────────────────────── */}
      <NewsletterSection />

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
