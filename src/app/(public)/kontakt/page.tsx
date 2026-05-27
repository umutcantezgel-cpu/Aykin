'use client';

import React, { useState } from 'react';
import { SubpageHero } from '@/components/ui/SubpageHero';
import { MapPin, Mail, Phone, Plus, Minus, ArrowRight, MessageSquare } from 'lucide-react';
import { PrimaryCTA } from '@/components/atoms/buttons';
import { TransitionLink } from '@/components/ui/TransitionLink';
import { motion, AnimatePresence } from 'framer-motion';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">
      <SubpageHero 
        label="KONTAKT"
        title="Sag Hallo zu Aykin."
        subtitle="Dein Projekt wartet. Lass uns darüber sprechen, wie wir deine verrücktesten Ideen in die 3D-Realität verwandeln können."
      />

      <section className="py-32 md:py-48 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          
          <div className="flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="font-calistoga text-6xl md:text-8xl text-[#1A1A1A] mb-12 leading-[1.1]">
                Lass uns <br/><span className="text-[#C41E3A]">loslegen.</span>
              </h2>
              
              <div className="space-y-12 mb-20">
                <ContactRow icon={<MapPin size={32} />} title="Standort Wetzlar" desc="Termine nur nach Vereinbarung. Wir drucken lokal, liefern global. Komm vorbei auf einen Kaffee!" />
                <ContactRow icon={<Mail size={32} />} title="Email" desc="hello@aykin.de" isLink href="mailto:hello@aykin.de" />
                <ContactRow icon={<Phone size={32} />} title="Telefon" desc="+49 (0) 123 456 789" isLink href="tel:+49123456789" />
              </div>

              <TransitionLink href="/anfrage">
                <PrimaryCTA className="py-8 px-12 text-2xl w-fit group shadow-2xl hover:shadow-[0_20px_40px_rgba(196,30,58,0.3)] transition-all duration-500" showArrow>
                  Projekt direkt anfragen
                </PrimaryCTA>
              </TransitionLink>
            </motion.div>
          </div>

          {/* INTERACTIVE RADAR / NODE NETWORK */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full aspect-square bg-[#1A1A1A] rounded-[4rem] overflow-hidden flex items-center justify-center shadow-[0_30px_100px_rgba(0,0,0,0.5)] border-4 border-white"
          >
             <RadarNetwork />
          </motion.div>

        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-32 px-6 bg-[#FAF8F5]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="font-calistoga text-5xl md:text-7xl text-[#1A1A1A] mb-6">Häufige Fragen</h2>
            <p className="text-2xl text-[#2D2D2D] font-light">Alles was du wissen musst, bevor wir starten.</p>
          </div>
          
          <div className="space-y-6">
            <FaqItem 
              question="Wie lange dauert ein durchschnittlicher Druck?"
              answer="Das hängt stark von der Größe und Komplexität ab. Kleine Prototypen (SLA) können innerhalb von 24 Stunden fertig sein. Große industrielle FDM-Teile benötigen oft 2-4 Tage. Bei Projektanfrage geben wir dir einen exakten Zeitplan."
            />
            <FaqItem 
              question="Welche Dateiformate akzeptiert ihr?"
              answer="Am besten verarbeiten wir .STL, .STEP oder .OBJ Dateien. Wenn du nur eine Idee oder eine 2D-Skizze hast, hilft unser Konstruktions-Team gerne bei der Erstellung des 3D-Modells."
            />
            <FaqItem 
              question="Könnt ihr auch große Serien fertigen?"
              answer="Absolut! Wir sind darauf spezialisiert, Kleinserien von 1 bis 500 Stück effizient und in gleichbleibender Qualität zu fertigen. Für größere Chargen beraten wir dich gerne bezüglich Skalierung."
            />
            <FaqItem 
              question="Bietet ihr auch Post-Processing an?"
              answer="Ja, wir bieten umfassendes Post-Processing an. Dazu gehört das Entfernen von Stützstrukturen, Schleifen, Grundieren, Lackieren und das Einsetzen von Gewindebuchsen (Heat-Set Inserts)."
            />
          </div>
        </div>
      </section>
    </main>
  );
}

function ContactRow({ icon, title, desc, isLink, href }: any) {
  const Wrapper = isLink ? 'a' : 'div';
  return (
    <Wrapper href={href} className="flex items-start gap-8 text-[#2D2D2D] group cursor-pointer block">
      <div className="w-20 h-20 bg-[#FAF8F5] rounded-3xl flex items-center justify-center border border-[#E8D5C4] group-hover:bg-[#C41E3A] group-hover:text-white group-hover:border-[#C41E3A] transition-all duration-500 shadow-sm group-hover:shadow-xl transform group-hover:-translate-y-2">
        {icon}
      </div>
      <div className="pt-2">
        <p className="font-bold text-3xl text-[#1A1A1A] mb-2 group-hover:text-[#C41E3A] transition-colors">{title}</p>
        <p className="text-xl text-gray-500 leading-relaxed max-w-sm">{desc}</p>
      </div>
    </Wrapper>
  );
}

function RadarNetwork() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-grid-white/[0.04] bg-[length:50px_50px]" />
      
      {/* Radar Sweeps */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute w-[90%] h-[90%] rounded-full border border-[#C41E3A]/20"
      >
        <div className="w-full h-1/2 bg-gradient-to-tr from-transparent to-[#C41E3A]/30 origin-bottom rounded-t-full backdrop-blur-[2px]" />
      </motion.div>

      {/* Concentric Circles */}
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="absolute rounded-full border border-white/5" style={{ width: `${i*22}%`, height: `${i*22}%` }} />
      ))}

      {/* Main Hub Node */}
      <div className="absolute w-24 h-24 bg-[#C41E3A] rounded-full z-10 flex items-center justify-center shadow-[0_0_80px_rgba(196,30,58,0.8)] border-4 border-[#1A1A1A]">
        <MapPin size={40} className="text-white" />
      </div>
      <motion.div 
        animate={{ scale: [1, 3], opacity: [0.6, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
        className="absolute w-24 h-24 bg-[#C41E3A] rounded-full z-0"
      />

      {/* Outer Nodes */}
      <Node top="20%" left="30%" delay={0} size={16} />
      <Node top="70%" left="20%" delay={0.5} size={20} />
      <Node top="35%" left="80%" delay={1} size={12} />
      <Node top="80%" left="75%" delay={1.5} size={24} />
      <Node top="15%" left="75%" delay={2} size={16} />
      <Node top="50%" left="15%" delay={2.5} size={12} />
    </div>
  );
}

function Node({ top, left, delay, size = 16 }: any) {
  return (
    <div className="absolute" style={{ top, left }}>
      <motion.div 
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay, duration: 0.5 }}
        className="bg-white rounded-full z-10 relative"
        style={{ width: size, height: size }}
      />
      <motion.div 
        animate={{ scale: [1, 4], opacity: [0.5, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut", delay }}
        className="absolute inset-0 bg-white rounded-full z-0"
      />
    </div>
  );
}

function FaqItem({ question, answer }: any) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white rounded-[2rem] border border-[#E8D5C4] overflow-hidden transition-all duration-300 hover:border-[#C41E3A]/30 hover:shadow-lg">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-10 py-8 flex items-center justify-between text-left"
      >
        <span className="font-calistoga text-2xl text-[#1A1A1A] pr-8">{question}</span>
        <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-colors duration-300 ${isOpen ? 'bg-[#C41E3A] text-white' : 'bg-[#FAF8F5] text-[#C41E3A]'}`}>
          {isOpen ? <Minus size={24} /> : <Plus size={24} />}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-10 pb-10 pt-2 text-xl text-[#2D2D2D] leading-relaxed border-t border-gray-100 mt-2">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
