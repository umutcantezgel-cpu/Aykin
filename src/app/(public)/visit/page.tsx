import React from "react";
import { VisitSEO } from "@/content/seo/VisitSEO";
import { SEOContentBlock } from "@/components/seo/SEOContentBlock";
import { FadeUp } from "@/components/ui/FadeUp";
import dynamic from "next/dynamic";
import { PrimaryButton, SecondaryButton } from "@/components/ui/Btn";
import { FoodIcon } from "@/components/ui/FoodIcon";
import { MapPin, Phone, MessageCircle, Truck, Camera, ChevronRight } from "lucide-react";
import { ClientHoursTable } from "@/components/ui/ClientHoursTable";

import { InteractiveMapClient } from '@/components/ui/InteractiveMapClient';

export default function VisitPage() {
  return (
    <>
    <div className="min-h-screen bg-[#FAF8F5] animate-fade-in">
      {/* Hero */}
      <section className="bg-[#F2E8E0] pt-[110px] px-6 pb-[88px] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.22] dot-bg" />
        <div className="absolute top-[14%] left-[4%] w-[220px] h-[220px] bg-[#E8D5C4] opacity-50 animate-blob-float" 
             style={{ borderRadius: '56% 44% 48% 52%/52% 60% 40% 48%' }} />
        <div className="absolute bottom-[10%] right-[6%] w-[160px] h-[160px] bg-[#C41E3A] opacity-10" 
             style={{ borderRadius: '42% 58% 55% 45%' }} />

        <div className="relative z-10 max-w-[700px] mx-auto text-center">
          <h1 className="font-calistoga text-[clamp(2.4rem,6vw,4.2rem)] text-[#1A1A1A] mb-3.5 leading-[1.05]">
            Komm uns besuchen!
          </h1>
          <p className="font-nunito text-[1.04rem] text-[#4A4A4A]">
            Wir freuen uns auf dich — vor Ort oder bequem per Lieferung.
          </p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 leading-none">
          <svg viewBox="0 0 1440 44" className="block w-full h-[44px]" preserveAspectRatio="none">
            <path d="M0,22 C480,48 960,0 1440,26 L1440,44 L0,44 Z" fill="#FAF8F5" />
          </svg>
        </div>
      </section>

      {/* Main grid */}
      <section className="py-20">
        <FadeUp className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-13 items-start">
            {/* ── Left: Map + Contact ── */}
            <div>
              <h2 className="font-calistoga text-[1.7rem] text-[#1A1A1A] mb-5.5">
                So findest du uns
              </h2>

              {/* Interactive Google Map */}
              <div className="mb-5.5">
                <InteractiveMapClient />
              </div>

              {/* Contact rows */}
              <div className="flex flex-col gap-2.5">
                {[
                  { Icon: MapPin,         label: 'Adresse',   val: '[Adresse eintragen]',   href: null },
                  { Icon: Phone,          label: 'Telefon',   val: '06441 7890426',                  href: 'tel:+4964417890426' },
                  { Icon: MessageCircle,  label: 'WhatsApp',  val: '0176 25026991',                   href: 'https://wa.me/4917625026991' },
                  { Icon: Camera,      label: 'Instagram', val: '@aykin3d',               href: 'https://www.instagram.com/aykin3d' },
                ].map(({ Icon, label, val, href }) => (
                  <div key={label} className="bg-[#F2E8E0] rounded-[15px] p-[13px_17px] flex gap-[13px] items-center">
                    <div className="w-[38px] h-[38px] bg-[#C41E3A] rounded-full flex items-center justify-center shrink-0">
                      <Icon size={16} color="#fefefe" strokeWidth={2} />
                    </div>
                    <div>
                      <div className="font-nunito font-black text-[0.74rem] text-[#8A8A8A] uppercase tracking-[0.8px] mb-[1px]">{label}</div>
                      {href
                        ? <a href={href} className="font-nunito font-bold text-[0.88rem] text-[#1A1A1A] no-underline">{val}</a>
                        : <span className="font-nunito font-bold text-[0.88rem] text-[#1A1A1A]">{val}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Right: Hours + CTAs ── */}
            <div className="flex flex-col gap-8">
              {/* Opening hours */}
              <div>
                <h2 className="font-calistoga text-[1.7rem] text-[#1A1A1A] mb-4.5">
                  Öffnungszeiten
                </h2>
                <ClientHoursTable />
              </div>

              {/* Order / pickup CTAs */}
              <div>
                <h2 className="font-calistoga text-[1.7rem] text-[#1A1A1A] mb-4">
                  Bestellen & Abholen
                </h2>
                <div className="flex flex-col gap-3">
                  {[
                    { id: 'lieferando', title: 'Lieferando', sub: 'Keine Liefergebühr · Direkt nach Hause', Icon: Truck, accent: true, href: 'https://www.lieferando.de/speisekarte/aykin' },
                    { id: 'abholung',   title: 'Abholung',   sub: 'Vor Ort: Aykin Studio',        Icon: MapPin, accent: false, href: 'https://maps.google.com/?q=Aykin+Studio' },
                  ].map(c => (
                    <div key={c.id}
                      className="group bg-[#F2E8E0] rounded-[18px] p-5 flex justify-between items-center gap-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_6px_22px_rgba(196,30,58,0.13)]">
                      <div>
                        <div className="font-calistoga text-[1.1rem] text-[#1A1A1A] mb-1">{c.title}</div>
                        <div className="font-nunito text-[0.8rem] text-[#8A8A8A] mb-3">{c.sub}</div>
                        {c.accent
                          ? <PrimaryButton sectionBg="#F2E8E0" href={c.href}>Jetzt bestellen →</PrimaryButton>
                          : <SecondaryButton href={c.href}>Route planen →</SecondaryButton>}
                      </div>
                      <div className={`w-14 h-14 rounded-xl shrink-0 flex items-center justify-center ${c.accent ? 'bg-[#C41E3A]' : 'bg-[#E8D5C4]'}`}>
                        <c.Icon size={24} color={c.accent ? '#fefefe' : '#C41E3A'} strokeWidth={1.8} />
                      </div>
                    </div>
                  ))}
                </div>

                {/* No-fee badge */}
                <div className="mt-4.5 bg-[rgba(196,30,58,0.07)] border-[1.5px] border-[rgba(196,30,58,0.18)] rounded-xl p-[13px_17px] flex gap-2.5 items-center">
                  <div className="w-[26px] h-[26px] bg-[#C41E3A] rounded-full flex items-center justify-center shrink-0">
                    <span className="text-white text-[0.75rem] font-black">✓</span>
                  </div>
                  <p className="font-nunito text-[0.83rem] text-[#C41E3A] font-extrabold">
                    Keine Liefergebühr bei Lieferando — frisch direkt zu dir!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </FadeUp>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes blobFloat{0%,100%{transform:translate(0,0)}33%{transform:translate(6px,-10px)}66%{transform:translate(-5px,7px)}}
        .animate-blob-float { animation: blobFloat 10s ease-in-out infinite; }
        .animate-fade-in { animation: fadeIn 0.4s ease both; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(18px) } to { opacity: 1; transform: none } }
      `}} />
    </div>
      <SEOContentBlock visible={true} ariaLabel="Anfahrt, Parken & Tipps für deinen Besuch bei Aykin">
        <VisitSEO />
      </SEOContentBlock>
    </>
  );
}
