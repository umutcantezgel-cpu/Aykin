'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { ChevronDown, Send, MessageCircle, AlertCircle, RefreshCw, Printer, Coffee, Package, MapPin, Search, ChevronRight, PenTool, CheckCircle2, Phone, Zap, Clock } from 'lucide-react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useToastStore } from '@/store/useToastStore';

// MASSIVE DECISION TREE DATA
type ResultType = {
  title: string;
  description: string;
  action?: { label: string; href: string; type: 'link' | 'whatsapp' | 'email' | 'phone' };
};

type OptionType = {
  id: string;
  label: string;
  icon?: React.ElementType;
  nextId?: string;
  result?: ResultType;
};

type NodeType = {
  id: string;
  question: string;
  subtitle?: string;
  options: OptionType[];
};

const DECISION_TREE: Record<string, NodeType> = {
  root: {
    id: 'root',
    question: 'Womit können wir dir helfen?',
    subtitle: 'Wähle einen Bereich, um die Fehlerbehebung oder Beratung zu starten.',
    options: [
      { id: 'opt_food', label: 'Essen & Lieferung', icon: Coffee, nextId: 'food_root' },
      { id: 'opt_3d', label: '3D-Druck & Design', icon: Printer, nextId: 'print_root' },
      { id: 'opt_general', label: 'Allgemeine Fragen', icon: Search, nextId: 'general_root' },
    ]
  },
  
  // --- FOOD BRANCH ---
  food_root: {
    id: 'food_root',
    question: 'Was genau betrifft dein Anliegen rund ums Essen?',
    options: [
      { id: 'f1', label: 'Wo bleibt meine Lieferung?', icon: Package, nextId: 'food_delivery_status' },
      { id: 'f2', label: 'Etwas fehlt oder ist falsch', icon: AlertCircle, nextId: 'food_issue' },
      { id: 'f3', label: 'Fragen zu Allergenen / Zutaten', icon: Search, nextId: 'food_allergens' },
      { id: 'f4', label: 'Tischreservierung', icon: MapPin, result: { title: 'Tischreservierung', description: 'Wir nehmen aktuell Reservierungen am besten telefonisch oder per WhatsApp entgegen.', action: { label: 'Auf WhatsApp schreiben', href: 'https://wa.me/4917625026991', type: 'whatsapp' } } }
    ]
  },
  food_delivery_status: {
    id: 'food_delivery_status',
    question: 'Wo hast du bestellt?',
    options: [
      { id: 'fds1', label: 'Lieferando', result: { title: 'Lieferando Bestellung', description: 'Bitte nutze den Lieferando-Tracker in der App. Falls sich der Status lange nicht ändert, rufe uns kurz an.', action: { label: 'Im Studio anrufen', href: 'tel:+4964417890426', type: 'phone' } } },
      { id: 'fds2', label: 'Telefonisch / WhatsApp', result: { title: 'Direkte Bestellung', description: 'Wir beeilen uns! Ruf uns am besten kurz an und nenne deinen Namen und Bestellzeitpunkt.', action: { label: 'Jetzt anrufen', href: 'tel:+4964417890426', type: 'phone' } } }
    ]
  },
  food_issue: {
    id: 'food_issue',
    question: 'Das tut uns leid! Was ist passiert?',
    options: [
      { id: 'fi1', label: 'Falsches Gericht', result: { title: 'Ups, da ist was schiefgelaufen!', description: 'Bitte melde dich sofort bei uns. Wir liefern das richtige Gericht schnellstmöglich nach oder erstatten den Betrag.', action: { label: 'Fehler per WhatsApp melden', href: 'https://wa.me/4917625026991', type: 'whatsapp' } } },
      { id: 'fi2', label: 'Zutat fehlt (z.B. Soße)', result: { title: 'Oh nein, das Wichtigste fehlt!', description: 'Schreib uns kurz. Wir finden eine unkomplizierte Lösung für dich (z.B. Gutschein für die nächste Bestellung oder Nachlieferung).', action: { label: 'Support kontaktieren', href: 'https://wa.me/4917625026991', type: 'whatsapp' } } },
      { id: 'fi3', label: 'Essen ist kalt', result: { title: 'Kaltes Essen?', description: 'Das entspricht nicht unserem Standard. Bitte kontaktiere uns sofort, damit wir prüfen können, woran es lag und es wiedergutmachen können.' } }
    ]
  },
  food_allergens: {
    id: 'food_allergens',
    question: 'Suchst du nach bestimmten Allergenen?',
    options: [
      { id: 'fa1', label: 'Gluten / Laktose', result: { title: 'Gluten- und Laktosefrei', description: 'Viele unserer Gerichte können glutenfrei oder laktosefrei zubereitet werden. Bitte gib dies immer explizit bei der Bestellung im Kommentarfeld an!' } },
      { id: 'fa2', label: 'Nüsse / Spezifische Allergien', result: { title: 'Spezifische Allergien', description: 'Wir kochen in einer Küche, in der auch Nüsse verarbeitet werden. Bitte rufe uns vor deiner Bestellung an, um sicherzugehen.', action: { label: 'Anrufen & Abklären', href: 'tel:+4964417890426', type: 'phone' } } }
    ]
  },

  // --- 3D PRINTING BRANCH ---
  print_root: {
    id: 'print_root',
    question: 'Wobei benötigst du im 3D-Druck Bereich Hilfe?',
    options: [
      { id: 'p1', label: 'Angebot einholen', icon: Package, nextId: 'print_quote' },
      { id: 'p2', label: 'Materialberatung', icon: RefreshCw, nextId: 'print_materials' },
      { id: 'p3', label: 'Druckfehler / Probleme', icon: AlertCircle, nextId: 'print_issues' },
      { id: 'p4', label: 'Ich brauche ein Design (CAD)', icon: PenTool, result: { title: 'Design-Service', description: 'Wir konstruieren dein Bauteil! Schreib uns am besten eine kurze Nachricht mit einer Skizze oder deinen Anforderungen.', action: { label: 'Anfrage auf WhatsApp', href: 'https://wa.me/4917625026991', type: 'whatsapp' } } }
    ]
  },
  print_quote: {
    id: 'print_quote',
    question: 'Hast du bereits eine druckfertige 3D-Datei (.stl, .step, .obj)?',
    options: [
      { id: 'pq1', label: 'Ja, Datei liegt vor', result: { title: 'Perfekt!', description: 'Sende uns die Datei einfach per Mail. Wir prüfen sie auf Druckbarkeit und schicken dir innerhalb von 24h ein unverbindliches Angebot.', action: { label: 'E-Mail senden', href: 'mailto:info@aykin3d.de', type: 'email' } } },
      { id: 'pq2', label: 'Nein, ich habe nur eine Idee/Skizze', result: { title: 'Kein Problem!', description: 'Unser CAD-Service übernimmt das für dich. Wir modellieren nach deinen Vorgaben. Lass uns telefonieren, um den Aufwand abzuschätzen.', action: { label: 'Rückruf anfordern (WhatsApp)', href: 'https://wa.me/4917625026991', type: 'whatsapp' } } }
    ]
  },
  print_materials: {
    id: 'print_materials',
    question: 'Für welchen Einsatzbereich ist dein Bauteil gedacht?',
    options: [
      { id: 'pm1', label: 'Nur Deko (Figuren, Modelle)', result: { title: 'Empfehlung: PLA', description: 'PLA ist kostengünstig, umweltfreundlich und ermöglicht sehr detaillierte Drucke. Perfekt für alles, was drinnen steht und keinen hohen Belastungen ausgesetzt ist.' } },
      { id: 'pm2', label: 'Mechanisch belastet / Werkzeug', result: { title: 'Empfehlung: PETG oder ABS/ASA', description: 'PETG ist schlagfest und flexibel. ASA ist extrem UV-beständig und robust – ideal für funktionale Bauteile.' } },
      { id: 'pm3', label: 'Draußen / Hitze / Auto', result: { title: 'Empfehlung: ASA oder PC', description: 'Im Auto kann es im Sommer sehr heiß werden. ASA hält bis ca. 90°C stand und ist UV-beständig. Polycarbonat (PC) sogar bis 110°C.' } },
      { id: 'pm4', label: 'Flexibel (wie Gummi)', result: { title: 'Empfehlung: TPU', description: 'TPU ist ein elastisches Material, perfekt für Dichtungen, Dämpfer oder Reifen.' } }
    ]
  },
  print_issues: {
    id: 'print_issues',
    question: 'Gab es ein Problem mit einem Bauteil von uns?',
    options: [
      { id: 'pi1', label: 'Bauteil ist gebrochen', result: { title: 'Reklamation', description: 'Schick uns bitte ein Foto des Bruchs. Wir analysieren, ob es an der Druckausrichtung, am Infill oder Material lag und drucken es ggf. kostenfrei neu.', action: { label: 'Foto per WhatsApp senden', href: 'https://wa.me/4917625026991', type: 'whatsapp' } } },
      { id: 'pi2', label: 'Maße stimmen nicht (Toleranzen)', result: { title: 'Toleranz-Problem', description: 'Beim FDM-Druck kann es zu minimalem Shrinkage (Schrumpfen) kommen. Wenn es nicht passt, passen wir das Modell an und drucken es neu.' } },
      { id: 'pi3', label: 'Oberfläche sieht unsauber aus', result: { title: 'Qualitätskontrolle', description: 'Support-Strukturen können Spuren hinterlassen. Falls es unzumutbar ist, bessern wir nach. Melde dich bei uns!' } }
    ]
  },

  // --- GENERAL BRANCH ---
  general_root: {
    id: 'general_root',
    question: 'Worum geht es bei deiner allgemeinen Frage?',
    options: [
      { id: 'g1', label: 'Öffnungszeiten', icon: Clock, result: { title: 'Unsere Zeiten', description: 'Wir haben von Montag bis Samstag geöffnet. Die genauen Zeiten findest du auf der Besuchen-Seite.', action: { label: 'Zur Besuchen-Seite', href: '/visit', type: 'link' } } },
      { id: 'g2', label: 'Wo finde ich euch?', icon: MapPin, result: { title: 'Standort Wetzlar', description: 'Unser Studio befindet sich in Wetzlar. Parkplätze sind direkt vor der Tür verfügbar.', action: { label: 'Route planen', href: 'https://maps.google.com/?q=Aykin+Studio', type: 'link' } } },
      { id: 'g3', label: 'Zusammenarbeit / B2B', icon: Zap, result: { title: 'B2B & Kooperationen', description: 'Wir arbeiten gerne mit anderen Unternehmen, Restaurants und Entwicklern zusammen. Schreib uns eine Mail mit deinen Ideen.', action: { label: 'E-Mail schreiben', href: 'mailto:info@aykin.de', type: 'email' } } },
    ]
  }
};

// Tree Background Component
const TreeBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20 z-0">
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="dotGrid" width="40" height="40" patternUnits="userSpaceOnUse">
          <circle cx="20" cy="20" r="1.5" fill="#C41E3A" />
        </pattern>
        <linearGradient id="fadeGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="50%" stopColor="#C41E3A" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#dotGrid)" />
      
      {/* Decorative organic paths */}
      <motion.path
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.3 }}
        transition={{ duration: 5, repeat: Infinity, repeatType: 'reverse', ease: "easeInOut" }}
        d="M 100 0 C 150 200, 300 400, 100 800"
        fill="none" stroke="url(#fadeGrad)" strokeWidth="2"
      />
      <motion.path
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.2 }}
        transition={{ duration: 7, delay: 2, repeat: Infinity, repeatType: 'reverse', ease: "easeInOut" }}
        d="M 80% 0 C 70% 300, 90% 600, 75% 1000"
        fill="none" stroke="url(#fadeGrad)" strokeWidth="4"
      />
    </svg>
  </div>
);

// Form Component
const ContactFormBlock = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addToast } = useToastStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'support_messages'), {
        ...formData,
        createdAt: new Date().toISOString(),
        status: 'new'
      });
      addToast({ title: 'Nachricht gesendet!', message: 'Wir melden uns bald bei dir.', type: 'success' });
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      console.error(err);
      addToast({ title: 'Fehler', message: 'Nachricht konnte nicht gesendet werden.', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.form 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onSubmit={handleSubmit} 
      className="bg-white p-8 md:p-10 rounded-[40px] shadow-2xl border border-[#F2E8E0] flex flex-col gap-6 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#C41E3A]/10 to-transparent rounded-bl-full pointer-events-none" />
      
      <h2 className="font-calistoga text-3xl text-[#1A1A1A] mb-2">Immer noch Fragen?</h2>
      <p className="font-nunito text-[#8A8A8A] mb-4">Schreib uns dein Anliegen, und unser Team kümmert sich persönlich darum.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-bold text-[#8A8A8A] mb-2 ml-2 uppercase tracking-wider">Dein Name</label>
          <input 
            type="text" required value={formData.name}
            onChange={e => setFormData({...formData, name: e.target.value})}
            className="w-full bg-[#FAF8F5] border border-[#E8D5C4] px-6 py-4 rounded-[20px] font-bold text-[#1A1A1A] focus:outline-none focus:border-[#C41E3A] focus:ring-4 focus:ring-[#C41E3A]/10 transition-all"
            placeholder="Max Mustermann"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-[#8A8A8A] mb-2 ml-2 uppercase tracking-wider">E-Mail Adresse</label>
          <input 
            type="email" required value={formData.email}
            onChange={e => setFormData({...formData, email: e.target.value})}
            className="w-full bg-[#FAF8F5] border border-[#E8D5C4] px-6 py-4 rounded-[20px] font-bold text-[#1A1A1A] focus:outline-none focus:border-[#C41E3A] focus:ring-4 focus:ring-[#C41E3A]/10 transition-all"
            placeholder="mail@beispiel.de"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-bold text-[#8A8A8A] mb-2 ml-2 uppercase tracking-wider">Nachricht</label>
        <textarea 
          required value={formData.message}
          onChange={e => setFormData({...formData, message: e.target.value})}
          className="w-full bg-[#FAF8F5] border border-[#E8D5C4] px-6 py-5 rounded-[24px] font-bold text-[#1A1A1A] focus:outline-none focus:border-[#C41E3A] focus:ring-4 focus:ring-[#C41E3A]/10 min-h-[160px] resize-none transition-all"
          placeholder="Wie können wir dir helfen?"
        />
      </div>

      <button 
        type="submit" disabled={isSubmitting}
        className="mt-4 w-full bg-[#1A1A1A] hover:bg-[#C41E3A] text-white py-5 rounded-[24px] font-bold text-lg flex items-center justify-center gap-3 transition-colors duration-300 disabled:opacity-50 disabled:hover:bg-[#1A1A1A]"
      >
        {isSubmitting ? 'Wird gesendet...' : (
          <>Nachricht absenden <Send size={20} /></>
        )}
      </button>
    </motion.form>
  );
};

export default function SupportPage() {
  const [path, setPath] = useState<string[]>(['root']);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new node is added
  useEffect(() => {
    if (path.length > 1) {
      setTimeout(() => {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: 'smooth'
        });
      }, 300);
    }
  }, [path]);

  const handleOptionClick = (depthIndex: number, option: OptionType) => {
    const newPath = path.slice(0, depthIndex + 1);
    
    if (option.nextId) {
      newPath.push(option.nextId);
    } else if (option.result) {
      newPath.push(`result-${option.id}`); // pseudo-node for result
    }
    
    setPath(newPath);
  };

  const resetTree = () => {
    setPath(['root']);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] relative overflow-hidden selection:bg-[#C41E3A] selection:text-white" ref={containerRef}>
      <TreeBackground />
      
      {/* Hero Header */}
      <section className="relative z-10 pt-[140px] pb-[60px] px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, type: 'spring' }}
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white border border-[#E8D5C4] shadow-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
            <span className="font-nunito font-bold text-sm text-[#4A4A4A] tracking-widest uppercase">Support Center</span>
          </div>
          <h1 className="font-calistoga text-[clamp(2.5rem,6vw,5rem)] text-[#1A1A1A] mb-6 leading-tight">
            Problemlösung, <br />
            <span className="text-[#C41E3A] italic">organisch & schnell.</span>
          </h1>
          <p className="font-nunito text-[clamp(1rem,2vw,1.3rem)] text-[#8A8A8A] max-w-2xl mx-auto leading-relaxed">
            Klick dich durch unseren Support-Baum. Er wächst mit deinen Antworten und führt dich zielgenau zur Lösung deines Anliegens.
          </p>
        </motion.div>
      </section>

      {/* ORGANIC TROUBLESHOOTING TREE */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 pb-[100px]">
        <div className="flex flex-col gap-8 relative">
          
          {/* Vertical connection line in the background */}
          <div className="absolute left-[39px] top-10 bottom-10 w-[2px] bg-[#E8D5C4] z-0 hidden md:block" />

          <AnimatePresence>
            {path.map((nodeId, index) => {
              const isResult = nodeId.startsWith('result-');
              
              if (isResult) {
                // Find the option that triggered this result
                const parentNodeId = path[index - 1];
                const parentNode = DECISION_TREE[parentNodeId];
                const optionId = nodeId.replace('result-', '');
                const option = parentNode.options.find(o => o.id === optionId);
                const result = option?.result;

                if (!result) return null;

                return (
                  <motion.div
                    key={nodeId}
                    initial={{ opacity: 0, y: 50, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                    transition={{ type: 'spring', bounce: 0.4, duration: 0.8 }}
                    className="relative z-10 flex gap-6"
                  >
                    <div className="hidden md:flex w-20 shrink-0 flex-col items-center">
                      <div className="w-[80px] h-[80px] bg-[#10B981] rounded-full border-[8px] border-[#FAF8F5] flex items-center justify-center text-white shadow-lg shadow-[#10B981]/20">
                        <CheckCircle2 size={32} />
                      </div>
                    </div>
                    
                    <div className="bg-white p-8 md:p-10 rounded-[32px] shadow-[0_20px_60px_rgba(0,0,0,0.05)] border border-[#10B981]/20 flex-1 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-40 h-40 bg-[#10B981]/5 rounded-bl-full pointer-events-none" />
                      
                      <h3 className="font-calistoga text-3xl text-[#1A1A1A] mb-4">{result.title}</h3>
                      <p className="font-nunito text-lg text-[#4A4A4A] leading-relaxed mb-8">{result.description}</p>
                      
                      <div className="flex flex-col sm:flex-row gap-4 items-center">
                        {result.action && (
                          <a 
                            href={result.action.href}
                            target={result.action.type === 'link' ? '_self' : '_blank'}
                            rel="noreferrer"
                            className="w-full sm:w-auto bg-[#10B981] text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-[#0E9F6E] transition-colors shadow-lg shadow-[#10B981]/30"
                          >
                            {result.action.type === 'whatsapp' && <MessageCircle size={20} />}
                            {result.action.type === 'phone' && <Phone size={20} />}
                            {result.action.label}
                          </a>
                        )}
                        <button 
                          onClick={resetTree}
                          className="w-full sm:w-auto bg-[#F2E8E0] text-[#4A4A4A] px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-[#E8D5C4] transition-colors"
                        >
                          <RefreshCw size={20} /> Neu starten
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              }

              const node = DECISION_TREE[nodeId];
              if (!node) return null;

              const isLast = index === path.length - 1;

              return (
                <motion.div
                  key={nodeId}
                  initial={{ opacity: 0, y: 50, x: -20 }}
                  animate={{ opacity: 1, y: 0, x: 0 }}
                  exit={{ opacity: 0, height: 0, margin: 0, overflow: 'hidden' }}
                  transition={{ type: 'spring', bounce: 0.3, duration: 0.7 }}
                  className="relative z-10 flex gap-4 md:gap-6"
                >
                  {/* Step Indicator */}
                  <div className="hidden md:flex w-20 shrink-0 flex-col items-center">
                    <div className={`w-[80px] h-[80px] rounded-full border-[8px] border-[#FAF8F5] flex items-center justify-center font-calistoga text-3xl shadow-md transition-colors duration-500 ${isLast ? 'bg-[#C41E3A] text-white shadow-[#C41E3A]/20' : 'bg-[#E8D5C4] text-[#1A1A1A]'}`}>
                      {index + 1}
                    </div>
                  </div>

                  {/* Node Content */}
                  <div className={`flex-1 transition-all duration-500 ${isLast ? 'opacity-100' : 'opacity-60 scale-[0.98] pointer-events-none'}`}>
                    <h2 className="font-calistoga text-2xl md:text-4xl text-[#1A1A1A] mb-2">{node.question}</h2>
                    {node.subtitle && <p className="font-nunito text-[#8A8A8A] text-lg mb-6">{node.subtitle}</p>}
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                      {node.options.map((opt) => {
                        // Check if this option was selected in the path
                        const nextIdSelected = path[index + 1] === opt.nextId || path[index + 1] === `result-${opt.id}`;
                        const isSelected = !isLast && nextIdSelected;

                        return (
                          <motion.button
                            key={opt.id}
                            whileHover={isLast ? { scale: 1.02, y: -2 } : {}}
                            whileTap={isLast ? { scale: 0.98 } : {}}
                            onClick={() => handleOptionClick(index, opt)}
                            className={`
                              p-5 md:p-6 rounded-[24px] border-2 text-left flex flex-col gap-3 transition-all duration-300
                              ${isSelected 
                                ? 'bg-[#C41E3A] border-[#C41E3A] text-white shadow-xl shadow-[#C41E3A]/20' 
                                : 'bg-white border-[#E8D5C4] text-[#1A1A1A] hover:border-[#C41E3A]/50 hover:bg-[#FAF8F5] shadow-sm'}
                            `}
                          >
                            <div className="flex justify-between items-center w-full">
                              {opt.icon && (
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isSelected ? 'bg-white/20' : 'bg-[#F2E8E0] text-[#C41E3A]'}`}>
                                  <opt.icon size={20} />
                                </div>
                              )}
                              {!isSelected && <ChevronRight size={20} className="text-[#8A8A8A] opacity-50" />}
                              {isSelected && <CheckCircle2 size={24} className="text-white" />}
                            </div>
                            <span className="font-nunito font-bold text-lg md:text-xl leading-tight">
                              {opt.label}
                            </span>
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </section>

      {/* MANUAL CONTACT SECTION */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 pb-[100px]">
        <div className="flex items-center gap-4 mb-10">
          <div className="h-[2px] flex-1 bg-gradient-to-r from-transparent to-[#E8D5C4]" />
          <span className="font-nunito font-black text-[#8A8A8A] uppercase tracking-[0.2em] px-4">Oder manuell</span>
          <div className="h-[2px] flex-1 bg-gradient-to-l from-transparent to-[#E8D5C4]" />
        </div>
        
        <ContactFormBlock />
      </section>
    </div>
  );
}
