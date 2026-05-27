'use client';

import React, { useRef } from 'react';
import { SubpageHero } from '@/components/ui/SubpageHero';
import { Shield, Target, Heart, Eye, Zap, ArrowRight, Activity, Users } from 'lucide-react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const pathLength = useSpring(scrollYProgress, { stiffness: 100, damping: 20 });

  const milestones = [
    { year: '2020', title: 'Der erste Drucker', desc: 'In einer kleinen Garage in Wetzlar begann alles mit einem einfachen FDM-Drucker und der puren Faszination für das, was physisch machbar ist.', icon: <Target /> },
    { year: '2022', title: 'SLA Revolution', desc: 'Die Einführung der Stereolithographie (SLA) katapultierte unsere Druckqualität auf das Niveau der Spritzgusstechnik. Plötzlich wurden Mikro-Details möglich.', icon: <Shield /> },
    { year: '2024', title: 'Industrieller Standard', desc: 'Mit Carbonfaser-verstärkten Materialien können wir endlich echte funktionale Endbauteile liefern, die in der Automobil- und Luftfahrtbranche bestehen.', icon: <Activity /> },
    { year: 'Heute', title: 'Dein Partner für 3D', desc: 'Ein Team von unermüdlichen Enthusiasten, bereit für jedes noch so verrückte Projekt. Von der Skizze bis zur fertig montierten Baugruppe.', icon: <Users /> },
  ];

  return (
    <main className="min-h-screen bg-[#FAF8F5] overflow-x-hidden">
      <SubpageHero 
        label="ÜBER UNS"
        title="Unsere Geschichte."
        subtitle="Von der Garage zum High-Tech Labor. Eine unaufhaltsame Reise der Präzision."
      />

      <section className="py-32 px-6 max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
        >
          <h2 className="font-calistoga text-6xl md:text-8xl text-[#1A1A1A] mb-10 leading-[1.1]">
            Präzision aus <span className="text-[#C41E3A]">Leidenschaft</span>.
          </h2>
          <p className="text-2xl md:text-4xl text-[#2D2D2D] leading-relaxed font-light mb-8">
            Wir glauben fest daran, dass bahnbrechende Ideen physisch greifbar sein sollten. Und zwar in absolut kompromissloser Qualität, ohne Wenn und Aber.
          </p>
          <p className="text-xl text-gray-500 max-w-3xl mx-auto leading-relaxed">
            Egal ob du ein Oldtimer-Ersatzteil brauchst, das es seit 30 Jahren nicht mehr gibt, oder ob dein Tech-Startup hunderte Gehäuse für einen ersten Prototypen-Run benötigt – wir beraten, modellieren und drucken mit der Hingabe von Kunsthandwerkern.
          </p>
        </motion.div>
      </section>

      {/* INTERACTIVE TIMELINE */}
      <section ref={containerRef} className="py-48 relative bg-white overflow-hidden">
        
        {/* Core Animated Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-1 md:w-2 bg-[#E8D5C4] -translate-x-1/2 hidden md:block">
          <motion.div 
            className="absolute top-0 left-0 right-0 bg-[#C41E3A] origin-top rounded-full shadow-[0_0_20px_rgba(196,30,58,0.8)]"
            style={{ scaleY: pathLength, height: '100%' }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-32">
            <h3 className="font-calistoga text-5xl md:text-6xl">Die Aykin Timeline</h3>
          </div>
          
          {milestones.map((item, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <TimelineItem 
                key={idx} 
                item={item} 
                isEven={isEven} 
                idx={idx} 
              />
            );
          })}
        </div>
      </section>

      {/* CORE VALUES STATS GRID */}
      <section className="py-32 px-6 bg-[#1A1A1A] text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <ValueCard 
              icon={<Heart size={40} />} 
              title="100% Hingabe" 
              desc="Jedes Projekt wird behandelt, als wäre es unser eigenes. Kein Bauteil verlässt unser Labor ohne strenge Qualitätskontrolle." 
            />
            <ValueCard 
              icon={<Eye size={40} />} 
              title="Auge fürs Detail" 
              desc="Wir jagen Perfektion bis in den Mikrometer-Bereich. Wo andere aufhören, fangen wir erst richtig an." 
              delay={0.2}
            />
            <ValueCard 
              icon={<Zap size={40} />} 
              title="Maximale Agilität" 
              desc="Schnelle Iterationen sind der Schlüssel zum Erfolg. Wir liefern Prototypen oft schon innerhalb von 48 Stunden." 
              delay={0.4}
            />
          </div>
        </div>
      </section>

    </main>
  );
}

function TimelineItem({ item, isEven, idx }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 100, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-200px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`flex flex-col md:flex-row items-center justify-between mb-32 md:mb-48 ${isEven ? 'md:flex-row-reverse' : ''}`}
    >
      <div className="w-full md:w-5/12 hidden md:block" />
      
      {/* Node */}
      <div className="w-20 h-20 rounded-full bg-[#1A1A1A] border-4 border-white shadow-2xl flex items-center justify-center text-white my-8 md:my-0 z-20 relative group">
        <div className="absolute inset-0 rounded-full bg-[#C41E3A] scale-0 group-hover:scale-100 transition-transform duration-500 z-0" />
        <div className="z-10 relative">
          {React.cloneElement(item.icon, { size: 32 })}
        </div>
      </div>

      <div className={`w-full md:w-5/12 bg-[#FAF8F5] p-12 md:p-16 rounded-[3rem] border border-[#E8D5C4] hover:border-[#C41E3A]/50 hover:shadow-2xl transition-all duration-700 relative overflow-hidden group ${isEven ? 'md:text-right' : 'md:text-left'} text-center md:text-left`}>
        
        {/* Background glow on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#C41E3A]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        
        <div className="text-[#C41E3A] font-calistoga text-8xl md:text-9xl opacity-[0.03] absolute -top-10 -right-10 pointer-events-none transform group-hover:scale-110 transition-transform duration-700">
          {item.year}
        </div>
        
        <div className="relative z-10">
          <h4 className="text-[#C41E3A] font-bold tracking-[0.3em] uppercase mb-4 md:text-xl">{item.year}</h4>
          <h3 className="font-calistoga text-4xl md:text-5xl text-[#1A1A1A] mb-6 leading-tight">{item.title}</h3>
          <p className="text-[#2D2D2D] text-xl leading-relaxed">{item.desc}</p>
        </div>
      </div>
    </motion.div>
  );
}

function ValueCard({ icon, title, desc, delay = 0 }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay }}
      className="bg-[#2a2a2a] p-12 rounded-[3rem] border border-white/10 hover:border-[#C41E3A]/50 transition-colors duration-500 group"
    >
      <div className="w-20 h-20 bg-white/5 rounded-2xl flex items-center justify-center text-[#C41E3A] mb-8 group-hover:scale-110 group-hover:bg-[#C41E3A] group-hover:text-white transition-all duration-500">
        {icon}
      </div>
      <h3 className="font-calistoga text-3xl mb-4">{title}</h3>
      <p className="text-gray-400 text-lg leading-relaxed">{desc}</p>
    </motion.div>
  );
}
