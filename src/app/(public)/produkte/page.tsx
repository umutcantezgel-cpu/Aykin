'use client';

import React, { useRef } from 'react';
import { SubpageHero } from '@/components/ui/SubpageHero';
import { Box, Layers, Play, Cpu, Zap, Maximize, Printer, ShieldCheck, ArrowRight, ArrowDown } from 'lucide-react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { PrimaryCTA, SecondaryCTA } from '@/components/atoms/buttons';
import { TransitionLink } from '@/components/ui/TransitionLink';

export default function ProduktePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { damping: 15, stiffness: 100 });

  // 3D Parallax Gallery Transforms
  const z1 = useTransform(smoothProgress, [0, 0.3], [0, 800]);
  const opacity1 = useTransform(smoothProgress, [0, 0.15, 0.25], [1, 1, 0]);
  const scale1 = useTransform(smoothProgress, [0, 0.25], [1, 1.8]);
  const rotateX1 = useTransform(smoothProgress, [0, 0.3], [0, 60]);

  const z2 = useTransform(smoothProgress, [0.1, 0.4], [-800, 800]);
  const opacity2 = useTransform(smoothProgress, [0.1, 0.25, 0.35], [0, 1, 0]);
  const scale2 = useTransform(smoothProgress, [0.1, 0.4], [0.6, 1.8]);
  const rotateX2 = useTransform(smoothProgress, [0.1, 0.4], [-40, 40]);

  const z3 = useTransform(smoothProgress, [0.2, 0.5], [-800, 800]);
  const opacity3 = useTransform(smoothProgress, [0.2, 0.35, 0.45], [0, 1, 0]);
  const scale3 = useTransform(smoothProgress, [0.2, 0.5], [0.6, 1.8]);
  const rotateX3 = useTransform(smoothProgress, [0.2, 0.5], [-40, 20]);

  return (
    <main className="bg-white min-h-screen selection:bg-[#C41E3A] selection:text-white">
      <SubpageHero 
        label="PORTFOLIO"
        title="Unsere Produkte & Prototypen."
        subtitle="Erlebe die Dimensionen unserer Arbeit. Von funktionalen Prototypen bis hin zu extrem präzisen Miniaturen."
      />

      {/* 3D PARALLAX GALLERY - SCROLLYTELLING CONTAINER */}
      <section ref={containerRef} className="relative h-[300vh] bg-[#1A1A1A]">
        <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center perspective-[1200px]">
          
          <motion.div className="absolute inset-0 z-0 bg-grid-white/[0.03] bg-[length:60px_60px]" />
          
          <div className="absolute top-10 flex flex-col items-center justify-center pointer-events-none z-50">
             <motion.div 
               style={{ opacity: useTransform(smoothProgress, [0, 0.05], [1, 0]) }}
               className="flex flex-col items-center gap-4 text-white/50"
             >
                <span className="font-calistoga tracking-widest text-sm">SCROLL TO EXPLORE</span>
                <ArrowDown className="animate-bounce" />
             </motion.div>
          </div>

          <motion.div 
            style={{ z: z1, opacity: opacity1, scale: scale1, rotateX: rotateX1 }}
            className="absolute w-[90%] max-w-4xl aspect-video bg-gradient-to-br from-[#2a2a2a] to-[#1A1A1A] border border-white/10 rounded-[3rem] p-8 md:p-16 shadow-[0_30px_100px_rgba(0,0,0,0.8)] flex flex-col items-center justify-center gap-8"
          >
            <div className="w-28 h-28 rounded-full bg-[#C41E3A]/20 flex items-center justify-center border border-[#C41E3A]/50">
              <Box size={56} className="text-[#C41E3A]" />
            </div>
            <h3 className="font-calistoga text-5xl md:text-7xl text-white text-center">Industrie Bauteile</h3>
            <p className="text-[#A1A1AA] text-center text-xl md:text-2xl max-w-2xl">Extreme Belastbarkeit durch Carbon-Faserverstärkung. Entwickelt für den echten Einsatz unter extremen Bedingungen.</p>
          </motion.div>

          <motion.div 
            style={{ z: z2, opacity: opacity2, scale: scale2, rotateX: rotateX2 }}
            className="absolute w-[90%] max-w-4xl aspect-video bg-gradient-to-br from-[#FAF8F5] to-white border border-[#E8D5C4] rounded-[3rem] p-8 md:p-16 shadow-[0_30px_100px_rgba(0,0,0,0.3)] flex flex-col items-center justify-center gap-8"
          >
            <div className="w-28 h-28 rounded-full bg-[#1A1A1A]/5 flex items-center justify-center border border-[#1A1A1A]/10">
              <Layers size={56} className="text-[#1A1A1A]" />
            </div>
            <h3 className="font-calistoga text-5xl md:text-7xl text-[#1A1A1A] text-center">Architekturmodelle</h3>
            <p className="text-[#2D2D2D] text-center text-xl md:text-2xl max-w-2xl">SLA-Präzision bis in den Mikrometer-Bereich. Wir drucken Details, die mit dem bloßen Auge kaum sichtbar sind.</p>
          </motion.div>

          <motion.div 
            style={{ z: z3, opacity: opacity3, scale: scale3, rotateX: rotateX3 }}
            className="absolute w-[90%] max-w-4xl aspect-video bg-gradient-to-br from-[#C41E3A] to-[#9a152d] border border-white/20 rounded-[3rem] p-8 md:p-16 shadow-[0_30px_100px_rgba(196,30,58,0.5)] flex flex-col items-center justify-center gap-8 text-white"
          >
            <div className="w-28 h-28 rounded-full bg-white/10 flex items-center justify-center border border-white/20 backdrop-blur-sm">
              <Play size={56} className="text-white fill-white" />
            </div>
            <h3 className="font-calistoga text-5xl md:text-7xl text-white text-center">Gehäuse & Prototypen</h3>
            <p className="text-white/80 text-center text-xl md:text-2xl max-w-2xl">Von der ersten Skizze zum funktionierenden Produkt in Rekordzeit. Iteriere wöchentlich, nicht jährlich.</p>
          </motion.div>

        </div>
      </section>

      {/* DEEP DIVE SECTION 1: Industrie */}
      <DeepDiveSection 
        title="Industrial Grade FDM."
        subtitle="Unzerstörbare Leichtigkeit."
        description="Unsere industriellen FDM-Drucker verarbeiten Hochleistungspolymere und kohlefaserverstärkte Materialien. Das Resultat: Bauteile, die Aluminium ersetzen können, bei einem Bruchteil des Gewichts. Ideal für Vorrichtungen, Greifer und Funktionsteile, die unter Dauerbelastung stehen."
        features={["Onyx & Carbon-Endlosfaser", "Kevlar & Glasfaser Verstärkung", "Hitze-resistent bis 250°C", "Extreme Chemikalienresistenz"]}
        icon={<Cpu size={48} className="text-[#C41E3A]" />}
        bgColor="bg-[#FAF8F5]"
        textColor="text-[#1A1A1A]"
      />

      {/* DEEP DIVE SECTION 2: Architektur */}
      <DeepDiveSection 
        title="Micro-Präzision SLA."
        subtitle="Sichtbare Perfektion."
        description="Mit modernster Stereolithographie härten wir flüssiges Harz mit UV-Lasern punktgenau aus. Schichtdicken von bis zu 25 Mikrometern ermöglichen glatte Oberflächen wie gegossen – perfekt für anspruchsvolle Architekturmodelle und filigrane Meisterwerke, wo jeder Millimeter zählt."
        features={["Ultra-glatte Oberflächen", "Transparente Harz-Optionen", "Zahntechnik-Level Präzision", "25µm minimale Schichtdicke"]}
        icon={<Maximize size={48} className="text-[#C41E3A]" />}
        bgColor="bg-white"
        textColor="text-[#1A1A1A]"
        reverse
      />

      {/* DEEP DIVE SECTION 3: Gehäuse */}
      <DeepDiveSection 
        title="Rapid Prototyping."
        subtitle="Dein Startup Booster."
        description="Monatelange Wartezeiten auf Spritzgussformen gehören der Vergangenheit an. Wir drucken Gehäuse in Endkunden-Qualität. Konstruiere mit integrierten Snap-Fits, lebenden Scharnieren und einpressbaren Gewindeeinsätzen. Bring dein Produkt sofort in die Hände deiner Tester."
        features={["Snap-Fit & Scharnier-fähig", "Integrierte Gewindeeinsätze", "Serienfertigung ab 1 Stück", "Vielfältige Farben & Finishes"]}
        icon={<Zap size={48} className="text-white fill-white" />}
        bgColor="bg-[#1A1A1A]"
        textColor="text-white"
      />

      {/* CALL TO ACTION */}
      <section className="py-32 px-6 bg-[#C41E3A] text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-grid-white/[0.1] bg-[length:30px_30px] opacity-50" />
        <div className="max-w-5xl mx-auto text-center relative z-10 flex flex-col items-center">
          <h2 className="font-calistoga text-5xl md:text-8xl mb-8">Bereit für den Druck?</h2>
          <p className="text-xl md:text-3xl font-light mb-12 opacity-90 max-w-3xl leading-relaxed">
            Egal ob einzelne Sonderanfertigung oder Serienproduktion. Wir machen deine Idee physisch greifbar.
          </p>
          <div className="flex flex-col sm:flex-row gap-6">
            <TransitionLink href="/anfrage">
              <PrimaryCTA className="py-6 px-12 text-xl bg-white text-[#C41E3A] hover:bg-gray-100 hover:text-[#9a152d] border-none shadow-xl">
                Projekt anfragen
              </PrimaryCTA>
            </TransitionLink>
            <TransitionLink href="/kontakt">
              <SecondaryCTA className="py-6 px-12 text-xl text-white border-white hover:bg-white/10">
                Beratungstermin
              </SecondaryCTA>
            </TransitionLink>
          </div>
        </div>
      </section>
    </main>
  );
}

function DeepDiveSection({ title, subtitle, description, features, icon, bgColor, textColor, reverse = false }: any) {
  return (
    <section className={`py-32 md:py-48 px-6 ${bgColor} overflow-hidden`}>
      <div className={`max-w-7xl mx-auto flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-16 md:gap-32`}>
        <motion.div 
          initial={{ opacity: 0, x: reverse ? 100 : -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-150px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex-1 space-y-8"
        >
          <div className={`w-24 h-24 rounded-3xl ${textColor === 'text-white' ? 'bg-white/10 border-white/20' : 'bg-[#C41E3A]/10 border-[#C41E3A]/20'} flex items-center justify-center border shadow-xl`}>
            {icon}
          </div>
          <div>
            <p className={`${textColor === 'text-white' ? 'text-white' : 'text-[#C41E3A]'} font-bold tracking-[0.2em] uppercase mb-4 text-sm md:text-base`}>{subtitle}</p>
            <h2 className={`font-calistoga text-6xl md:text-8xl mb-8 ${textColor} leading-[1.1]`}>{title}</h2>
            <p className={`text-2xl md:text-3xl leading-relaxed ${textColor === 'text-white' ? 'text-gray-400' : 'text-gray-600'} font-light`}>
              {description}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-10">
            {features.map((feature: string, idx: number) => (
              <div key={idx} className={`flex items-center gap-4 ${textColor === 'text-white' ? 'text-gray-300' : 'text-[#1A1A1A]'} text-lg`}>
                <ShieldCheck size={28} className={textColor === 'text-white' ? 'text-white' : 'text-[#C41E3A]'} />
                <span className="font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8, rotateY: reverse ? -25 : 25 }}
          whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
          viewport={{ once: true, margin: "-150px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex-1 w-full aspect-square relative perspective-[1000px]"
        >
          <div className={`w-full h-full rounded-[4rem] ${textColor === 'text-white' ? 'bg-gradient-to-tr from-[#2a2a2a] to-[#1a1a1a] border-[#333]' : 'bg-gradient-to-tr from-[#F5F5F5] to-white border-[#E8D5C4]'} border shadow-2xl flex items-center justify-center overflow-hidden relative transform-gpu group`}>
            {/* Abstract Decorative Elements inside the image box */}
            <motion.div 
              animate={{ 
                rotate: [0, 360],
              }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="absolute w-[200%] h-[200%] bg-gradient-to-br from-[#C41E3A]/10 via-transparent to-transparent pointer-events-none"
            />
            <Printer size={160} className={`${textColor === 'text-white' ? 'text-white' : 'text-[#C41E3A]'} opacity-20 group-hover:scale-110 transition-transform duration-700`} />
            
            {/* Glassmorphism Badge */}
            <div className={`absolute bottom-10 left-10 right-10 ${textColor === 'text-white' ? 'bg-black/50 border-white/10 text-white' : 'bg-white/80 border-white text-[#1A1A1A]'} backdrop-blur-xl border rounded-2xl p-6 flex items-center justify-between shadow-lg transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500`}>
               <div>
                  <p className="font-bold text-lg">Präzisions-Demo</p>
                  <p className="text-sm opacity-70">Interaktive 3D Ansicht in Kürze verfügbar</p>
               </div>
               <div className={`w-12 h-12 rounded-full flex items-center justify-center ${textColor === 'text-white' ? 'bg-white text-black' : 'bg-[#C41E3A] text-white'}`}>
                  <ArrowRight />
               </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
