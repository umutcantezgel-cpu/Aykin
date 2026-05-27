'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SubpageHero } from '@/components/ui/SubpageHero';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "Welche Materialien eignen sich am besten für mein Projekt?",
    answer: "Das hängt stark von der Anwendung ab. Für dekorative Objekte ist PLA ideal. Für mechanisch beanspruchte Teile empfehlen wir PETG oder ABS. Wenn Sie höchste Detailgenauigkeit benötigen (z.B. für Miniaturen), ist Resin die beste Wahl. Kontaktieren Sie uns gerne für eine individuelle Beratung!"
  },
  {
    question: "Wie groß dürfen die gedruckten Teile maximal sein?",
    answer: "Unser größter FDM-Drucker hat einen Bauraum von 500x500x500mm. Resin-Drucke können bis zu 292x165x400mm groß sein. Für noch größere Projekte können wir Teile clever in mehrere Segmente aufteilen und diese später nahtlos zusammenfügen (z.B. durch Snap-Fits oder Kleben)."
  },
  {
    question: "Wie lange dauert ein typischer Auftrag?",
    answer: "Die Lieferzeit variiert je nach Projektgröße und aktueller Auslastung. Ein Standard-Druckauftrag ist meist innerhalb von 3-5 Werktagen versandfertig. Bei komplexen Projekten, die eine 3D-Modellierung erfordern, kann es entsprechend länger dauern. Express-Produktion ist auf Anfrage möglich."
  },
  {
    question: "Bieten Sie auch CAD-Modellierung an?",
    answer: "Ja! Wir können Ihre Idee von der ersten Skizze bis zum fertigen 3D-Modell umsetzen. Ob Reverse Engineering, Anpassung bestehender Dateien oder komplette Neukonstruktion – unsere Ingenieure helfen Ihnen gerne."
  },
  {
    question: "Welche Dateiformate können Sie verarbeiten?",
    answer: "Am liebsten arbeiten wir mit .STL, .STEP oder .OBJ Dateien. Wenn Sie nur 2D-Zeichnungen (.PDF, .DXF) oder Skizzen haben, übernehmen wir gerne die 3D-Modellierung für Sie."
  },
  {
    question: "Ist 3D-Druck umweltfreundlich?",
    answer: "Das kommt auf das Material an. Wir verwenden vorzugsweise PLA, einen biobasierten Kunststoff, der aus nachwachsenden Rohstoffen (wie Maisstärke) gewonnen wird. Zudem produziert der 3D-Druck im Vergleich zu subtraktiven Verfahren (wie Fräsen) kaum Verschnitt, da nur das Material verbraucht wird, das tatsächlich für das Bauteil benötigt wird."
  }
];

function AccordionItem({ question, answer, isOpen, onClick }: { question: string, answer: string, isOpen: boolean, onClick: () => void }) {
  return (
    <motion.div 
      layout
      className={`border-2 rounded-3xl overflow-hidden bg-white cursor-pointer transition-colors duration-300 ${isOpen ? 'border-[#C41E3A] shadow-xl' : 'border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md'}`}
      onClick={onClick}
    >
      <motion.div layout className="p-6 md:p-8 flex items-center justify-between gap-4">
        <motion.h3 layout className="font-calistoga text-2xl md:text-3xl text-[#1A1A1A]">
          {question}
        </motion.h3>
        <motion.div 
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${isOpen ? 'bg-[#C41E3A] text-white' : 'bg-gray-100 text-[#1A1A1A]'}`}
        >
          <ChevronDown size={24} strokeWidth={3} />
        </motion.div>
      </motion.div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
          >
            <div className="px-6 md:px-8 pb-8 pt-0 text-[#2D2D2D] text-lg md:text-xl leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <main className="bg-[#FAF8F5] min-h-screen">
      <SubpageHero 
        label="Häufig gestellte Fragen"
        title="Du fragst, wir antworten"
        subtitle="Alles was du über unsere 3D-Druck Dienstleistungen, Materialien und Prozesse wissen musst."
      />

      <section className="py-24 px-6 relative z-10">
        <div className="max-w-4xl mx-auto flex flex-col gap-6">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </section>
      
      {/* Giant floating question marks for decoration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 opacity-5">
        <motion.div 
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }} 
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-10 text-[20rem] font-calistoga text-[#C41E3A]"
        >
          ?
        </motion.div>
        <motion.div 
          animate={{ y: [0, 30, 0], rotate: [0, -10, 0] }} 
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-1/4 right-10 text-[30rem] font-calistoga text-[#1A1A1A]"
        >
          ?
        </motion.div>
      </div>
    </main>
  );
}
