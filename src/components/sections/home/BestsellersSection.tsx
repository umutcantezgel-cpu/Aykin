'use client';

import React from 'react';
import { BESTSELLERS } from '@/lib/data';
import { FadeUp } from '@/components/ui/FadeUp';
import { SectionTitle } from '@/components/ui/LayoutBlocks';
import { HoloTiltCard } from '@/components/ui/HoloTiltCard';
import { PrimaryButton } from '@/components/ui/Btn';
import { TransitionLink } from '@/components/ui/TransitionLink';

export function BestsellersSection() {
  const bestsellers = BESTSELLERS.slice(0, 4);

  if (bestsellers.length === 0) return null;

  return (
    <section className="bg-[#F2E8E0] py-20 relative">
      <div className="absolute top-0 left-0 right-0 leading-none">
        <svg viewBox="0 0 1440 44" className="block w-full h-[44px]" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0,22 C360,44 720,0 1080,22 C1260,33 1380,18 1440,22 L1440,0 L0,0 Z" fill="#F2E8E0" />
        </svg>
      </div>

      <FadeUp className="max-w-[1200px] mx-auto px-6 pt-7">
        <SectionTitle sub="Höchste Präzision und individuelle Fertigung — das überzeugt.">Unsere Highlights</SectionTitle>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {bestsellers.map((item) => (
            <HoloTiltCard key={item.id} item={item as any} />
          ))}
        </div>
        <div className="text-center mt-10">
          <TransitionLink href="/menu">
            <PrimaryButton large sectionBg="#F2E8E0">Alle Produkte ansehen</PrimaryButton>
          </TransitionLink>
        </div>
      </FadeUp>
    </section>
  );
}
