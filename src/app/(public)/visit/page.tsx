'use client';

import React, { useRef, useState, useEffect } from "react";
import { VisitSEO } from "@/content/seo/VisitSEO";
import { SEOContentBlock } from "@/components/seo/SEOContentBlock";
import { FadeUp } from "@/components/ui/FadeUp";
import { PrimaryButton, SecondaryButton } from "@/components/ui/Btn";
import { MapPin, Phone, MessageCircle, Truck, Camera, Navigation, Star, Clock, Info, CheckCircle2, Navigation2, Compass, Map, Coffee } from "lucide-react";
import { ClientHoursTable } from "@/components/ui/ClientHoursTable";
import { InteractiveMapClient } from '@/components/ui/InteractiveMapClient';
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from "framer-motion";

const ParallaxImage = ({ src, alt, yOffset = 100, scaleOnScroll = false, className = "" }: any) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-yOffset, yOffset]);
  const scale = useTransform(scrollYProgress, [0, 1], scaleOnScroll ? [1, 1.15] : [1, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <motion.div ref={ref} style={{ y, opacity }} className={`relative overflow-hidden rounded-[32px] ${className}`}>
      <motion.div style={{ scale }} className="w-full h-full relative">
        <img src={src} alt={alt} className="w-full h-full object-cover rounded-[32px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 rounded-[32px]" />
      </motion.div>
    </motion.div>
  );
};

const FloatingStatPill = ({ icon: Icon, value, label, delay = 0, color = "#C41E3A", className = "" }: any) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.8 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay, type: "spring", bounce: 0.4 }}
      whileHover={{ scale: 1.05, y: -5 }}
      className={`absolute z-20 flex items-center gap-4 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/40 ${className}`}
    >
      <div className={`w-12 h-12 rounded-full flex items-center justify-center`} style={{ backgroundColor: color }}>
        <Icon size={24} color="#fff" />
      </div>
      <div>
        <div className="font-calistoga text-2xl text-[#1A1A1A] leading-none mb-1">{value}</div>
        <div className="font-nunito text-xs font-black text-[#8A8A8A] uppercase tracking-wider">{label}</div>
      </div>
    </motion.div>
  );
};

const ScrollingTypography = ({ text, direction = 1, speed = 1 }: any) => {
  const { scrollY } = useScroll();
  const x = useTransform(scrollY, [0, 2000], [0, 500 * direction * speed]);
  const springX = useSpring(x, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <div className="overflow-hidden whitespace-nowrap py-10 opacity-10 pointer-events-none select-none">
      <motion.h2 
        style={{ x: springX }}
        className="font-calistoga text-[15vw] text-[#1A1A1A] uppercase tracking-tighter leading-none"
      >
        {text} {text} {text} {text}
      </motion.h2>
    </div>
  );
};

export default function VisitPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.1], [1, 0.95]);
  const heroY = useTransform(scrollYProgress, [0, 0.1], [0, 100]);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#FAF8F5] relative">
      {/* MASSIVE HERO PARALLAX SECTION */}
      <motion.section 
        style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
        className="sticky top-0 h-screen bg-[#F2E8E0] flex flex-col items-center justify-center px-6 overflow-hidden z-0"
      >
        <div className="absolute inset-0 opacity-[0.22] dot-bg" />
        
        {/* Animated Background Blobs */}
        <motion.div 
          animate={{ 
            rotate: 360,
            scale: [1, 1.2, 1],
            borderRadius: ["40% 60% 70% 30%", "60% 40% 30% 70%", "40% 60% 70% 30%"]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] right-[-5%] w-[50vw] h-[50vw] bg-[#E8D5C4] opacity-40 blur-3xl" 
        />
        <motion.div 
          animate={{ 
            rotate: -360,
            scale: [1, 1.3, 1],
            borderRadius: ["60% 40% 30% 70%", "40% 60% 70% 30%", "60% 40% 30% 70%"]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-[#C41E3A] opacity-10 blur-3xl" 
        />

        <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, type: "spring", bounce: 0.2 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 backdrop-blur-md border border-white/40 shadow-sm mb-8">
              <MapPin size={16} className="text-[#C41E3A]" />
              <span className="font-nunito font-bold text-sm text-[#4A4A4A] tracking-wider uppercase">Standort Wetzlar</span>
            </div>
            <h1 className="font-calistoga text-[clamp(3.5rem,8vw,7rem)] text-[#1A1A1A] leading-[0.95] tracking-tight mb-6 drop-shadow-sm">
              Entdecke den <br />
              <span className="text-[#C41E3A] relative inline-block">
                Geschmack
                <motion.svg 
                  className="absolute -bottom-2 left-0 w-full h-4 text-[#C41E3A] opacity-50"
                  viewBox="0 0 100 20" preserveAspectRatio="none"
                >
                  <motion.path 
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, delay: 1 }}
                    d="M0 10 Q 25 20, 50 10 T 100 10" 
                    fill="none" stroke="currentColor" strokeWidth="4" 
                  />
                </motion.svg>
              </span>
            </h1>
            <p className="font-nunito text-[clamp(1.1rem,2vw,1.4rem)] text-[#4A4A4A] max-w-2xl mx-auto leading-relaxed">
              Tauche ein in eine Welt voller Aromen. Besuche unser Studio vor Ort oder lass dir unser Erlebnis direkt nach Hause liefern.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-12 flex gap-4"
          >
            <PrimaryButton sectionBg="#F2E8E0" href="#location" className="px-8 py-4 text-lg">Route planen <Navigation2 size={20} className="ml-2" /></PrimaryButton>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="font-nunito text-xs font-bold text-[#8A8A8A] uppercase tracking-[0.2em]">Scrollen</span>
          <div className="w-[2px] h-[40px] bg-gradient-to-b from-[#8A8A8A] to-transparent rounded-full" />
        </motion.div>
      </motion.section>

      {/* VIRTUAL PARALLAX TOUR */}
      <section className="relative z-10 bg-[#FAF8F5] pt-24 pb-40 overflow-hidden">
        <ScrollingTypography text="Wetzlar Aykin Studio" direction={1} speed={1.5} />
        
        <div className="max-w-[1400px] mx-auto px-6 mt-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-5 relative h-[70vh] min-h-[600px]">
              <ParallaxImage 
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=2000&auto=format&fit=crop"
                alt="Restaurant Interior"
                yOffset={150}
                scaleOnScroll
                className="w-full h-full shadow-2xl"
              />
              <FloatingStatPill 
                icon={Star} value="4.9/5" label="Google Reviews" 
                className="top-10 -left-10 lg:-left-20" delay={0.2} color="#F59E0B"
              />
              <FloatingStatPill 
                icon={Coffee} value="100%" label="Handgemacht" 
                className="bottom-20 -right-10 lg:-right-16" delay={0.4} color="#3B82F6"
              />
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              <FadeUp className="mb-8">
                <h2 className="font-calistoga text-5xl lg:text-7xl text-[#1A1A1A] mb-6 leading-tight">
                  Architektur <br/><span className="text-[#8A8A8A]">& Atmosphäre</span>
                </h2>
                <p className="font-nunito text-xl text-[#4A4A4A] leading-relaxed mb-10">
                  Unser Studio in Wetzlar vereint modernes Design mit gemütlicher Gastfreundschaft. Ein Ort, der dazu einlädt, den Moment zu genießen, sich auszutauschen und kulinarische Highlights zu erleben.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { icon: Compass, title: "Zentral Gelegen", desc: "Direkt im Herzen von Wetzlar, leicht erreichbar." },
                    { icon: Camera, title: "Fotogen", desc: "Jeder Winkel ist ein perfektes Motiv." },
                  ].map((item, i) => (
                    <div key={i} className="bg-white rounded-[24px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#F2E8E0]/50 transition-transform hover:-translate-y-2">
                      <div className="w-12 h-12 bg-[#F2E8E0] rounded-2xl flex items-center justify-center mb-4 text-[#C41E3A]">
                        <item.icon size={24} />
                      </div>
                      <h3 className="font-calistoga text-xl text-[#1A1A1A] mb-2">{item.title}</h3>
                      <p className="font-nunito text-sm text-[#8A8A8A] leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </FadeUp>
            </div>
          </div>
        </div>

        <ScrollingTypography text="Erlebe Den Moment" direction={-1} speed={1.2} />

        {/* Second Parallax Block */}
        <div className="max-w-[1400px] mx-auto px-6 mt-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-5 lg:order-2 relative h-[60vh] min-h-[500px]">
              <ParallaxImage 
                src="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=2000&auto=format&fit=crop"
                alt="Details and Food"
                yOffset={-100}
                className="w-full h-full shadow-2xl"
              />
              <FloatingStatPill 
                icon={CheckCircle2} value="Premium" label="Qualität" 
                className="top-1/2 -translate-y-1/2 -left-16" delay={0.3} color="#10B981"
              />
            </div>

            <div className="lg:col-span-6 lg:order-1">
              <FadeUp>
                <h2 className="font-calistoga text-5xl lg:text-7xl text-[#1A1A1A] mb-6 leading-tight">
                  Liebe zum <br/><span className="text-[#C41E3A]">Detail</span>
                </h2>
                <p className="font-nunito text-xl text-[#4A4A4A] leading-relaxed mb-10">
                  Von der sorgfältigen Auswahl unserer Zutaten bis hin zur Präsentation auf dem Teller – wir überlassen nichts dem Zufall.
                </p>
                <ul className="space-y-6">
                  {['Täglich frisch zubereitet', 'Regionale Lieferanten', 'Einzigartige Rezepturen', 'Passion für Geschmack'].map((text, i) => (
                    <li key={i} className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-[#C41E3A]/10 flex items-center justify-center shrink-0">
                        <CheckCircle2 size={16} className="text-[#C41E3A]" />
                      </div>
                      <span className="font-nunito font-bold text-lg text-[#1A1A1A]">{text}</span>
                    </li>
                  ))}
                </ul>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      {/* LOCATION & INFO SECTION */}
      <section id="location" className="relative z-20 bg-white py-32 rounded-t-[40px] shadow-[0_-20px_50px_rgba(0,0,0,0.03)] border-t border-[#F2E8E0]">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="font-calistoga text-5xl md:text-6xl text-[#1A1A1A] mb-6">Wir erwarten dich</h2>
            <p className="font-nunito text-xl text-[#8A8A8A] max-w-2xl mx-auto">
              Finde deinen Weg zu uns oder kontaktiere uns bei Fragen. Wir haben immer ein offenes Ohr für dich.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Map Column */}
            <div className="lg:col-span-7">
              <div className="bg-[#FAF8F5] p-3 rounded-[32px] shadow-sm border border-[#F2E8E0]">
                <div className="rounded-[24px] overflow-hidden h-[600px] relative">
                  <InteractiveMapClient />
                  
                  {/* Overlay Info on Map */}
                  <div className="absolute bottom-6 left-6 right-6 md:right-auto md:w-[350px] bg-white/95 backdrop-blur-xl p-6 rounded-2xl shadow-2xl border border-white">
                    <h3 className="font-calistoga text-2xl text-[#1A1A1A] mb-2">Aykin Studio</h3>
                    <p className="font-nunito text-[#4A4A4A] mb-4">Musterstraße 123<br/>35578 Wetzlar, Germany</p>
                    <a href="https://maps.google.com/?q=Aykin+Studio" target="_blank" rel="noreferrer" className="flex items-center justify-center w-full bg-[#1A1A1A] text-white py-3 rounded-xl font-nunito font-bold hover:bg-[#C41E3A] transition-colors gap-2">
                      <Navigation size={18} /> Route starten
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Info Column */}
            <div className="lg:col-span-5 flex flex-col gap-10">
              
              {/* Hours */}
              <div className="bg-[#F2E8E0] rounded-[32px] p-8 md:p-10 relative overflow-hidden">
                <div className="absolute -top-10 -right-10 text-white/40">
                  <Clock size={150} strokeWidth={1} />
                </div>
                <div className="relative z-10">
                  <h3 className="font-calistoga text-3xl text-[#1A1A1A] mb-8 flex items-center gap-3">
                    <Clock size={28} className="text-[#C41E3A]" /> Öffnungszeiten
                  </h3>
                  <ClientHoursTable />
                </div>
              </div>

              {/* Contact Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { Icon: Phone, label: 'Telefon', val: '06441 7890426', href: 'tel:+4964417890426', color: '#3B82F6' },
                  { Icon: MessageCircle, label: 'WhatsApp', val: '0176 25026991', href: 'https://wa.me/4917625026991', color: '#10B981' },
                  { Icon: Camera, label: 'Instagram', val: '@aykin3d', href: 'https://www.instagram.com/aykin3d', color: '#E1306C' },
                  { Icon: Truck, label: 'Lieferung', val: 'Lieferando', href: 'https://www.lieferando.de/speisekarte/aykin', color: '#FF8000' },
                ].map(({ Icon, label, val, href, color }) => (
                  <a key={label} href={href} target="_blank" rel="noreferrer" className="group block bg-[#FAF8F5] rounded-[24px] p-6 border border-[#F2E8E0] transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-transparent" style={{ '--hover-color': color } as any}>
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-colors duration-300 group-hover:text-white" style={{ backgroundColor: `${color}15`, color: color }}>
                      <Icon size={24} className="group-hover:text-[#1A1A1A]" />
                    </div>
                    <div className="font-nunito font-black text-xs text-[#8A8A8A] uppercase tracking-wider mb-1">{label}</div>
                    <div className="font-nunito font-bold text-lg text-[#1A1A1A] truncate">{val}</div>
                  </a>
                ))}
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="bg-[#1A1A1A] py-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <FadeUp>
            <h2 className="font-calistoga text-5xl md:text-7xl text-white mb-8">Hungrig geworden?</h2>
            <p className="font-nunito text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
              Bestelle jetzt bequem online oder besuche uns im Studio. Wir freuen uns auf dich!
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a href="https://www.lieferando.de/speisekarte/aykin" target="_blank" rel="noreferrer" className="bg-[#FF8000] text-white px-10 py-5 rounded-[20px] font-nunito font-bold text-xl flex items-center gap-3 hover:bg-[#e67300] transition-colors shadow-[0_10px_30px_rgba(255,128,0,0.3)] hover:-translate-y-1 transform duration-300">
                <Truck size={24} /> Auf Lieferando bestellen
              </a>
              <a href="https://maps.google.com/?q=Aykin+Studio" target="_blank" rel="noreferrer" className="bg-white/10 text-white px-10 py-5 rounded-[20px] font-nunito font-bold text-xl flex items-center gap-3 hover:bg-white/20 transition-colors backdrop-blur-md">
                <Map size={24} /> Route planen
              </a>
            </div>
            
            <div className="mt-12 flex items-center justify-center gap-3 text-white/60">
              <CheckCircle2 size={18} className="text-[#10B981]" />
              <span className="font-nunito text-sm">Keine Liefergebühr bei Lieferando.</span>
            </div>
          </FadeUp>
        </div>
      </section>

      <SEOContentBlock visible={true} ariaLabel="Anfahrt, Parken & Tipps für deinen Besuch bei Aykin">
        <VisitSEO />
      </SEOContentBlock>
    </div>
  );
}
