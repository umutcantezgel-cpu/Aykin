import React from 'react';
import { FadeUp } from '@/components/ui/FadeUp';
import { NewsletterInput } from '@/components/molecules/forms/NewsletterInput';

export function NewsletterSection() {
  return (
    <section className="bg-[#FAF8F5] py-20 text-center">
      <FadeUp className="max-w-[600px] mx-auto px-6">
        <h2 className="font-calistoga text-[clamp(1.7rem,3.5vw,2.7rem)] text-[#1A1A1A] mb-4 leading-[1.1]">
          Immer auf dem Laufenden
        </h2>
        <p className="font-nunito text-[0.97rem] text-[#4A4A4A] leading-[1.85] mb-7 max-w-[440px] mx-auto">
          Abonniere unseren Newsletter für exklusive Angebote und die neuesten 3D-Druck Projekte.
        </p>
        <div className="flex justify-center">
          <NewsletterInput className="w-full max-w-[320px]" />
        </div>
      </FadeUp>
    </section>
  );
}
