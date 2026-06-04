'use client';

import React, { useState, useRef, MouseEvent, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { 
  UploadCloud, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft,
  Settings,
  Layers,
  Box,
  Droplet,
  Zap,
  Shield,
  Gauge,
  Sparkles,
  Maximize,
  Check,
  File as FileIcon,
  X,
  Printer,
  Info
} from 'lucide-react';
import { SubpageHero } from '@/components/ui/SubpageHero';

// --- TYPES ---
type Technology = 'FDM' | 'SLA' | 'SLS' | null;
type Material = string | null;
type Quality = 'Prototyp' | 'Standard' | 'Industrie' | null;

interface ConfigState {
  technology: Technology;
  material: Material;
  quality: Quality;
  file: File | null;
  firstName: string;
  lastName: string;
  email: string;
  description: string;
}

// --- DATA ---
const TECHNOLOGIES = [
  {
    id: 'FDM',
    title: 'FDM Druck',
    subtitle: 'Fused Deposition Modeling',
    description: 'Robuste Funktionsteile & Prototypen aus technischen Kunststoffen. Optimal für Vorrichtungen und Gehäuse.',
    icon: <Layers size={32} />,
    features: ['Hohe Belastbarkeit', 'Kosteneffizient', 'Großer Bauraum'],
    color: '#C41E3A'
  },
  {
    id: 'SLA',
    title: 'SLA Druck',
    subtitle: 'Stereolithografie',
    description: 'Extreme Detailgenauigkeit & glatte Oberflächen. Ideal für filigrane Modelle, Schmuck und Dental.',
    icon: <Droplet size={32} />,
    features: ['Glatte Oberflächen', 'Feinste Details', 'Präzision'],
    color: '#3A86FF'
  },
  {
    id: 'SLS',
    title: 'SLS Druck',
    subtitle: 'Selektives Lasersintern',
    description: 'Komplexe Geometrien ohne Stützstrukturen. Industriestandard für langlebige Endanwendungsteile.',
    icon: <Zap size={32} />,
    features: ['Keine Stützstrukturen', 'Industriequalität', 'Komplexe Formen'],
    color: '#8338EC'
  }
];

const MATERIALS: Record<string, any[]> = {
  FDM: [
    { id: 'PLA', title: 'PLA Premium', description: 'Umweltfreundlich, harte Oberfläche. Für simple Modelle.', icon: <Box size={24} /> },
    { id: 'PETG', title: 'PETG Industrie', description: 'Gute Balance aus Festigkeit und Flexibilität. Chemikalienbeständig.', icon: <Shield size={24} /> },
    { id: 'ABS', title: 'ABS Pro', description: 'Hitzebeständig und schlagfest. Für mechanische Beanspruchung.', icon: <Settings size={24} /> },
    { id: 'TPU', title: 'TPU Flex', description: 'Gummiartig und extrem flexibel. Für Dichtungen und Dämpfer.', icon: <Maximize size={24} /> }
  ],
  SLA: [
    { id: 'Standard Resin', title: 'Standard Harz', description: 'Hohe Detailgenauigkeit für visuelle Prototypen.', icon: <Sparkles size={24} /> },
    { id: 'Tough Resin', title: 'Tough Harz', description: 'Simuliert ABS. Hohe Schlagfestigkeit.', icon: <Shield size={24} /> },
    { id: 'Clear Resin', title: 'Clear Harz', description: 'Glasartig transparent. Für Optik-Prototypen.', icon: <Droplet size={24} /> }
  ],
  SLS: [
    { id: 'PA12', title: 'PA12 Nylon', description: 'Der Industriestandard. Exzellente mechanische Eigenschaften.', icon: <Zap size={24} /> },
    { id: 'PA12 GF', title: 'PA12 Glassfilled', description: 'Glasfaserverstärkt für extreme Steifigkeit.', icon: <Shield size={24} /> },
    { id: 'TPU', title: 'TPU Flexibel', description: 'Komplexe, flexible Endanwendungsteile.', icon: <Maximize size={24} /> }
  ]
};

const QUALITIES = [
  {
    id: 'Prototyp',
    title: 'Draft / Prototyp',
    description: 'Schnelle Fertigung mit gröberen Schichten. Fokus auf Speed und Geometrie-Prüfung.',
    icon: <Gauge size={32} />,
    price: '€'
  },
  {
    id: 'Standard',
    title: 'Standard',
    description: 'Der perfekte Kompromiss aus Oberflächengüte, mechanischer Stabilität und Produktionszeit.',
    icon: <CheckCircle2 size={32} />,
    price: '€€'
  },
  {
    id: 'Industrie',
    title: 'High-End Industrie',
    description: 'Maximale Präzision, feinste Schichtstärke und 100% Infill für höchste Beanspruchung.',
    icon: <Sparkles size={32} />,
    price: '€€€'
  }
];

// --- ANIMATIONS ---
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 40 : -40,
    opacity: 0,
    filter: 'blur(10px)'
  }),
  center: {
    x: 0,
    opacity: 1,
    filter: 'blur(0px)',
    transition: { type: 'spring', stiffness: 300, damping: 30 }
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 40 : -40,
    opacity: 0,
    filter: 'blur(10px)',
    transition: { duration: 0.2 }
  })
};

// --- COMPONENTS ---
function TiltCard({ 
  children, 
  isActive, 
  onClick, 
  className = '',
  accentColor = '#C41E3A'
}: { 
  children: React.ReactNode, 
  isActive: boolean, 
  onClick: () => void,
  className?: string,
  accentColor?: string
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['5deg', '-5deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-5deg', '5deg']);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`
        relative cursor-pointer rounded-3xl p-6 transition-all duration-300
        backdrop-blur-xl border-2 overflow-hidden group
        ${isActive 
          ? 'bg-white shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] z-10' 
          : 'bg-white/40 border-white/50 hover:bg-white/80 hover:border-white shadow-sm'}
        ${className}
      `}
      style={{ borderColor: isActive ? accentColor : undefined }}
    >
      {/* Glow Effect */}
      {isActive && (
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ background: `radial-gradient(circle at top right, ${accentColor}, transparent 70%)` }}
        />
      )}

      {/* Active Indicator */}
      <AnimatePresence>
        {isActive && (
          <motion.div 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute top-4 right-4 text-white rounded-full p-1 shadow-lg"
            style={{ backgroundColor: accentColor }}
          >
            <Check size={16} strokeWidth={3} />
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ transform: 'translateZ(20px)' }} className="h-full flex flex-col">
        {children}
      </div>
    </motion.div>
  );
}

// MAIN PAGE
export default function ConfiguratorPage() {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const [state, setState] = useState<ConfigState>({
    technology: null,
    material: null,
    quality: null,
    file: null,
    firstName: '',
    lastName: '',
    email: '',
    description: ''
  });

  const nextStep = () => {
    if (step < 4) {
      setDirection(1);
      setStep(step + 1);
      window.scrollTo({ top: 400, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setDirection(-1);
      setStep(step - 1);
      window.scrollTo({ top: 400, behavior: 'smooth' });
    }
  };

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setState({ ...state, file: e.dataTransfer.files[0] });
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setState({ ...state, file: e.target.files[0] });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isStepValid = () => {
    if (step === 1) return state.technology !== null;
    if (step === 2) return state.material !== null;
    if (step === 3) return state.quality !== null;
    if (step === 4) return state.firstName && state.lastName && state.email && state.description;
    return false;
  };

  // Auto-advance logic for quick selection
  useEffect(() => {
    if (step === 1 && state.technology) {
      const timer = setTimeout(() => nextStep(), 600);
      return () => clearTimeout(timer);
    }
  }, [state.technology]);

  useEffect(() => {
    if (step === 2 && state.material) {
      const timer = setTimeout(() => nextStep(), 600);
      return () => clearTimeout(timer);
    }
  }, [state.material]);

  // Reset material if technology changes
  useEffect(() => {
    setState(prev => ({ ...prev, material: null }));
  }, [state.technology]);

  const activeTechColor = TECHNOLOGIES.find(t => t.id === state.technology)?.color || '#C41E3A';

  return (
    <main className="min-h-screen bg-[#FAF8F5] overflow-x-hidden selection:bg-[#C41E3A] selection:text-white pb-32 w-full max-w-full font-sans">
      
      {/* Gamified Background */}
      <div className="fixed inset-0 pointer-events-none flex justify-center items-center z-0">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20" />
        <motion.div 
          animate={{ rotate: 360, scale: [1, 1.1, 1] }} 
          transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
          className="absolute w-[800px] h-[800px] rounded-full blur-[120px] bg-gradient-to-tr from-[#C41E3A]/10 to-transparent -top-40 -right-40"
        />
        <motion.div 
          animate={{ rotate: -360, scale: [1, 1.2, 1] }} 
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          className="absolute w-[600px] h-[600px] rounded-full blur-[100px] bg-gradient-to-bl from-blue-500/5 to-transparent bottom-0 left-0"
        />
      </div>

      <div className="relative z-10 max-w-full">
        <SubpageHero 
          label="Interaktiver Workflow"
          title="Dein Projekt. Unser Antrieb."
          subtitle="Konfiguriere in 4 simplen Schritten dein Bauteil. Wir berechnen im Hintergrund die perfekte Fertigungsstrategie für dich."
        />
      </div>

      <section className="relative z-20 py-16 px-6 max-w-[1400px] mx-auto w-full">
        {submitted ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-white/80 backdrop-blur-2xl rounded-[40px] p-12 md:p-24 text-center border border-white shadow-2xl max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: 360 }}
              transition={{ type: 'spring', damping: 20, stiffness: 200, delay: 0.2 }}
              className="w-32 h-32 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8 border-4 border-green-100"
            >
              <CheckCircle2 className="text-green-500" size={64} />
            </motion.div>
            <h2 className="font-calistoga text-5xl md:text-6xl text-[#1A1A1A] mb-6 tracking-tight">Mission gestartet!</h2>
            <p className="text-[#4A4A4A] text-xl leading-loose mb-12 max-w-2xl mx-auto">
              Fantastisch, <span className="font-bold text-[#1A1A1A]">{state.firstName}</span>! Wir haben deine Daten empfangen. Unser Engineering-Team analysiert nun deine Konfiguration und meldet sich innerhalb von 24 Stunden bei dir.
            </p>
            <div className="inline-block p-8 rounded-3xl bg-[#FAF8F5] border border-[#E8D5C4]/50 text-left w-full max-w-2xl shadow-inner">
              <h3 className="font-bold text-[#1A1A1A] mb-6 text-xl border-b border-[#E8D5C4] pb-4 flex items-center">
                <Settings className="mr-3 text-[#C41E3A]" /> 
                System-Zusammenfassung
              </h3>
              <ul className="space-y-4 text-[#4A4A4A] text-lg">
                <li className="flex justify-between items-center"><span className="text-sm uppercase tracking-widest font-bold">Technologie:</span> <span className="font-calistoga text-2xl text-[#1A1A1A]">{state.technology}</span></li>
                <li className="flex justify-between items-center"><span className="text-sm uppercase tracking-widest font-bold">Material:</span> <span className="font-calistoga text-2xl text-[#1A1A1A]">{state.material}</span></li>
                <li className="flex justify-between items-center"><span className="text-sm uppercase tracking-widest font-bold">Qualität:</span> <span className="font-calistoga text-2xl text-[#1A1A1A]">{state.quality}</span></li>
                {state.file && <li className="flex justify-between items-center pt-4 border-t border-black/5"><span className="text-sm uppercase tracking-widest font-bold">Datei:</span> <span className="font-bold text-green-600">{state.file.name}</span></li>}
              </ul>
            </div>
          </motion.div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
            
            {/* MAIN CONFIGURATOR (Left Side 65%) */}
            <div className="w-full lg:w-[65%] shrink-0">
              
              {/* Premium Stepper Progress */}
              <div className="mb-16 bg-white/40 backdrop-blur-xl p-6 rounded-3xl border border-white/60 shadow-sm">
                <div className="flex justify-between items-center mb-6 relative px-4">
                  <div className="absolute left-4 right-4 top-1/2 -translate-y-1/2 h-1.5 bg-black/5 rounded-full z-0 overflow-hidden">
                    <motion.div 
                      className="h-full bg-[#C41E3A]"
                      initial={{ width: 0 }}
                      animate={{ width: `${((step - 1) / 3) * 100}%` }}
                      transition={{ duration: 0.6, ease: "circOut" }}
                    />
                  </div>
                  {[1, 2, 3, 4].map((s) => {
                    const isActive = s === step;
                    const isPast = s < step;
                    return (
                      <div key={s} className="relative z-10 flex flex-col items-center group">
                        <motion.div 
                          className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg shadow-lg transition-colors duration-300
                            ${isActive ? 'bg-[#C41E3A] text-white ring-8 ring-[#C41E3A]/20' : 
                              isPast ? 'bg-[#1A1A1A] text-white' : 'bg-white text-[#1A1A1A] border-2 border-transparent'}
                          `}
                          whileHover={!isActive ? { scale: 1.1 } : {}}
                        >
                          {isPast ? <Check size={20} strokeWidth={3} /> : s}
                        </motion.div>
                      </div>
                    );
                  })}
                </div>
                <div className="flex justify-between text-[11px] md:text-sm font-bold uppercase tracking-wider px-2">
                  <span className={step >= 1 ? 'text-[#C41E3A]' : 'text-gray-400'}>Technologie</span>
                  <span className={step >= 2 ? 'text-[#C41E3A]' : 'text-gray-400'}>Material</span>
                  <span className={step >= 3 ? 'text-[#C41E3A]' : 'text-gray-400'}>Qualität</span>
                  <span className={step >= 4 ? 'text-[#C41E3A]' : 'text-gray-400'}>Details</span>
                </div>
              </div>

              {/* Dynamic Form Area (Replaced absolute inset-0 with natural flow) */}
              <div className="relative">
                <AnimatePresence custom={direction} mode="wait">
                  
                  {/* STEP 1: TECHNOLOGY */}
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      className="w-full"
                    >
                      <div className="mb-10 text-center md:text-left">
                        <h2 className="font-calistoga text-5xl text-[#1A1A1A] mb-4">Wähle die Technologie</h2>
                        <p className="text-[#4A4A4A] text-xl leading-loose max-w-2xl">Das Fundament deines Projekts. Jede Technologie bietet einzigartige physikalische Eigenschaften für spezifische Anwendungsfälle.</p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {TECHNOLOGIES.map((tech) => (
                          <TiltCard 
                            key={tech.id}
                            isActive={state.technology === tech.id}
                            onClick={() => setState({ ...state, technology: tech.id as Technology })}
                            accentColor={tech.color}
                          >
                            <div 
                              className="w-20 h-20 rounded-2xl flex items-center justify-center mb-8"
                              style={{ backgroundColor: `${tech.color}15`, color: tech.color }}
                            >
                              {tech.icon}
                            </div>
                            <h3 className="font-calistoga text-3xl text-[#1A1A1A] mb-1">{tech.id}</h3>
                            <p className="text-sm font-bold uppercase tracking-widest mb-6" style={{ color: tech.color }}>{tech.subtitle}</p>
                            <p className="text-[#4A4A4A] leading-relaxed mb-8 flex-grow">{tech.description}</p>
                            
                            <div className="pt-6 border-t border-black/5 mt-auto">
                              <ul className="space-y-3">
                                {tech.features.map((feature, i) => (
                                  <li key={i} className="flex items-start text-sm font-bold text-[#1A1A1A]">
                                    <CheckCircle2 size={18} className="mr-3 shrink-0" style={{ color: tech.color }} />
                                    <span className="mt-0.5">{feature}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </TiltCard>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 2: MATERIAL */}
                  {step === 2 && (
                    <motion.div
                      key="step2"
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      className="w-full"
                    >
                      <div className="mb-10 flex flex-col md:flex-row md:items-center gap-6">
                        <button onClick={prevStep} className="p-4 bg-white/60 backdrop-blur-md rounded-full border border-white hover:bg-white shadow-sm transition-all w-fit">
                          <ChevronLeft size={24} className="text-[#1A1A1A]" />
                        </button>
                        <div>
                          <h2 className="font-calistoga text-5xl text-[#1A1A1A] mb-4">Material für {state.technology}</h2>
                          <p className="text-[#4A4A4A] text-xl leading-loose">Definiere die Haptik und Mechanik. Jedes Material reagiert anders auf Temperatur und mechanische Last.</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {state.technology && MATERIALS[state.technology].map((mat) => (
                          <TiltCard 
                            key={mat.id}
                            isActive={state.material === mat.id}
                            onClick={() => setState({ ...state, material: mat.id })}
                            accentColor={activeTechColor}
                          >
                            <div className="flex flex-col h-full">
                              <div className="flex items-center gap-4 mb-6">
                                <div className="p-4 rounded-2xl bg-[#1A1A1A] text-white shrink-0 shadow-lg">
                                  {mat.icon}
                                </div>
                                <h3 className="font-calistoga text-2xl text-[#1A1A1A]">{mat.title}</h3>
                              </div>
                              <p className="text-[#4A4A4A] text-lg leading-loose">{mat.description}</p>
                            </div>
                          </TiltCard>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 3: QUALITY */}
                  {step === 3 && (
                    <motion.div
                      key="step3"
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      className="w-full"
                    >
                      <div className="mb-10 flex flex-col md:flex-row md:items-center gap-6">
                        <button onClick={prevStep} className="p-4 bg-white/60 backdrop-blur-md rounded-full border border-white hover:bg-white shadow-sm transition-all w-fit">
                          <ChevronLeft size={24} className="text-[#1A1A1A]" />
                        </button>
                        <div>
                          <h2 className="font-calistoga text-5xl text-[#1A1A1A] mb-4">Fertigungsqualität</h2>
                          <p className="text-[#4A4A4A] text-xl leading-loose">Bestimmt die Auflösung der Schichten (Layer-Height) und damit die Oberflächengüte sowie Produktionszeit.</p>
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-6">
                        {QUALITIES.map((qual) => (
                          <TiltCard 
                            key={qual.id}
                            isActive={state.quality === qual.id}
                            onClick={() => setState({ ...state, quality: qual.id as Quality })}
                            className="!p-8"
                          >
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                              <div className="flex items-center gap-6">
                                <div className={`p-5 rounded-2xl shrink-0 transition-colors duration-500 ${state.quality === qual.id ? 'bg-[#C41E3A] text-white shadow-lg' : 'bg-black/5 text-[#1A1A1A]'}`}>
                                  {qual.icon}
                                </div>
                                <div>
                                  <h3 className="font-calistoga text-3xl text-[#1A1A1A] mb-2">{qual.title}</h3>
                                  <p className="text-[#4A4A4A] text-lg leading-loose max-w-lg">{qual.description}</p>
                                </div>
                              </div>
                              <div className="text-2xl font-black tracking-widest text-[#C41E3A] bg-[#C41E3A]/10 px-6 py-3 rounded-xl shrink-0 w-fit">
                                {qual.price}
                              </div>
                            </div>
                          </TiltCard>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 4: UPLOAD & INFO */}
                  {step === 4 && (
                    <motion.div
                      key="step4"
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      className="w-full"
                    >
                      <div className="mb-10 flex flex-col md:flex-row md:items-center gap-6">
                        <button onClick={prevStep} className="p-4 bg-white/60 backdrop-blur-md rounded-full border border-white hover:bg-white shadow-sm transition-all w-fit">
                          <ChevronLeft size={24} className="text-[#1A1A1A]" />
                        </button>
                        <div>
                          <h2 className="font-calistoga text-5xl text-[#1A1A1A] mb-4">Projektdetails & Upload</h2>
                          <p className="text-[#4A4A4A] text-xl leading-loose">Fast geschafft. Lade dein CAD-Modell hoch und gib uns ein paar Insights zu deinem Projekt.</p>
                        </div>
                      </div>
                      
                      <div className="bg-white/70 backdrop-blur-xl rounded-[40px] p-8 md:p-12 border border-white shadow-xl">
                        <form onSubmit={handleSubmit} className="space-y-10">
                          
                          {/* Gamified File Upload */}
                          <div>
                            <label className="block text-sm font-bold text-[#1A1A1A] mb-4 uppercase tracking-wider flex items-center">
                              <FileIcon size={18} className="mr-2 text-[#C41E3A]" /> 3D-Modell (Optional)
                            </label>
                            <div className="relative group">
                              <input 
                                type="file" 
                                accept=".stl,.obj,.step,.stp"
                                onChange={handleFileUpload}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                onDragEnter={() => setIsDragging(true)}
                                onDragLeave={() => setIsDragging(false)}
                                onDrop={handleFileDrop}
                              />
                              <motion.div 
                                animate={{ scale: isDragging ? 1.02 : 1 }}
                                className={`
                                  border-2 border-dashed rounded-3xl p-12 text-center transition-colors duration-300 overflow-hidden relative
                                  ${state.file ? 'border-green-500 bg-green-50/50' : 
                                    isDragging ? 'border-[#C41E3A] bg-[#C41E3A]/10' : 'border-black/20 bg-black/5 group-hover:bg-black/10'}
                                `}
                              >
                                {state.file ? (
                                  <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center">
                                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                                      <CheckCircle2 className="text-green-600" size={40} />
                                    </div>
                                    <p className="font-calistoga text-2xl text-[#1A1A1A] mb-2">{state.file.name}</p>
                                    <p className="text-[#4A4A4A] font-bold tracking-widest uppercase text-sm mb-6">{(state.file.size / 1024 / 1024).toFixed(2)} MB</p>
                                    <button 
                                      type="button" 
                                      onClick={(e) => { e.preventDefault(); setState({ ...state, file: null }); }}
                                      className="px-6 py-3 bg-white rounded-xl shadow-sm text-red-500 font-bold flex items-center hover:bg-red-50 transition-colors z-20 relative"
                                    >
                                      <X size={18} className="mr-2" /> Datei entfernen
                                    </button>
                                  </motion.div>
                                ) : (
                                  <div className="flex flex-col items-center">
                                    <motion.div 
                                      animate={{ y: [0, -15, 0] }} 
                                      transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                                      className="w-24 h-24 bg-white rounded-full shadow-lg flex items-center justify-center mb-8"
                                    >
                                      <UploadCloud className="text-[#C41E3A]" size={40} />
                                    </motion.div>
                                    <p className="font-calistoga text-3xl text-[#1A1A1A] mb-4">Hier klicken oder Datei hineinziehen</p>
                                    <div className="flex gap-3 text-sm font-bold text-[#4A4A4A] uppercase tracking-wider">
                                      <span className="px-3 py-1 bg-white rounded-md shadow-sm">.STL</span>
                                      <span className="px-3 py-1 bg-white rounded-md shadow-sm">.OBJ</span>
                                      <span className="px-3 py-1 bg-white rounded-md shadow-sm">.STEP</span>
                                    </div>
                                  </div>
                                )}
                              </motion.div>
                            </div>
                          </div>

                          {/* Contact Info */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                              <label className="text-sm font-bold text-[#1A1A1A] uppercase tracking-wider">Vorname *</label>
                              <input 
                                required 
                                type="text" 
                                value={state.firstName}
                                onChange={(e) => setState({ ...state, firstName: e.target.value })}
                                className="w-full bg-white/80 border border-black/10 rounded-2xl px-6 py-5 focus:outline-none focus:border-[#C41E3A] focus:ring-4 focus:ring-[#C41E3A]/10 transition-all font-medium text-[#1A1A1A] text-lg shadow-sm" 
                                placeholder="Max" 
                              />
                            </div>
                            <div className="space-y-3">
                              <label className="text-sm font-bold text-[#1A1A1A] uppercase tracking-wider">Nachname *</label>
                              <input 
                                required 
                                type="text" 
                                value={state.lastName}
                                onChange={(e) => setState({ ...state, lastName: e.target.value })}
                                className="w-full bg-white/80 border border-black/10 rounded-2xl px-6 py-5 focus:outline-none focus:border-[#C41E3A] focus:ring-4 focus:ring-[#C41E3A]/10 transition-all font-medium text-[#1A1A1A] text-lg shadow-sm" 
                                placeholder="Mustermann" 
                              />
                            </div>
                          </div>

                          <div className="space-y-3">
                            <label className="text-sm font-bold text-[#1A1A1A] uppercase tracking-wider">Email *</label>
                            <input 
                              required 
                              type="email" 
                              value={state.email}
                              onChange={(e) => setState({ ...state, email: e.target.value })}
                              className="w-full bg-white/80 border border-black/10 rounded-2xl px-6 py-5 focus:outline-none focus:border-[#C41E3A] focus:ring-4 focus:ring-[#C41E3A]/10 transition-all font-medium text-[#1A1A1A] text-lg shadow-sm" 
                              placeholder="max@beispiel.de" 
                            />
                          </div>

                          <div className="space-y-3">
                            <label className="text-sm font-bold text-[#1A1A1A] uppercase tracking-wider">Projektbeschreibung *</label>
                            <textarea 
                              required 
                              rows={5} 
                              value={state.description}
                              onChange={(e) => setState({ ...state, description: e.target.value })}
                              className="w-full bg-white/80 border border-black/10 rounded-2xl px-6 py-5 focus:outline-none focus:border-[#C41E3A] focus:ring-4 focus:ring-[#C41E3A]/10 transition-all font-medium text-[#1A1A1A] text-lg resize-none leading-loose shadow-sm" 
                              placeholder="Beschreibe dein Projekt. Wofür wird das Bauteil genutzt? Gibt es besondere Anforderungen an Belastbarkeit, Temperaturbeständigkeit oder Optik?" 
                            />
                          </div>

                        </form>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Navigation Controls (Always visible below the step content) */}
              <div className="mt-12 flex justify-end pb-8">
                {step < 4 ? (
                  <button 
                    onClick={nextStep}
                    disabled={!isStepValid()}
                    className={`
                      group flex items-center justify-center px-12 py-6 rounded-full font-bold text-xl transition-all duration-300
                      ${isStepValid() 
                        ? 'bg-[#1A1A1A] text-white hover:bg-[#C41E3A] shadow-2xl hover:shadow-[#C41E3A]/40 hover:-translate-y-1' 
                        : 'bg-black/5 text-black/30 cursor-not-allowed'}
                    `}
                  >
                    Nächster Schritt
                    <ChevronRight className={`ml-3 transition-transform ${isStepValid() ? 'group-hover:translate-x-2' : ''}`} size={24} />
                  </button>
                ) : (
                  <button 
                    onClick={handleSubmit}
                    disabled={!isStepValid()}
                    className={`
                      group flex items-center justify-center px-12 py-6 rounded-full font-bold text-xl transition-all duration-300 w-full md:w-auto
                      ${isStepValid() 
                        ? 'bg-[#C41E3A] text-white hover:bg-[#A01830] shadow-[0_20px_40px_rgba(196,30,58,0.3)] hover:shadow-[0_25px_50px_rgba(196,30,58,0.4)] hover:-translate-y-1' 
                        : 'bg-black/5 text-black/30 cursor-not-allowed'}
                    `}
                  >
                    Anfrage finalisieren
                    <Zap className="ml-3" size={24} />
                  </button>
                )}
              </div>
            </div>

            {/* SIDEBAR SUMMARY (Right Side 35%, Sticky) */}
            <div className="w-full lg:w-[35%] shrink-0">
              <div className="sticky top-32">
                <motion.div 
                  className="bg-[#1A1A1A] rounded-[40px] p-10 text-white shadow-2xl relative overflow-hidden"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, type: 'spring', damping: 25 }}
                >
                  {/* Premium Sidebar Background Glow */}
                  <div className="absolute top-0 right-0 w-80 h-80 bg-[#C41E3A] rounded-full blur-[100px] opacity-20 -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                  
                  <h3 className="font-calistoga text-3xl mb-10 flex items-center relative z-10">
                    <Box className="text-[#C41E3A] mr-4" size={32} /> Setup
                  </h3>
                  
                  <div className="space-y-6 relative z-10">
                    
                    {/* Technology Summary */}
                    <div className="group cursor-pointer" onClick={() => setStep(1)}>
                      <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-3 flex items-center">
                        1. Technologie 
                        {state.technology && <CheckCircle2 size={16} className="text-green-400 ml-2" />}
                      </p>
                      <div className={`p-5 rounded-2xl border transition-all duration-300 ${state.technology ? 'bg-white/10 border-white/20 hover:border-white/40' : 'bg-transparent border-dashed border-white/10'}`}>
                        {state.technology ? (
                          <div className="flex items-center">
                            <span className="font-calistoga text-2xl text-white">{state.technology}</span>
                            <span className="ml-auto text-xs text-[#C41E3A] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Ändern</span>
                          </div>
                        ) : (
                          <span className="text-white/20 italic text-sm">Ausstehend...</span>
                        )}
                      </div>
                    </div>

                    {/* Material Summary */}
                    <div className="group cursor-pointer" onClick={() => setStep(2)}>
                      <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-3 flex items-center">
                        2. Material
                        {state.material && <CheckCircle2 size={16} className="text-green-400 ml-2" />}
                      </p>
                      <div className={`p-5 rounded-2xl border transition-all duration-300 ${state.material ? 'bg-white/10 border-white/20 hover:border-white/40' : 'bg-transparent border-dashed border-white/10'}`}>
                        {state.material ? (
                          <div className="flex items-center">
                            <span className="font-calistoga text-2xl text-white">{state.material}</span>
                            <span className="ml-auto text-xs text-[#C41E3A] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Ändern</span>
                          </div>
                        ) : (
                          <span className="text-white/20 italic text-sm">Ausstehend...</span>
                        )}
                      </div>
                    </div>

                    {/* Quality Summary */}
                    <div className="group cursor-pointer" onClick={() => setStep(3)}>
                      <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-3 flex items-center">
                        3. Qualität
                        {state.quality && <CheckCircle2 size={16} className="text-green-400 ml-2" />}
                      </p>
                      <div className={`p-5 rounded-2xl border transition-all duration-300 ${state.quality ? 'bg-white/10 border-white/20 hover:border-white/40' : 'bg-transparent border-dashed border-white/10'}`}>
                        {state.quality ? (
                          <div className="flex items-center">
                            <span className="font-calistoga text-2xl text-white">{state.quality}</span>
                            <span className="ml-auto text-xs text-[#C41E3A] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Ändern</span>
                          </div>
                        ) : (
                          <span className="text-white/20 italic text-sm">Ausstehend...</span>
                        )}
                      </div>
                    </div>

                    {/* Live Upload Status */}
                    <div className="mt-8 pt-8 border-t border-white/10">
                       <div className="flex items-start gap-4 p-5 bg-[#C41E3A]/10 rounded-2xl border border-[#C41E3A]/20">
                         <Info className="text-[#C41E3A] shrink-0 mt-0.5" size={20} />
                         <div>
                           <h4 className="text-white font-bold text-sm mb-1">Live Analyse</h4>
                           <p className="text-white/60 text-xs leading-relaxed">
                             Deine Konfiguration wird in Echtzeit gespeichert. Im nächsten Schritt prüfen unsere Ingenieure die Machbarkeit für deine Uploads.
                           </p>
                         </div>
                       </div>
                    </div>

                  </div>
                </motion.div>
                
                {/* Premium Trust Badges */}
                <div className="mt-8 flex flex-wrap gap-4 text-xs font-bold text-[#1A1A1A] uppercase tracking-widest justify-center">
                  <span className="flex items-center bg-white/60 backdrop-blur-sm px-4 py-3 rounded-xl shadow-sm border border-black/5">
                    <Shield size={16} className="mr-2 text-[#C41E3A]" /> 100% Sicher
                  </span>
                  <span className="flex items-center bg-white/60 backdrop-blur-sm px-4 py-3 rounded-xl shadow-sm border border-black/5">
                    <Zap size={16} className="mr-2 text-[#C41E3A]" /> Express Check
                  </span>
                </div>
              </div>
            </div>

          </div>
        )}
      </section>
    </main>
  );
}
