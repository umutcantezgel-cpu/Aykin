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
  Printer
} from 'lucide-react';
import { SubpageHero } from '@/components/ui/SubpageHero';
import { PrimaryCTA } from '@/components/atoms/buttons';

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
    title: 'FDM (Fused Deposition Modeling)',
    description: 'Ideal für kostengünstige Prototypen, Vorrichtungen und Funktionsteile. Schichtweises Auftragen von geschmolzenem Kunststoff.',
    icon: <Layers size={32} />,
    features: ['Kostengünstig', 'Robust', 'Viele Materialien'],
    color: '#C41E3A'
  },
  {
    id: 'SLA',
    title: 'SLA (Stereolithografie)',
    description: 'Perfekt für extrem detaillierte und glatte Oberflächen. Aushärten von flüssigem Harz durch Laser.',
    icon: <Droplet size={32} />,
    features: ['Hohe Präzision', 'Glatte Oberfläche', 'Wasserdicht'],
    color: '#3A86FF'
  },
  {
    id: 'SLS',
    title: 'SLS (Selektives Lasersintern)',
    description: 'Für komplexe Geometrien ohne Stützstrukturen. Verschmelzen von Pulver durch Laser.',
    icon: <Zap size={32} />,
    features: ['Keine Stützstrukturen', 'Industriequalität', 'Komplexe Formen'],
    color: '#8338EC'
  }
];

const MATERIALS: Record<string, any[]> = {
  FDM: [
    { id: 'PLA', title: 'PLA', description: 'Umweltfreundlich, leicht zu drucken, ideal für einfache Prototypen und Modelle.', icon: <Box size={24} /> },
    { id: 'PETG', title: 'PETG', description: 'Gute Balance zwischen Festigkeit und Flexibilität, wasser- und chemikalienbeständig.', icon: <Shield size={24} /> },
    { id: 'ABS', title: 'ABS', description: 'Sehr robust, hitzebeständig, für Funktionsteile und mechanische Beanspruchung.', icon: <Settings size={24} /> },
    { id: 'TPU', title: 'TPU', description: 'Flexibles, gummiartiges Material für Dichtungen, Dämpfer und flexible Teile.', icon: <Maximize size={24} /> }
  ],
  SLA: [
    { id: 'Standard Resin', title: 'Standard Harz', description: 'Hohe Detailgenauigkeit für Miniaturen, Schmuck und visuelle Prototypen.', icon: <Sparkles size={24} /> },
    { id: 'Tough Resin', title: 'Tough Harz', description: 'Simuliert ABS, hohe Schlagfestigkeit für funktionale Baugruppen.', icon: <Shield size={24} /> },
    { id: 'Clear Resin', title: 'Clear Harz', description: 'Transparentes Material für Optik-Prototypen und Fluidik-Bauteile.', icon: <Droplet size={24} /> }
  ],
  SLS: [
    { id: 'PA12', title: 'PA12 (Nylon)', description: 'Der Standard für SLS. Exzellente mechanische Eigenschaften, langlebig.', icon: <Zap size={24} /> },
    { id: 'PA12 GF', title: 'PA12 Glassfilled', description: 'Glasfaserverstärkt für extrem hohe Steifigkeit und Temperaturbeständigkeit.', icon: <Shield size={24} /> },
    { id: 'TPU', title: 'TPU (Flexibel)', description: 'Für komplexe, flexible Teile, die im FDM nicht realisierbar sind.', icon: <Maximize size={24} /> }
  ]
};

const QUALITIES = [
  {
    id: 'Prototyp',
    title: 'Prototyping / Draft',
    description: 'Schnellste Fertigung, gröbere Schichten. Ideal für erste Form- und Passungsprüfungen.',
    icon: <Gauge size={32} />,
    priceModifier: '€'
  },
  {
    id: 'Standard',
    title: 'Standard',
    description: 'Guter Kompromiss aus Geschwindigkeit und Oberflächengüte. Für die meisten Anwendungen.',
    icon: <CheckCircle2 size={32} />,
    priceModifier: '€€'
  },
  {
    id: 'Industrie',
    title: 'High-End / Industrie',
    description: 'Maximale Präzision, feinste Schichtstärke, optimale mechanische Eigenschaften.',
    icon: <Sparkles size={32} />,
    priceModifier: '€€€'
  }
];

// --- ANIMATION VARIANTS ---
const containerVariants: any = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  },
  exit: { opacity: 0, transition: { duration: 0.2 } }
};

const itemVariants: any = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 24 }
  }
};

const slideVariants: any = {
  enter: (direction: number) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 300, damping: 30 }
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 100 : -100,
    opacity: 0,
    transition: { duration: 0.2 }
  })
};

// --- COMPONENTS ---

// 3D Tilt Card Component
function TiltCard({ 
  children, 
  isActive, 
  onClick, 
  className = '' 
}: { 
  children: React.ReactNode, 
  isActive: boolean, 
  onClick: () => void,
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7deg', '-7deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7deg', '7deg']);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
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
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`
        relative cursor-pointer rounded-3xl p-6 sm:p-8 transition-colors duration-300
        backdrop-blur-md bg-white/40 border-2
        ${isActive ? 'border-[#C41E3A] shadow-[0_0_40px_rgba(196,30,58,0.2)] bg-white/80' : 'border-[#E8D5C4] hover:bg-white/60 hover:border-[#C41E3A]/50'}
        ${className}
      `}
    >
      {isActive && (
        <motion.div 
          layoutId="activeIndicator"
          className="absolute -top-3 -right-3 bg-[#C41E3A] text-white rounded-full p-1.5 shadow-lg"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 500, damping: 25 }}
        >
          <Check size={20} />
        </motion.div>
      )}
      <div style={{ transform: 'translateZ(20px)' }}>
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

  // Reset material if technology changes
  useEffect(() => {
    setState(prev => ({ ...prev, material: null }));
  }, [state.technology]);

  return (
    <main className="min-h-screen bg-[#FAF8F5] overflow-hidden selection:bg-[#C41E3A] selection:text-white pb-32">
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden flex justify-center items-center opacity-30">
        <motion.div 
          animate={{ rotate: 360 }} 
          transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
          className="absolute w-[800px] h-[800px] rounded-full blur-[100px] bg-gradient-to-tr from-[#C41E3A]/20 to-transparent -top-40 -right-40"
        />
        <motion.div 
          animate={{ rotate: -360 }} 
          transition={{ duration: 200, repeat: Infinity, ease: "linear" }}
          className="absolute w-[600px] h-[600px] rounded-full blur-[80px] bg-gradient-to-bl from-[#E8D5C4]/40 to-transparent bottom-0 left-0"
        />
      </div>

      <SubpageHero 
        label="3D-KONFIGURATOR"
        title="Konfiguriere dein Bauteil."
        subtitle="Erlebe unseren interaktiven Prozess. Wähle Technologie, Material und Qualität für dein perfektes 3D-Druck-Ergebnis."
      />

      <section className="relative z-10 py-12 px-6 max-w-7xl mx-auto">
        {submitted ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-white/60 backdrop-blur-xl rounded-[40px] p-16 md:p-24 text-center border-2 border-[#E8D5C4] shadow-2xl max-w-3xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: 360 }}
              transition={{ type: 'spring', damping: 20, stiffness: 200, delay: 0.2 }}
            >
              <CheckCircle2 className="mx-auto text-[#C41E3A] mb-8" size={96} />
            </motion.div>
            <h2 className="font-calistoga text-5xl text-[#1A1A1A] mb-6 tracking-tight">Anfrage erfolgreich!</h2>
            <p className="text-[#2D2D2D] text-xl leading-relaxed mb-12">
              Vielen Dank, {state.firstName}! Wir analysieren deine Konfiguration und dein Modell. Du erhältst innerhalb von 24 Stunden ein individuelles Angebot.
            </p>
            <div className="inline-block p-6 rounded-2xl bg-[#FAF8F5] border border-[#E8D5C4] text-left w-full max-w-md">
              <h3 className="font-bold text-[#1A1A1A] mb-4 text-lg border-b border-[#E8D5C4] pb-2">Zusammenfassung:</h3>
              <ul className="space-y-3 text-[#2D2D2D]">
                <li className="flex justify-between"><span>Technologie:</span> <span className="font-bold">{state.technology}</span></li>
                <li className="flex justify-between"><span>Material:</span> <span className="font-bold">{state.material}</span></li>
                <li className="flex justify-between"><span>Qualität:</span> <span className="font-bold">{state.quality}</span></li>
              </ul>
            </div>
          </motion.div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            
            {/* Main Configurator Area */}
            <div className="flex-1 w-full relative">
              
              {/* Stepper Progress */}
              <div className="mb-12">
                <div className="flex justify-between items-center mb-4 relative">
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-[#E8D5C4] rounded-full z-0"></div>
                  <motion.div 
                    className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-[#C41E3A] rounded-full z-0"
                    initial={{ width: 0 }}
                    animate={{ width: `${((step - 1) / 3) * 100}%` }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  />
                  {[1, 2, 3, 4].map((s) => (
                    <div 
                      key={s} 
                      className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-300 shadow-lg
                        ${s === step ? 'bg-[#C41E3A] text-white ring-4 ring-[#C41E3A]/20' : 
                          s < step ? 'bg-[#1A1A1A] text-white' : 'bg-white text-[#1A1A1A] border-2 border-[#E8D5C4]'}
                      `}
                    >
                      {s < step ? <Check size={20} /> : s}
                    </div>
                  ))}
                </div>
                <div className="flex justify-between text-xs font-bold text-[#1A1A1A] uppercase tracking-wider">
                  <span className={step >= 1 ? 'text-[#C41E3A]' : 'text-gray-400'}>Technologie</span>
                  <span className={step >= 2 ? 'text-[#C41E3A]' : 'text-gray-400'}>Material</span>
                  <span className={step >= 3 ? 'text-[#C41E3A]' : 'text-gray-400'}>Qualität</span>
                  <span className={step >= 4 ? 'text-[#C41E3A]' : 'text-gray-400'}>Details</span>
                </div>
              </div>

              {/* Step Content */}
              <div className="min-h-[500px] relative perspective-[1000px]">
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
                      className="absolute inset-0 w-full"
                    >
                      <div className="mb-8">
                        <h2 className="font-calistoga text-4xl text-[#1A1A1A] mb-4">Wähle die Technologie</h2>
                        <p className="text-[#2D2D2D] text-lg">Jede Technologie hat ihre eigenen Stärken. Wähle diejenige, die am besten zu deinem Projekt passt.</p>
                      </div>
                      
                      <motion.div 
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 md:grid-cols-3 gap-6"
                      >
                        {TECHNOLOGIES.map((tech) => (
                          <motion.div key={tech.id} variants={itemVariants} className="h-full">
                            <TiltCard 
                              isActive={state.technology === tech.id}
                              onClick={() => setState({ ...state, technology: tech.id as Technology })}
                              className="h-full flex flex-col"
                            >
                              <div 
                                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-sm"
                                style={{ backgroundColor: `${tech.color}15`, color: tech.color }}
                              >
                                {tech.icon}
                              </div>
                              <h3 className="font-calistoga text-2xl text-[#1A1A1A] mb-3">{tech.title}</h3>
                              <p className="text-[#2D2D2D] flex-grow mb-6">{tech.description}</p>
                              <ul className="space-y-2 mt-auto">
                                {tech.features.map((feature, i) => (
                                  <li key={i} className="flex items-center text-sm font-medium text-[#1A1A1A]">
                                    <CheckCircle2 size={16} className="text-green-600 mr-2" />
                                    {feature}
                                  </li>
                                ))}
                              </ul>
                            </TiltCard>
                          </motion.div>
                        ))}
                      </motion.div>
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
                      className="absolute inset-0 w-full"
                    >
                      <div className="mb-8 flex items-center gap-4">
                        <button onClick={prevStep} className="p-2 bg-white rounded-full border border-[#E8D5C4] hover:bg-[#FAF8F5] transition-colors">
                          <ChevronLeft size={24} className="text-[#1A1A1A]" />
                        </button>
                        <div>
                          <h2 className="font-calistoga text-4xl text-[#1A1A1A] mb-2">Material für {state.technology}</h2>
                          <p className="text-[#2D2D2D] text-lg">Wähle das Material, das deinen mechanischen und visuellen Anforderungen entspricht.</p>
                        </div>
                      </div>
                      
                      <motion.div 
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                      >
                        {state.technology && MATERIALS[state.technology].map((mat) => (
                          <motion.div key={mat.id} variants={itemVariants}>
                            <TiltCard 
                              isActive={state.material === mat.id}
                              onClick={() => setState({ ...state, material: mat.id })}
                            >
                              <div className="flex items-start">
                                <div className="bg-[#1A1A1A] text-white p-3 rounded-xl mr-4 shrink-0">
                                  {mat.icon}
                                </div>
                                <div>
                                  <h3 className="font-bold text-xl text-[#1A1A1A] mb-2">{mat.title}</h3>
                                  <p className="text-[#2D2D2D] text-sm leading-relaxed">{mat.description}</p>
                                </div>
                              </div>
                            </TiltCard>
                          </motion.div>
                        ))}
                      </motion.div>
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
                      className="absolute inset-0 w-full"
                    >
                      <div className="mb-8 flex items-center gap-4">
                        <button onClick={prevStep} className="p-2 bg-white rounded-full border border-[#E8D5C4] hover:bg-[#FAF8F5] transition-colors">
                          <ChevronLeft size={24} className="text-[#1A1A1A]" />
                        </button>
                        <div>
                          <h2 className="font-calistoga text-4xl text-[#1A1A1A] mb-2">Fertigungsqualität</h2>
                          <p className="text-[#2D2D2D] text-lg">Beeinflusst Oberflächengüte, Maßhaltigkeit und Produktionszeit.</p>
                        </div>
                      </div>
                      
                      <motion.div 
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="flex flex-col gap-4"
                      >
                        {QUALITIES.map((qual) => (
                          <motion.div key={qual.id} variants={itemVariants}>
                            <TiltCard 
                              isActive={state.quality === qual.id}
                              onClick={() => setState({ ...state, quality: qual.id as Quality })}
                              className="!p-6"
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <div className={`p-4 rounded-xl mr-6 ${state.quality === qual.id ? 'bg-[#C41E3A] text-white' : 'bg-gray-100 text-[#1A1A1A]'} transition-colors duration-300`}>
                                    {qual.icon}
                                  </div>
                                  <div>
                                    <h3 className="font-bold text-xl text-[#1A1A1A] mb-1">{qual.title}</h3>
                                    <p className="text-[#2D2D2D] text-sm max-w-lg">{qual.description}</p>
                                  </div>
                                </div>
                                <div className="text-xl font-calistoga text-[#C41E3A] bg-[#C41E3A]/10 px-4 py-2 rounded-lg shrink-0 ml-4">
                                  {qual.priceModifier}
                                </div>
                              </div>
                            </TiltCard>
                          </motion.div>
                        ))}
                      </motion.div>
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
                      className="absolute inset-0 w-full"
                    >
                      <div className="mb-8 flex items-center gap-4">
                        <button onClick={prevStep} className="p-2 bg-white rounded-full border border-[#E8D5C4] hover:bg-[#FAF8F5] transition-colors">
                          <ChevronLeft size={24} className="text-[#1A1A1A]" />
                        </button>
                        <div>
                          <h2 className="font-calistoga text-4xl text-[#1A1A1A] mb-2">Projektdetails & Upload</h2>
                          <p className="text-[#2D2D2D] text-lg">Fast geschafft! Lade dein Modell hoch und erzähl uns von deinem Projekt.</p>
                        </div>
                      </div>
                      
                      <div className="bg-white/60 backdrop-blur-md rounded-3xl p-8 border-2 border-[#E8D5C4] shadow-xl">
                        <form onSubmit={handleSubmit} className="space-y-8">
                          
                          {/* File Upload */}
                          <div>
                            <label className="block text-sm font-bold text-[#1A1A1A] mb-3 uppercase tracking-wider">3D-Modell (Optional)</label>
                            <div className="relative group">
                              <input 
                                type="file" 
                                accept=".stl,.obj,.step,.stp"
                                onChange={handleFileUpload}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                              />
                              <div className={`
                                border-2 border-dashed rounded-2xl p-10 text-center transition-all duration-300
                                ${state.file ? 'border-green-500 bg-green-50' : 'border-[#C41E3A]/40 bg-[#C41E3A]/5 group-hover:bg-[#C41E3A]/10 group-hover:border-[#C41E3A]'}
                              `}>
                                {state.file ? (
                                  <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center">
                                    <FileIcon className="text-green-600 mb-4" size={48} />
                                    <p className="font-bold text-green-800 text-lg">{state.file.name}</p>
                                    <p className="text-green-600/80 text-sm mt-1">{(state.file.size / 1024 / 1024).toFixed(2)} MB</p>
                                    <button 
                                      type="button" 
                                      onClick={(e) => { e.preventDefault(); setState({ ...state, file: null }); }}
                                      className="mt-4 px-4 py-2 bg-white rounded-lg shadow-sm text-red-500 text-sm font-bold flex items-center hover:bg-red-50 transition-colors z-20 relative"
                                    >
                                      <X size={16} className="mr-1" /> Entfernen
                                    </button>
                                  </motion.div>
                                ) : (
                                  <div className="flex flex-col items-center">
                                    <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
                                      <UploadCloud className="text-[#C41E3A] mb-4" size={48} />
                                    </motion.div>
                                    <p className="font-bold text-[#1A1A1A] text-xl mb-2">Hier klicken oder Datei hineinziehen</p>
                                    <p className="text-[#2D2D2D]">Unterstützte Formate: .stl, .obj, .step (Max. 100MB)</p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Contact Info */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <label className="text-xs font-bold text-[#1A1A1A] uppercase tracking-wider">Vorname *</label>
                              <input 
                                required 
                                type="text" 
                                value={state.firstName}
                                onChange={(e) => setState({ ...state, firstName: e.target.value })}
                                className="w-full bg-white/80 border-2 border-[#E8D5C4] rounded-xl px-5 py-4 focus:outline-none focus:border-[#C41E3A] focus:ring-4 focus:ring-[#C41E3A]/10 transition-all font-medium text-[#1A1A1A]" 
                                placeholder="Max" 
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-xs font-bold text-[#1A1A1A] uppercase tracking-wider">Nachname *</label>
                              <input 
                                required 
                                type="text" 
                                value={state.lastName}
                                onChange={(e) => setState({ ...state, lastName: e.target.value })}
                                className="w-full bg-white/80 border-2 border-[#E8D5C4] rounded-xl px-5 py-4 focus:outline-none focus:border-[#C41E3A] focus:ring-4 focus:ring-[#C41E3A]/10 transition-all font-medium text-[#1A1A1A]" 
                                placeholder="Mustermann" 
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <label className="text-xs font-bold text-[#1A1A1A] uppercase tracking-wider">Email *</label>
                            <input 
                              required 
                              type="email" 
                              value={state.email}
                              onChange={(e) => setState({ ...state, email: e.target.value })}
                              className="w-full bg-white/80 border-2 border-[#E8D5C4] rounded-xl px-5 py-4 focus:outline-none focus:border-[#C41E3A] focus:ring-4 focus:ring-[#C41E3A]/10 transition-all font-medium text-[#1A1A1A]" 
                              placeholder="max@beispiel.de" 
                            />
                          </div>

                          <div className="space-y-2">
                            <label className="text-xs font-bold text-[#1A1A1A] uppercase tracking-wider">Projektbeschreibung *</label>
                            <textarea 
                              required 
                              rows={5} 
                              value={state.description}
                              onChange={(e) => setState({ ...state, description: e.target.value })}
                              className="w-full bg-white/80 border-2 border-[#E8D5C4] rounded-xl px-5 py-4 focus:outline-none focus:border-[#C41E3A] focus:ring-4 focus:ring-[#C41E3A]/10 transition-all font-medium text-[#1A1A1A] resize-none" 
                              placeholder="Beschreibe dein Projekt. Wofür wird das Bauteil genutzt? Gibt es besondere Anforderungen an Belastbarkeit, Temperaturbeständigkeit oder Optik?" 
                            />
                          </div>

                        </form>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Navigation Controls */}
              <div className="mt-12 pt-8 border-t border-[#E8D5C4] flex justify-end">
                {step < 4 ? (
                  <button 
                    onClick={nextStep}
                    disabled={!isStepValid()}
                    className={`
                      group flex items-center justify-center px-10 py-5 rounded-full font-bold text-lg transition-all duration-300
                      ${isStepValid() 
                        ? 'bg-[#1A1A1A] text-white hover:bg-[#C41E3A] shadow-xl hover:shadow-[#C41E3A]/40 hover:-translate-y-1' 
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'}
                    `}
                  >
                    Weiter
                    <ChevronRight className={`ml-2 transition-transform ${isStepValid() ? 'group-hover:translate-x-1' : ''}`} />
                  </button>
                ) : (
                  <button 
                    onClick={handleSubmit}
                    disabled={!isStepValid()}
                    className={`
                      group flex items-center justify-center px-10 py-5 rounded-full font-bold text-lg transition-all duration-300 w-full md:w-auto
                      ${isStepValid() 
                        ? 'bg-[#C41E3A] text-white hover:bg-[#A01830] shadow-[0_10px_30px_rgba(196,30,58,0.3)] hover:shadow-[0_15px_40px_rgba(196,30,58,0.4)] hover:-translate-y-1' 
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'}
                    `}
                  >
                    Anfrage kostenpflichtig prüfen lassen
                    <Printer className="ml-3" />
                  </button>
                )}
              </div>
            </div>

            {/* Sidebar Summary (Sticky) */}
            <div className="w-full lg:w-[400px] shrink-0">
              <div className="sticky top-32">
                <motion.div 
                  className="bg-[#1A1A1A] rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, type: 'spring', damping: 25 }}
                >
                  {/* Decorative background in sidebar */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#C41E3A]/30 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                  <h3 className="font-calistoga text-2xl mb-8 flex items-center">
                    <Box className="text-[#C41E3A] mr-3" /> Konfiguration
                  </h3>
                  
                  <div className="space-y-6 relative z-10">
                    
                    {/* Technology Summary */}
                    <div className="group">
                      <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2 flex items-center">
                        1. Technologie 
                        {state.technology && <CheckCircle2 size={14} className="text-green-500 ml-2" />}
                      </p>
                      <div className={`p-4 rounded-xl border ${state.technology ? 'bg-white/10 border-white/20' : 'bg-transparent border-dashed border-white/10'} transition-colors`}>
                        {state.technology ? (
                          <div className="flex items-center">
                            <span className="font-bold text-lg text-white">{state.technology}</span>
                            <button onClick={() => setStep(1)} className="ml-auto text-xs text-[#C41E3A] hover:text-white transition-colors opacity-0 group-hover:opacity-100">Ändern</button>
                          </div>
                        ) : (
                          <span className="text-gray-500 italic text-sm">Noch nicht gewählt</span>
                        )}
                      </div>
                    </div>

                    {/* Material Summary */}
                    <div className="group">
                      <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2 flex items-center">
                        2. Material
                        {state.material && <CheckCircle2 size={14} className="text-green-500 ml-2" />}
                      </p>
                      <div className={`p-4 rounded-xl border ${state.material ? 'bg-white/10 border-white/20' : 'bg-transparent border-dashed border-white/10'} transition-colors`}>
                        {state.material ? (
                          <div className="flex items-center">
                            <span className="font-bold text-lg text-white">{state.material}</span>
                            <button onClick={() => setStep(2)} className="ml-auto text-xs text-[#C41E3A] hover:text-white transition-colors opacity-0 group-hover:opacity-100">Ändern</button>
                          </div>
                        ) : (
                          <span className="text-gray-500 italic text-sm">Noch nicht gewählt</span>
                        )}
                      </div>
                    </div>

                    {/* Quality Summary */}
                    <div className="group">
                      <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2 flex items-center">
                        3. Qualität
                        {state.quality && <CheckCircle2 size={14} className="text-green-500 ml-2" />}
                      </p>
                      <div className={`p-4 rounded-xl border ${state.quality ? 'bg-white/10 border-white/20' : 'bg-transparent border-dashed border-white/10'} transition-colors`}>
                        {state.quality ? (
                          <div className="flex items-center">
                            <span className="font-bold text-lg text-white">{state.quality}</span>
                            <button onClick={() => setStep(3)} className="ml-auto text-xs text-[#C41E3A] hover:text-white transition-colors opacity-0 group-hover:opacity-100">Ändern</button>
                          </div>
                        ) : (
                          <span className="text-gray-500 italic text-sm">Noch nicht gewählt</span>
                        )}
                      </div>
                    </div>

                    {/* Progress Indicator inside Sidebar */}
                    <div className="mt-8 pt-8 border-t border-white/10">
                      <div className="flex items-center justify-between text-sm mb-3">
                        <span className="text-gray-400">Fortschritt</span>
                        <span className="text-white font-bold">{Math.round(((step - 1) / 4) * 100)}%</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                        <motion.div 
                          className="bg-gradient-to-r from-[#C41E3A] to-[#ff4766] h-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${((step - 1) / 3) * 100}%` }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                    </div>

                  </div>
                </motion.div>
                
                {/* Trust Badges */}
                <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-bold text-[#2D2D2D] opacity-60">
                  <span className="flex items-center bg-white px-3 py-2 rounded-lg shadow-sm border border-[#E8D5C4]">
                    <Shield size={14} className="mr-1 text-[#C41E3A]" /> 100% Sicher
                  </span>
                  <span className="flex items-center bg-white px-3 py-2 rounded-lg shadow-sm border border-[#E8D5C4]">
                    <Zap size={14} className="mr-1 text-[#C41E3A]" /> Schnelles Angebot
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
